"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Analytics({ portfolioId }: { portfolioId: number |string }) {
  const pathname = usePathname();

  useEffect(() => {
    let startTime = Date.now();

    const trackPageView = async () => {
      try {
        // Get or create visitor ID
        let visitorId = localStorage.getItem("visitor_id");
        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem("visitor_id", visitorId);
        }

        // Collect browser and device info
        const userAgent = window.navigator.userAgent;
        const device = {
          mobile: /Mobile|Android|iPhone/i.test(userAgent),
          tablet: /Tablet|iPad/i.test(userAgent),
          desktop: !(/Mobile|Android|iPhone|Tablet|iPad/i.test(userAgent)),
        };

        const deviceType = device.mobile 
          ? "mobile" 
          : device.tablet 
          ? "tablet" 
          : "desktop";

        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            portfolioId,
            visitorId,
            path: pathname,
            device: deviceType,
            browser: getBrowserInfo(),
            referrer: document.referrer || "direct",
            screenResolution: `${window.screen.width}x${window.screen.height}`,
          }),
        });
      } catch (error) {
        console.error("Error tracking page view:", error);
      }
    };

    // Track the initial page view
    trackPageView();

    // Setup duration tracking
    const trackDuration = async () => {
      const duration = Math.floor((Date.now() - startTime) / 1000); // duration in seconds
      try {
        await fetch("/api/analytics/duration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            portfolioId,
            visitorId: localStorage.getItem("visitor_id"),
            duration,
          }),
        });
      } catch (error) {
        console.error("Error tracking duration:", error);
      }
    };

    // Track duration when user leaves the page
    window.addEventListener("beforeunload", trackDuration);

    return () => {
      window.removeEventListener("beforeunload", trackDuration);
      trackDuration(); // Track duration when component unmounts
    };
  }, [portfolioId, pathname]);

  return null; // This component doesn't render anything
}

// Browser detection utility
function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  let browser = "unknown";

  if (userAgent.indexOf("Chrome") > -1) {
    browser = "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browser = "Safari";
  } else if (userAgent.indexOf("Firefox") > -1) {
    browser = "Firefox";
  } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:") > -1) {
    browser = "Internet Explorer";
  } else if (userAgent.indexOf("Edge") > -1) {
    browser = "Edge";
  }

  return browser;
}

