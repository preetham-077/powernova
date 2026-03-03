import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { Bike, Clock, MapPin, Phone, Star } from "lucide-react";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const DELIVERY_AGENTS = [
  { name: "Sandeep Raja", rating: 4.8, vehicle: "Bike" },
  { name: "Suraj", rating: 4.6, vehicle: "Scooter" },
  { name: "Jai Bhim", rating: 4.7, vehicle: "Bike" },
  { name: "Invisible Nandeesh", rating: 4.9, vehicle: "Bike" },
  { name: "Sachuu", rating: 4.5, vehicle: "Scooter" },
  { name: "Pod Shivu", rating: 4.4, vehicle: "Bike" },
  { name: "Syed Khameni", rating: 4.7, vehicle: "Scooter" },
  { name: "Rocky Raju", rating: 4.8, vehicle: "Bike" },
  { name: "Anekal Chandan", rating: 4.6, vehicle: "Bike" },
  { name: "Hosur Gowda", rating: 4.3, vehicle: "Scooter" },
];

const deliveryIcon = new L.DivIcon({
  html: `<div style="background: hsl(24,100%,50%); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(255,102,0,0.6); border: 3px solid white; animation: pulse-marker 2s infinite;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 0 0-1-1H2"/><path d="m6 12 6-6"/><path d="M9 17H4V4"/><path d="m15 14 3 3"/><path d="m15 17 3-3"/></svg>
  </div>`,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const storeIcon = new L.DivIcon({
  html: `<div style="background: hsl(24,100%,50%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(255,102,0,0.4); border: 3px solid white;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  </div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const homeIcon = new L.DivIcon({
  html: `<div style="background: hsl(145,63%,42%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,180,80,0.4); border: 3px solid white;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  </div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Realistic 25-point route from store to delivery
const routePoints: [number, number][] = [
  [12.9716, 77.5946], // Store (POWERNOVA Warehouse)
  [12.9720, 77.5952],
  [12.9725, 77.5948],
  [12.9730, 77.5955],
  [12.9736, 77.5960],
  [12.9740, 77.5958],
  [12.9745, 77.5963],
  [12.9750, 77.5968],
  [12.9756, 77.5972],
  [12.9760, 77.5976],
  [12.9764, 77.5980],
  [12.9770, 77.5985],
  [12.9774, 77.5990],
  [12.9778, 77.5994],
  [12.9782, 77.5998],
  [12.9788, 77.6002],
  [12.9792, 77.6008],
  [12.9796, 77.6012],
  [12.9800, 77.6016],
  [12.9805, 77.6020],
  [12.9810, 77.6025],
  [12.9816, 77.6030],
  [12.9822, 77.6035],
  [12.9830, 77.6042],
  [12.9840, 77.6050], // Destination
];

const AnimatedMarker = ({ routePoints, agentName }: { routePoints: [number, number][]; agentName: string }) => {
  const [posIdx, setPosIdx] = useState(0);
  const map = useMap();

  useEffect(() => {
    const interval = setInterval(() => {
      setPosIdx((prev) => {
        const next = Math.min(prev + 1, routePoints.length - 1);
        map.panTo(routePoints[next], { animate: true, duration: 1 });
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [map, routePoints]);

  return (
    <Marker position={routePoints[posIdx]} icon={deliveryIcon}>
      <Popup>
        <div className="text-center font-medium">
          <p className="text-sm">🏍️ {agentName}</p>
          <p className="text-xs text-gray-500">On the way to you!</p>
        </div>
      </Popup>
    </Marker>
  );
};

const DeliveryTracker = () => {
  const [eta, setEta] = useState(10);
  const agent = useMemo(() => DELIVERY_AGENTS[Math.floor(Math.random() * DELIVERY_AGENTS.length)], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(prev - 1, 1));
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const center: [number, number] = [12.9770, 77.5985];

  return (
    <div className="space-y-4">
      {/* Delivery agent info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 bg-primary/5 border border-primary/20 rounded-xl p-4"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
          🏍️
        </div>
        <div className="flex-1">
          <p className="font-heading font-semibold text-card-foreground text-lg">{agent.name}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {agent.rating}
            </span>
            <span>•</span>
            <span>{agent.vehicle}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 text-primary font-heading font-bold">
            <Clock className="h-4 w-4" />
            <span>{eta} min</span>
          </div>
          <button className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
            <Phone className="h-3 w-3" />
            Call
          </button>
        </div>
      </motion.div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-border" style={{ height: 400 }}>
        <style>{`
          @keyframes pulse-marker {
            0%, 100% { box-shadow: 0 0 10px rgba(255,102,0,0.4); }
            50% { box-shadow: 0 0 30px rgba(255,102,0,0.8); }
          }
        `}</style>
        <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <Polyline
            positions={routePoints}
            pathOptions={{ color: "hsl(24,100%,50%)", weight: 5, opacity: 0.8, dashArray: "12, 8" }}
          />
          {/* Store marker */}
          <Marker position={routePoints[0]} icon={storeIcon}>
            <Popup>
              <div className="text-center font-medium">
                <p className="text-sm">📦 POWERNOVA Warehouse</p>
                <p className="text-xs text-gray-500">Order dispatched</p>
              </div>
            </Popup>
          </Marker>
          <AnimatedMarker routePoints={routePoints} agentName={agent.name} />
          <Marker position={routePoints[routePoints.length - 1]} icon={homeIcon}>
            <Popup>
              <div className="text-center font-medium">
                <p className="text-sm">📍 Your Location</p>
                <p className="text-xs text-gray-500">Delivery Address</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
        <MapPin className="h-3 w-3" /> Live tracking • {agent.name} is on the way
      </p>
    </div>
  );
};

export default DeliveryTracker;
