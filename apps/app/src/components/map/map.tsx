import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "@/components/theme-provider";

mapboxgl.accessToken =
  "pk.eyJ1IjoidmVub21jMzgxIiwiYSI6ImNtaHVrM2lmdjAwb2Uya3NncnM4MTV4dWkifQ.iBkdja20Abn2xjuS_vqU3A";

const LIGHT_STYLE = "mapbox://styles/mapbox/streets-v12";
const DARK_STYLE = "mapbox://styles/mapbox/dark-v11";

export default function Map() {
  const { theme } = useTheme();

  // resolve "system" → actual theme
  const resolvedTheme =
    theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      : theme;

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const initialized = useRef(false);

  // 1️⃣ GPS tracking
  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      (err) => console.log("GPS error:", err),
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  // 2️⃣ Initialize map ONCE
  useEffect(() => {
    if (!lat || !lng) return;
    if (!mapContainerRef.current) return;
    if (initialized.current) return;

    initialized.current = true;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: resolvedTheme === "dark" ? DARK_STYLE : LIGHT_STYLE,
      center: [lng, lat],
      zoom: 17,
      pitch: 0,
    });

    mapRef.current.on("load", () => {
      markerRef.current = new mapboxgl.Marker({ color: "black" })
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);
    });
  }, [lat, lng]);

  // 3️⃣ Move marker only
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    if (!lat || !lng) return;

    markerRef.current.setLngLat([lng, lat]);
    mapRef.current.easeTo({ center: [lng, lat], duration: 800 });
  }, [lat, lng]);

  // 4️⃣ Update theme (NO MAP RELOAD)
  useEffect(() => {
    if (!mapRef.current) return;

    const newStyle = resolvedTheme === "dark" ? DARK_STYLE : LIGHT_STYLE;

    mapRef.current.setStyle(newStyle);

    // ensure marker reattaches after style reload
    mapRef.current.once("style.load", () => {
      if (markerRef.current) markerRef.current.addTo(mapRef.current!);
    });
  }, [resolvedTheme]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "90%",
        height: "145vw",
        position: "fixed",
        bottom: "3vw",
        borderRadius: "3vw",
        zIndex: 1,
      }}
    />
  );
}
