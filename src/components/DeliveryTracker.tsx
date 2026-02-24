import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { Bike, Clock, MapPin } from "lucide-react";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const deliveryIcon = new L.DivIcon({
  html: `<div style="background: hsl(24,100%,50%); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(255,102,0,0.4); border: 3px solid white;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 0 0-1-1H2"/><path d="m6 12 6-6"/><path d="M9 17H4V4"/><path d="m15 14 3 3"/><path d="m15 17 3-3"/></svg>
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

// Route points from store to delivery location
const routePoints: [number, number][] = [
  [12.9716, 77.5946], // Store
  [12.9730, 77.5960],
  [12.9745, 77.5950],
  [12.9758, 77.5972],
  [12.9770, 77.5985],
  [12.9785, 77.5998],
  [12.9800, 77.6010],
  [12.9812, 77.6025],
  [12.9825, 77.6035],
  [12.9840, 77.6050], // Destination
];

const AnimatedMarker = ({ routePoints }: { routePoints: [number, number][] }) => {
  const [posIdx, setPosIdx] = useState(0);
  const map = useMap();

  useEffect(() => {
    const interval = setInterval(() => {
      setPosIdx((prev) => {
        const next = Math.min(prev + 1, routePoints.length - 1);
        map.panTo(routePoints[next], { animate: true, duration: 1 });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [map, routePoints]);

  return (
    <Marker position={routePoints[posIdx]} icon={deliveryIcon}>
      <Popup>
        <div className="text-center font-medium">
          <p className="text-sm">🏍️ Delivery Partner</p>
          <p className="text-xs text-gray-500">Rajesh K.</p>
        </div>
      </Popup>
    </Marker>
  );
};

const DeliveryTracker = () => {
  const [eta, setEta] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(prev - 1, 1));
    }, 30000);
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
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Bike className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-heading font-semibold text-card-foreground">Rajesh Kumar</p>
          <p className="text-xs text-muted-foreground">Delivery Partner • 4.9 ⭐</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-primary font-heading font-bold">
            <Clock className="h-4 w-4" />
            <span>{eta} min</span>
          </div>
          <p className="text-xs text-muted-foreground">ETA</p>
        </div>
      </motion.div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-border" style={{ height: 400 }}>
        <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={routePoints} pathOptions={{ color: "hsl(24,100%,50%)", weight: 4, opacity: 0.7, dashArray: "10, 8" }} />
          <AnimatedMarker routePoints={routePoints} />
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
        <MapPin className="h-3 w-3" /> Live tracking updates every 30 seconds
      </p>
    </div>
  );
};

export default DeliveryTracker;
