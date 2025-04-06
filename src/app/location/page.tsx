"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LocationPage() {
  const router = useRouter();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Send location to backend
          const res = await fetch("/api/save-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          if (res.ok) {
            router.replace("/success"); // Redirect after saving
          } else {
            alert("Failed to save location.");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  }, []);

  return <p>Getting your location...</p>;
}
