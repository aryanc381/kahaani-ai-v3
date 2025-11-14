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
  { name: "Sinhagad Fort", lat: 18.366, lng: 73.753, desc: "Famous fort near Pune where Tanaji Malusare fought the iconic battle." },
  { name: "Shaniwar Wada", lat: 18.519, lng: 73.855, desc: "Built in 1732 by Bajirao I, the seat of Peshwas." },
  { name: "Aga Khan Palace", lat: 18.552, lng: 73.901, desc: "Built in 1892, important in India's freedom movement." },
  { name: "Dagadusheth Halwai Ganpati Temple", lat: 18.5164, lng: 73.8567, desc: "One of Pune’s most famous Ganesh temples." },
  { name: "Lal Mahal", lat: 18.5185, lng: 73.8553, desc: "Childhood residence of Shivaji Maharaj." },
  { name: "Pataleshwar Caves", lat: 18.5273, lng: 73.8510, desc: "8th century rock-cut cave temple." },
  { name: "Rajgad Fort", lat: 18.2441, lng: 73.6767, desc: "Former capital of the Maratha Empire." },
  { name: "Torna Fort", lat: 18.2817, lng: 73.6805, desc: "First fort captured by Shivaji Maharaj at age 16." },
  { name: "Purandar Fort", lat: 18.2977, lng: 74.0616, desc: "Historic fort associated with Shivaji and Raja Jai Singh." },
  { name: "Pratapgad Fort", lat: 17.9305, lng: 73.5823, desc: "Site of Shivaji vs Afzal Khan battle." },
  { name: "Raigad Fort", lat: 18.2368, lng: 73.4453, desc: "Capital of the Maratha Empire where Shivaji was crowned." },
  { name: "Lohagad Fort", lat: 18.7102, lng: 73.4827, desc: "Strong hill fort near Lonavala." },
  { name: "Visapur Fort", lat: 18.7311, lng: 73.4893, desc: "Sister fort of Lohagad with massive ramparts." },
  { name: "Karla Caves", lat: 18.7827, lng: 73.4703, desc: "Ancient Buddhist rock-cut caves." },
  { name: "Bhaja Caves", lat: 18.7416, lng: 73.4799, desc: "Old Buddhist caves from 2nd century BCE." },
  { name: "Ellora Caves", lat: 20.0268, lng: 75.1791, desc: "UNESCO site with 34 rock-cut caves." },
  { name: "Ajanta Caves", lat: 20.5521, lng: 75.7033, desc: "Ancient Buddhist paintings and caves (UNESCO)." },
  { name: "Bibi Ka Maqbara", lat: 19.9019, lng: 75.3203, desc: "Mini Taj Mahal in Aurangabad." },
  { name: "Daulatabad Fort", lat: 19.9415, lng: 75.2225, desc: "Known for its undefeatable defense systems." },
  { name: "Gateway of India", lat: 18.9219, lng: 72.8347, desc: "Iconic British-era monument in Mumbai." },
  { name: "Chhatrapati Shivaji Maharaj Terminus", lat: 18.9398, lng: 72.8355, desc: "UNESCO World Heritage Gothic railway station." },
  { name: "Elephanta Caves", lat: 18.9643, lng: 72.9310, desc: "UNESCO cave temples dedicated to Shiva." },
  { name: "Siddhivinayak Temple", lat: 19.0169, lng: 72.8303, desc: "Famous Ganesh temple in Mumbai." },
  { name: "Haji Ali Dargah", lat: 18.9823, lng: 72.8087, desc: "Mosque located on an islet near Mumbai." },
  { name: "Red Fort", lat: 28.6562, lng: 77.2410, desc: "Lal Qila, symbol of Mughal power." },
  { name: "Qutub Minar", lat: 28.5245, lng: 77.1855, desc: "73m tall UNESCO World Heritage site." },
  { name: "India Gate", lat: 28.6129, lng: 77.2295, desc: "War memorial in New Delhi." },
  { name: "Humayun’s Tomb", lat: 28.5933, lng: 77.2507, desc: "UNESCO tomb that inspired Taj Mahal." },
  { name: "Lotus Temple", lat: 28.5535, lng: 77.2588, desc: "Baha'i House of Worship." },
  { name: "Taj Mahal", lat: 27.1751, lng: 78.0421, desc: "One of the Seven Wonders of the World." },
  { name: "Agra Fort", lat: 27.1795, lng: 78.0211, desc: "Massive Mughal fort in Agra, UNESCO." },
  { name: "Fatehpur Sikri", lat: 27.0937, lng: 77.6600, desc: "Akbar’s abandoned Mughal capital." },
  { name: "Hawa Mahal", lat: 26.9239, lng: 75.8267, desc: "Palace of Winds in Jaipur." },
  { name: "Amber Fort", lat: 26.9855, lng: 75.8513, desc: "Majestic hill fort in Jaipur." },
  { name: "Jantar Mantar (Jaipur)", lat: 26.9248, lng: 75.8246, desc: "UNESCO astronomical observatory." },
  { name: "City Palace Jaipur", lat: 26.9258, lng: 75.8237, desc: "Royal residence of Jaipur kings." },
  { name: "Mehrangarh Fort", lat: 26.2978, lng: 73.0186, desc: "Massive fort in Jodhpur." },
  { name: "Umaid Bhawan Palace", lat: 26.2818, lng: 73.0479, desc: "One of the world's largest private residences." },
  { name: "Jaisalmer Fort", lat: 26.9124, lng: 70.9120, desc: "Living fort with people still residing inside." },
  { name: "Ranthambore Fort", lat: 26.0173, lng: 76.5026, desc: "UNESCO fort inside tiger reserve." },
  { name: "Victoria Memorial", lat: 22.5448, lng: 88.3433, desc: "Symbol of British Raj in Kolkata." },
  { name: "Howrah Bridge", lat: 22.5854, lng: 88.3468, desc: "Historic steel bridge built in 1943." },
  { name: "Konark Sun Temple", lat: 19.8876, lng: 86.0945, desc: "UNESCO Sun god chariot temple." },
  { name: "Jagannath Temple", lat: 19.8049, lng: 85.8174, desc: "Famous temple of Puri." },
  { name: "Charminar", lat: 17.3616, lng: 78.4747, desc: "Icon of Hyderabad built in 1591." },
  { name: "Golconda Fort", lat: 17.3833, lng: 78.4011, desc: "Famous acoustic fort." },
  { name: "Mecca Masjid", lat: 17.3603, lng: 78.4733, desc: "One of India’s largest mosques." },
  { name: "Mysore Palace", lat: 12.3052, lng: 76.6552, desc: "Royal seat of Wadiyar dynasty." },
  { name: "Hampi", lat: 15.3350, lng: 76.4600, desc: "UNESCO Vijayanagara ruins." },
  { name: "Gol Gumbaz", lat: 16.8302, lng: 75.7391, desc: "Famous whispering gallery dome." },
]

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
