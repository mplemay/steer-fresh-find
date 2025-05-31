import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Beef,
  Users,
  Truck,
  ShoppingCart,
  Tractor,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link, redirect } from "react-router";

const faqs = [
  {
    question: "What makes your beef different?",
    answer:
      "Our beef comes from sustainable, local farms where cattle are raised on open pastures with natural diets. We ensure ethical treatment of animals and environmentally friendly practices that result in better tasting, more nutritious beef.",
  },
  {
    question: "How does the subscription work?",
    answer:
      "Choose your preferred cuts, quantity, and delivery frequency. We'll deliver fresh beef directly to your door on your schedule. You can pause, skip, or cancel at any time.",
  },
  {
    question: "How is the beef delivered?",
    answer:
      "We deliver in eco-friendly, insulated packaging with dry ice to keep your meat perfectly frozen. All packaging is either recyclable or compostable.",
  },
  {
    question: "Is there a minimum order amount?",
    answer:
      "No minimum order is required. Order as much or as little as you need, though larger orders often qualify for free delivery.",
  },
];

const benefits = [
  {
    title: "Farm to Table",
    description:
      "Direct from local farms to your door, cutting out middlemen and ensuring maximum freshness.",
    icon: <Tractor className="h-12 w-12 text-primary" />,
  },
  {
    title: "Know Your Farmer",
    description:
      "We connect you with the exact farm and farmer who raised your beef, creating transparency.",
    icon: <Users className="h-12 w-12 text-primary" />,
  },
  {
    title: "Convenient Delivery",
    description:
      "Regular deliveries on your schedule, with flexible options to skip, pause, or change your order.",
    icon: <Truck className="h-12 w-12 text-primary" />,
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Cuts",
    description:
      "Select from premium steaks, ground beef, roasts, and specialty cuts from local farms.",
  },
  {
    number: "02",
    title: "Set Your Schedule",
    description:
      "Choose how much beef you want and how often you'd like deliveries - weekly, bi-weekly, or monthly.",
  },
  {
    number: "03",
    title: "Enjoy Farm-Fresh Beef",
    description:
      "Receive your perfectly packaged beef right to your door, ready to cook or freeze for later.",
  },
];

const products = [
  {
    id: 1,
    name: "Premium Ribeye Steak",
    price: 24.99,
    weight: "12oz",
    image:
      "https://images.unsplash.com/photo-1603048297172-c92544817d14?auto=format&fit=crop&q=80",
    farm: "Green Pastures Farm",
    description: "Beautifully marbled grass-fed ribeye, perfect for grilling",
  },
  {
    id: 2,
    name: "Ground Beef Bundle",
    price: 39.99,
    weight: "5lb",
    image:
      "https://images.unsplash.com/photo-1551135570-7631a61d31aa?auto=format&fit=crop&q=80",
    farm: "Rocky Mountain Ranch",
    description: "Lean ground beef, perfect for burgers and everyday cooking",
  },
  {
    id: 3,
    name: "Filet Mignon",
    price: 29.99,
    weight: "8oz",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80",
    farm: "Heritage Cattle Co.",
    description: "Tender, melt-in-your-mouth filet from pasture-raised cattle",
  },
  {
    id: 4,
    name: "Beef Brisket",
    price: 49.99,
    weight: "4lb",
    image:
      "https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?auto=format&fit=crop&q=80",
    farm: "Sunrise Farms",
    description: "Slow-cook to perfection for an unforgettable BBQ experience",
  },
];

export default function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-background shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="font-serif text-2xl font-bold text-primary">
              BeefLink
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/sign-up">
                <Button
                  variant="ghost"
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button
                  variant="default"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-secondary/20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/5"></div>
        </div>

        <div className="relative z-10 px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary mb-6">
                Farm-Fresh Beef Delivered to Your Door
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Connect directly with local farmers for premium, sustainably
                raised beef. Skip the middlemen, support ethical farming, and
                enjoy exceptional quality every time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/sign-up" className="w-full sm:w-auto">
                  <Button className="h-12 w-full px-8" size="lg">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-12 w-full px-8"
                    size="lg"
                  >
                    Login
                  </Button>
                </Link>
              </div>

              <div className="mt-6 text-sm text-muted-foreground flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
                <div>Start enjoying farm-fresh beef delivery today</div>
                <div className="text-primary font-medium">
                  Farmers: List your products!
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative h-full min-h-[400px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&q=80')] bg-cover bg-center rounded-2xl shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Better for You, Better for Farmers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're creating a new farm-to-table model that benefits everyone
              involved while delivering exceptional quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-secondary/20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with BeefLink is simple. Select your cuts, set your
              schedule, and we'll handle the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 md:p-8 flex flex-col h-full"
              >
                <div className="text-3xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-secondary/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our premium selection of farm-fresh beef cuts from local
              producers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.slice(2, 4).map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.farm}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${product.price}</div>
                      <div className="text-xs text-muted-foreground">
                        {product.weight}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{product.description}</p>
                  <Link to="/login" className="w-full sm:w-auto">
                    <Button className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our farm-to-table beef delivery
              service.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b"
              >
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Sign Up Section */}
      <div
        id="sign-up-section"
        className="bg-primary text-primary-foreground py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Experience farm-fresh beef delivered directly to your door. Sign up
            now to create your account.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link to="/sign-up" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                className="h-12 w-full px-8 bg-white text-primary hover:bg-white/90"
              >
                Create Account
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-12 w-full px-8 bg-white text-primary hover:bg-white/90"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-serif text-2xl font-bold text-primary mb-6">
              BeefLink
            </div>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Connecting beef lovers directly with local farmers for a more
              sustainable and ethical food system.
            </p>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BeefLink. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
