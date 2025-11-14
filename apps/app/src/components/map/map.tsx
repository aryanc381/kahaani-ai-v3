import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "@/components/theme-provider";
import { useAppSelector } from "@/store/hooks";

mapboxgl.accessToken =
  "pk.eyJ1IjoidmVub21jMzgxIiwiYSI6ImNtaHVrM2lmdjAwb2Uya3NncnM4MTV4dWkifQ.iBkdja20Abn2xjuS_vqU3A";

const LIGHT_STYLE = "mapbox://styles/mapbox/streets-v12";
const DARK_STYLE = "mapbox://styles/mapbox/dark-v11";

const locations = [
  { name: "Sinhagad Fort", lat: 18.366, lng: 73.753, desc: "Famous fort near Pune where shivaji maharaj fought the war with sinhagad cha raja bajayega ter baand baja." },
  { name: "Shaniwar Wada", lat: 18.519, lng: 73.855, desc: "Built in 1732 by Bajirao" },
  { name: "Aga Khan Palace", lat: 18.552, lng: 73.901, desc: "Historic palace from 1892" },
];

export default function Map() {
  const { theme } = useTheme();
  const searchVal = useAppSelector((state) => state.app.searchValue);
  const searchTrigger = useAppSelector((state) => state.app.searchTrigger);
  const searchMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!searchTrigger) return;
    if (!mapRef.current) return;

    const match = locations.find((loc) =>
      loc.name.toLowerCase().includes(searchVal.toLowerCase())
    );

    if (!match) return;

    mapRef.current.flyTo({
      center: [match.lng, match.lat],
      zoom: 17,
      speed: 0.7,
      pitch: 100
    });

    if (searchMarkerRef.current) {
      searchMarkerRef.current.remove();
    }

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div style="padding: 5vw; border-radius: 5vw; background: white; font-family: sans-serif; box-shadow: 0 0 20px rgba(0,0,0,0.15);">
        <h3 style="color: black; font-size: 4vw; margin: 0; font-weight: 600;">${match.name}</h3>
        <p style="color: black; font-size: 3vw; margin: 2vw 0 0;">${match.desc}</p>
      </div>
    `);

    searchMarkerRef.current = new mapboxgl.Marker({ color: "black" })
      .setLngLat([match.lng, match.lat])
      .setPopup(popup)
      .addTo(mapRef.current);

    searchMarkerRef.current.togglePopup();
  }, [searchTrigger]);

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
      },
      () => {},
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

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
      pitch: 75
    });

    mapRef.current.on("load", () => {
      const el = document.createElement("div");
      el.style.backgroundImage = "url('/image.png')";
      el.style.width = "15vw";
      el.style.height = "15vw";
      el.style.backgroundSize = "cover";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";

      markerRef.current = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);

      const btn = document.createElement("button");
      btn.innerHTML = "➤";
      btn.style.width = "9vw";
      btn.style.height = "9vw";
      btn.style.borderRadius = "0%";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "22px";
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.background = resolvedTheme === "dark" ? "#1f1f1f" : "white";
      btn.style.color = resolvedTheme === "dark" ? "white" : "black";
      btn.style.border = resolvedTheme === "dark" ? "1px solid #444" : "1px solid #ccc";

      btn.onclick = () => {
        if (lat && lng) {
          mapRef.current!.flyTo({ center: [lng, lat], zoom: 17, speed: 0.7 });
        }
      };

      const ctrl = document.createElement("div");
      ctrl.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
      ctrl.appendChild(btn);

      mapRef.current!.addControl(
        {
          onAdd: () => ctrl,
          onRemove: () => ctrl.remove(),
        },
        "top-left"
      );
    });
  }, [lat, lng, resolvedTheme]);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    if (!lat || !lng) return;

    markerRef.current.setLngLat([lng, lat]);
  }, [lat, lng]);

  useEffect(() => {
    if (!mapRef.current) return;

    const newStyle = resolvedTheme === "dark" ? DARK_STYLE : LIGHT_STYLE;
    mapRef.current.setStyle(newStyle);

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
        borderRadius: "5vw",
        zIndex: 1,
      }}
    />
  );
}
