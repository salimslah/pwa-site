"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");

        // Listen for updates and prompt reload when a new SW takes control
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New content available; on next load the new SW will control
              console.info("New version available. Reload to update.");
            }
          });
        });
      } catch (error) {
        console.error("Service worker registration failed:", error);
      }
    };

    register();
  }, []);

  return null;
}


