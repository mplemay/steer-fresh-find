import { createClient } from "@/lib/supabase/server";
import { hasCompletedOnboarding } from "@/lib/onboarding";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type LoaderFunctionArgs, redirect, useLoaderData, Link } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = createClient(request);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return redirect("/login");
  }

  // Check if user has completed onboarding
  const onboardingCompleted = await hasCompletedOnboarding(supabase, data.user.id);

  // If onboarding not completed, redirect to onboarding
  if (!onboardingCompleted) {
    return redirect("/onboarding");
  }

  // Get profile data
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  // Get user preferences
const { data: preferencesData } = await supabase
  .from("user_preferences")
  .select("*")
  .eq("user_id", data.user.id)
  .single();

// Get products data
  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .limit(4);

  return {
    user: data.user,
    profile: profileData,
    preferences: preferencesData,
    products: productsData || []
  };
};

export default function HomePage() {
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

  // Figure out next delivery date based on frequency
  const getNextDeliveryDate = () => {
    const today = new Date();
    const nextDate = new Date(today);
    
    if (data.preferences?.frequency === "weekly") {
      // Add 7 days
      nextDate.setDate(today.getDate() + 7);
    } else if (data.preferences?.frequency === "bi-weekly") {
      // Add 14 days
      nextDate.setDate(today.getDate() + 14);
    } else {
      // Add 30 days (monthly)
      nextDate.setDate(today.getDate() + 30);
    }
    
    return nextDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Mock data for orders
  const upcomingDeliveries = [
    {
      id: "order-123",
      date: getNextDeliveryDate(), 
      status: "Processing",
      items: 3
    }
  ];

  // Fallback products if database doesn't have them
  const products = data.products?.length > 0 ? data.products : [
    {
      id: 1,
      name: "Premium Ribeye Steak",
      price: 24.99,
      weight: "12oz",
      image: "https://images.unsplash.com/photo-1603048297172-c92544817d14?auto=format&fit=crop&q=80",
      farm: "Green Pastures Farm",
      description: "Beautifully marbled grass-fed ribeye, perfect for grilling",
    },
    {
      id: 2,
      name: "Ground Beef Bundle",
      price: 39.99,
      weight: "5lb",
      image: "https://images.unsplash.com/photo-1551135570-7631a61d31aa?auto=format&fit=crop&q=80",
      farm: "Rocky Mountain Ranch",
      description: "Lean ground beef, perfect for burgers and everyday cooking",
    },
    {
      id: 3,
      name: "Filet Mignon",
      price: 29.99,
      weight: "8oz",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80",
      farm: "Heritage Cattle Co.",
      description: "Tender, melt-in-your-mouth filet from pasture-raised cattle",
    },
    {
      id: 4,
      name: "Beef Brisket",
      price: 49.99,
      weight: "4lb",
      image: "https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?auto=format&fit=crop&q=80",
      farm: "Sunrise Farms",
      description: "Slow-cook to perfection for an unforgettable BBQ experience",
    },
  ];

  return (
    <div className="min-h-svh">
      {/* Header with navigation */}
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold">Steer Fresh</h1>
            <nav className="hidden md:flex space-x-4">
              <Link to="/home" className="font-medium">Home</Link>
              <Link to="/shop" className="text-muted-foreground">Shop</Link>
              <Link to="/subscription" className="text-muted-foreground">Subscription</Link>
              <Link to="/farms" className="text-muted-foreground">Our Farms</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden md:inline-block">Hello, {data.user.email?.split('@')[0]}</span>
            <Link to="/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
            <Link to="/logout">
              <Button variant="outline" size="sm">Logout</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-16 h-16 mx-auto text-primary mb-4"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M7.5 12h9" />
              <path d="M7.5 9h4.5" />
              <path d="M7.5 15h6" />
            </svg>
            <h1 className="text-4xl font-bold mb-4">We're Getting Ready!</h1>
          </div>
          
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6 pb-8 px-6">
              <p className="text-xl mb-6">
                Thank you for your interest in Steer Fresh. We're currently preparing our farm-to-table service to bring you the finest quality meats.
              </p>
              <p className="text-lg mb-8">
                We've received your preferences and will contact you as soon as we're ready to launch in your area. In the meantime, feel free to update your profile details.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg">Update Preferences</Button>
                <Button variant="outline" size="lg">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
          
          <p className="mt-8 text-muted-foreground">
            Have questions? Email us at <span className="text-primary">support@steerfresh.com</span>
          </p>
        </div>
      </main>
    </div>
  );
}
