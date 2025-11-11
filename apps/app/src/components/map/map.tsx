import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidmVub21jMzgxIiwiYSI6ImNtaHVrM2lmdjAwb2Uya3NncnM4MTV4dWkifQ.iBkdja20Abn2xjuS_vqU3A'

export default function Map() { 
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [78.9629, 20.5937], 
      zoom: 6,
    });

    return () => mapRef.current?.remove()
  }, []);

  return <div id="map-container" ref={mapContainerRef} style={{ zIndex: '1', bottom: '3vw', position: 'fixed', width:'90%', height: '145vw', borderRadius: "10vw" }} />
}
