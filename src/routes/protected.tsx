import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type LoaderFunctionArgs, redirect, useLoaderData } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = createClient(request);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return redirect("/login");
  }

  const userId = data.user.id;
  
  // Get or create profile data
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
    .then(async (result) => {
      if (!result.data) {
        // Create a minimal profile if it doesn't exist
        const { data: newProfile } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            onboarding_completed: true,
            address_line1: '',
            city: '',
            state: '',
            postal_code: ''
          })
          .select()
          .single();
        return { data: newProfile, error: null };
      }
      return result;
    });
    
  if (!profileData) {
    throw new Error('Failed to load or create profile');
  }

  // Get user preferences if they exist
  const { data: preferencesData } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  return {
    user: data.user,
    profile: profileData,
    preferences: preferencesData,
  };
};

export default function ProtectedPage() {
  const data = useLoaderData<typeof loader>();

  // Get list of preferred cuts
  const preferredCuts = [];
  if (data.preferences?.ribeye_preferred)
    preferredCuts.push("Premium Ribeye Steak");
  if (data.preferences?.ground_beef_preferred)
    preferredCuts.push("Ground Beef Bundle");
  if (data.preferences?.filet_mignon_preferred)
    preferredCuts.push("Filet Mignon");
  if (data.preferences?.brisket_preferred) preferredCuts.push("Beef Brisket");

  return (
    <div className="min-h-svh p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Farm-to-Table Dashboard</h1>
          <a href="/logout">
            <Button>Logout</Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Welcome back,{" "}
                <span className="font-medium">{data.user.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Delivery Address</h3>
                <p className="text-sm">{data.profile.address_line1}</p>
                {data.profile.address_line2 && (
                  <p className="text-sm">{data.profile.address_line2}</p>
                )}
                <p className="text-sm">
                  {data.profile.city}, {data.profile.state}{" "}
                  {data.profile.postal_code}
                </p>
              </div>

              {data.profile.delivery_instructions && (
                <div>
                  <h3 className="font-medium mb-2">Delivery Instructions</h3>
                  <p className="text-sm">
                    {data.profile.delivery_instructions}
                  </p>
                </div>
              )}

              <Button variant="outline" size="sm">
                Edit Address
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Beef Preferences</CardTitle>
              <CardDescription>
                Your selected cuts and delivery preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Preferred Cuts</h3>
                <ul className="text-sm space-y-1">
                  {preferredCuts.map((cut) => (
                    <li key={cut} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 text-green-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {cut}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-1">Quantity</h3>
                  <p className="text-sm">{data.preferences?.quantity}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Monthly Budget</h3>
                  <p className="text-sm">${data.preferences?.monthly_budget}</p>
                </div>
              </div>

              <Button variant="outline" size="sm">
                Edit Preferences
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
              <CardDescription>
                Your next shipment of fresh farm beef
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-medium text-lg">
                    Next Delivery: June 15, 2024
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your order is being prepared at the farm
                  </p>
                </div>
                <Button>Track Order</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
