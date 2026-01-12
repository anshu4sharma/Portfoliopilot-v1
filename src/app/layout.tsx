import "@/app/globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import { Archivo } from "next/font/google";
import { Libre_Franklin } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { env } from "@/env";
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

export const metadata: Metadata = {
  title: "Portfoliopilot - Portfolio Builder Website",
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
  ],
  keywords: [
    "portfoliopilot",
    "#portfoliopilot",
    "Portfoliopilot",
    "potly",
    "portaly",
    "portfoliopilot portfolio builder",
    "portfoliopilot portfolio creator",
    "portfoliopilot portfolio maker",
    "portfoliopilot portfolio website builder",
    "portfoliopilot portfolio website creator",
    "portfoliopilot portfolio website maker",
    "Portfolio",
    "Portfolio Builder",
    "Portfolio Website",
    "Portfolio Website Builder",
    "Portfolio Website Creator",
    "Portfolio Website Maker",
    "Portfolio Website Creator",
    "Portfolio Website Maker",
    "Portfolio Website Creator",
    "Portfolio Website Maker",
    "Portfolio Website Creator",
    "Portfolio Website Maker",
    "Online Portfolio Builder",
    "Online Portfolio Creator",
    "Online Portfolio Maker",
    "Online Portfolio Website Builder",
    "Online Portfolio Website Creator",
    "Online Portfolio Website Maker",
    "Free Portfolio Builder",
    "Free Portfolio Creator",
    "Free Portfolio Maker",
    "Free Portfolio Website Builder",
    "Free Portfolio Website Creator",
    "Free Portfolio Website Maker",
    "Simple Portfolio Builder",
    "Simple Portfolio Creator",
    "Simple Portfolio Maker",
    "Simple Portfolio Website Builder",
    "Simple Portfolio Website Creator",
    "Simple Portfolio Website Maker",
    "portfoliopilot",
    "portfoliopilot portfolio builder",
    "portfoliopilot.in",
    "free portfoliopilot",
    "portfoliopilot portfolio builder",
    "portfoliopilot portfolio creator",
    "portfoliopilot portfolio maker",
    "portfoliopilot portfolio website builder",
    "portfoliopilot portfolio website creator",
    "portfoliopilot portfolio website maker",
    "dev portfolio builder portfoliopilot",
    "dev portfolio creator portfoliopilot",
    "dev portfolio maker portfoliopilot",
    "dev portfolio website builder portfoliopilot",
    "dev portfolio website creator portfoliopilot",
    "dev portfolio website maker portfoliopilot",
    "designer portfolio builder portfoliopilot",
    "designer portfolio creator portfoliopilot",
    "designer portfolio maker portfoliopilot",
    "designer portfolio website builder portfoliopilot",
    "designer portfolio website creator portfoliopilot",
    "designer portfolio website maker portfoliopilot",
    "developer portfolio builder portfoliopilot",
    "developer portfolio creator portfoliopilot",
    "developer portfolio maker portfoliopilot",
    "developer portfolio website builder portfoliopilot",
    "developer portfolio website creator portfoliopilot",
    "developer portfolio website maker portfoliopilot",
    "graphic designer portfolio builder portfoliopilot",
    "graphic designer portfolio creator portfoliopilot",
    "graphic designer portfolio maker portfoliopilot",
    "graphic designer portfolio website builder portfoliopilot",
    "graphic designer portfolio website creator portfoliopilot",
    "graphic designer portfolio website maker portfoliopilot",
    "freelancer portfolio builder portfoliopilot",
    "freelancer portfolio creator portfoliopilot",
    "freelancer portfolio maker portfoliopilot",
    "freelancer portfolio website builder portfoliopilot",
    "freelancer portfolio website creator portfoliopilot",
    "freelancer portfolio website maker portfoliopilot",
  ],
  description:
    "Portfoliopilot is Portfolio Builder: A simple, customizable tool to create and showcase professional developer portfolios with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                cookie_domain: '.${env.NEXT_PUBLIC_ROOT_DOMAIN}' , // Tracks subdomains
                cookie_flags: 'SameSite=None;Secure'
              });
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "flex min-h-svh flex-col bg-background antialiased",
          archivo.variable + " " + libre_franklin.variable, + " " 
        )}
      >
        <Providers>
          <NextTopLoader showSpinner={false} />
          {/* <Warning /> */}
          <main className="flex flex-grow flex-col">{children}</main>
        </Providers>
        <TailwindIndicator />
        <Toaster />
        <SonnerToaster />
        <Analytics />
      </body>
    </html>
  );
}
