// components/MapsNavigator.tsx
"use client";

import { sites } from "@/lib/data";
import { useEffect, useState } from "react";

type Coord = { latitude: number; longitude: number };

function calculateDistance(a: Coord, b: Coord): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km

  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const aCalc =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return R * 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
}

function generateMapsUrl(user: Coord): string {
  // Parse site coords and calculate distance from user
  const siteCoords = sites.map((site) => ({
    ...site,
    latitude: parseFloat(site.Uni_Latitude),
    longitude: parseFloat(site.Uni_Longitude),
    distance: calculateDistance(user, {
      latitude: parseFloat(site.Uni_Latitude),
      longitude: parseFloat(site.Uni_Longitude),
    }),
  }));

  const sortedSites = siteCoords.sort((a, b) => a.distance - b.distance);

  const destination = `${sortedSites[0].latitude},${sortedSites[0].longitude}`;
  const waypoints = sortedSites
    .slice(1)
    .map((s) => `${s.latitude},${s.longitude}`)
    .join("|");

  const origin = `${user.latitude},${user.longitude}`;

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
}

export default function MapsNavigator() {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const user = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        const url = generateMapsUrl(user);
        setMapUrl(url);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Failed to get your location.");
      }
    );
  }, []);

  return (
    <div className="p-4 text-center">
      {mapUrl ? (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Open Directions in Google Maps
        </a>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}
