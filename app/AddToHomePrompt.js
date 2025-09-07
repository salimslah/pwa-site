"use client";

import { useEffect, useState } from "react";

export default function AddToHomePrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const onInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
    if (outcome === "accepted") {
      // Installed
    }
  };

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      padding: "12px",
      zIndex: 50
    }}>
      <button
        onClick={onInstallClick}
        style={{
          background: "#000",
          color: "#fff",
          borderRadius: 8,
          padding: "10px 16px",
          border: 0,
          cursor: "pointer"
        }}
      >
        Install app
      </button>
    </div>
  );
}


