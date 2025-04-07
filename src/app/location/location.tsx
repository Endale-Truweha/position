"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LocationPage({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    const getLocation = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            const res = await fetch("/api/save-location", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ latitude, longitude, slug }),
            });

            if (res.ok) {
              router.replace("/success");
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
    };

    getLocation();
  }, [router, slug]);

  return (
    <div>
      <h1>My Post: {slug}</h1>
      <p>Getting your location...</p>
    </div>
  );
}
