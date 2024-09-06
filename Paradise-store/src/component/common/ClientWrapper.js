// Create a new component (e.g., ClientWrapper.js)
"use client"; // Mark this component as a client component

import { SessionProvider } from "next-auth/react";
import { Providers } from "@/reduxToolKit/provider";

export default function ClientWrapper({ children }) {
  return (
    <SessionProvider>
      <Providers>{children}</Providers>
    </SessionProvider>
  );
}
