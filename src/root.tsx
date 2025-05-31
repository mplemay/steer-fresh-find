import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";

const queryClient = new QueryClient();

export function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BeefLink | Farm Fresh Beef Direct to Your Door</title>
        <meta
          name="description"
          content="BeefLink connects consumers directly with cattle farmers for premium, farm-fresh beef. Join our waitlist today!"
        />
        <meta name="author" content="BeefLink" />
        <link rel="icon" type="image/svg+xml" href="/cow.svg" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
