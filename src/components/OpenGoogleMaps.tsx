'use client';

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { MapPinned } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Site } from "@/lib/data";
import Loading from "@/app/loading";

// Utility: Convert degrees to radians
const toRad = (x: number) => (x * Math.PI) / 180;

// Haversine formula to calculate distance in kilometers
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Extended site type with distance
interface SiteWithDistance extends Site {
  distance: number;
}

const OpenGoogleMaps = () => {
  const [sitesSorted, setSitesSorted] = useState<SiteWithDistance[]>([]);
  const [selectedMode, setSelectedMode] = useState("driving");
  const [loading, setLoading] = useState(false);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['sites'],
    queryFn: async () => {
      const res = await fetch("/api/tt");
      return res.json();
    },
  });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const sorted = data
          .map((site: Site) => {
            const shopLat = parseFloat(site.location?.latitude ?? "0");
            const shopLng = parseFloat(site.location?.longitude ?? "0");
            const distance = haversine(userLat, userLng, shopLat, shopLng);
            return { ...site, distance };
          })
          .sort((a:SiteWithDistance, b:SiteWithDistance) => a.distance - b.distance);

        setSitesSorted(sorted);
        setLoading(false);
      },
      (err) => {
        alert("Unable to retrieve location: " + err.message);
        setLoading(false);
      }
    );
  };

  const openGoogleMaps = (lat: number, lng: number) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}&travelmode=${selectedMode}`;
        window.open(mapsUrl, "_blank");

        setLoading(false);
      },
      (err) => {
        alert("Unable to retrieve location: " + err.message);
        setLoading(false);
      }
    );
  };

  if (isPending) return <span><Loading/></span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div className="container mx-auto flex flex-col items-center my-12 space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Field Technician Routing & Navigation System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center mt-6">
        <Button
          variant="outline"
          onClick={handleGetLocation}
          className="px-6 py-6 text-3xl font-semibold underline bg-transparent hover:bg-ethGray-200 text-ethBlack-500 rounded-none"
          disabled={loading}
        >
          {loading ? "Finding Home Addresses..." : "Find Home Addresses"}
        </Button>

        <Select value={selectedMode} onValueChange={setSelectedMode}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select travel mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="driving">Driving</SelectItem>
            <SelectItem value="walking">Walking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>

{sitesSorted.length === 0 ? (

  <div>
  <p className="leading-7 [&:not(:first-child)]:mt-6 m-auto text-center w-1/2">
    The Field Technician Routing & Navigation System streamlines the process of pinpointing customer-reported network issues. It collects location data automatically, prioritizes problems, and guides technicians straight to the site using Google Maps, minimizing delays, confusion, and travel time.</p>

    </div>
) : (

<div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">



 { sitesSorted.map((site) => (
    <Card
      key={site.id}
      className={clsx(
        "m-4 w-[350px] transition-all",
        site.location
          ? "border-ethGreen-300 hover:bg-ethGray-300"
          : "border-ethRed-300 hover:bg-ethGray-300"
      )}
    >
      <CardHeader>
        <CardTitle>Customer Name</CardTitle>
        <CardDescription>Site ID: {site.id}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>TT: {site.tt}</p>
        <p>Customer Phone: {site.customerPhone}</p>
        <p>Distance: {site.distance.toFixed(2)} km</p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() =>
            openGoogleMaps(
              parseFloat(site.location?.latitude ?? "0"),
              parseFloat(site.location?.longitude ?? "0")
            )
          }
          className={clsx(
            "w-full bg-ethGray-400 hover:bg-ethGray-500",
            site.location ? "block" : "hidden"
          )}
        >
          <p className="flex items-center justify-between gap-1 w-full text-ethBlack-500">
            <MapPinned color="#8DC63F" /> Map
          </p>
        </Button>
      </CardFooter>
    </Card>
  ))
}
  </div>
)}


     
      </div>

      <div className="mb-40" />
    </div>
  );
};

export default OpenGoogleMaps;
