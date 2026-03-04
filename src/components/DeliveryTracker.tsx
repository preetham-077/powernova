import { useEffect, useState, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import { Bike, Clock, MapPin, Phone, Star, PhoneCall, X } from "lucide-react";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const DELIVERY_AGENTS = [
  { name: "Sandeep Raja", rating: 4.8, vehicle: "Bike", phone: "+91 98765 43210" },
  { name: "Suraj", rating: 4.6, vehicle: "Scooter", phone: "+91 98765 43211" },
  { name: "Jai Bhim", rating: 4.7, vehicle: "Bike", phone: "+91 98765 43212" },
  { name: "Invisible Nandeesh", rating: 4.9, vehicle: "Bike", phone: "+91 98765 43213" },
  { name: "Sachuu", rating: 4.5, vehicle: "Scooter", phone: "+91 98765 43214" },
  { name: "Pod Shivu", rating: 4.4, vehicle: "Bike", phone: "+91 98765 43215" },
  { name: "Syed Khameni", rating: 4.7, vehicle: "Scooter", phone: "+91 98765 43216" },
  { name: "Rocky Raju", rating: 4.8, vehicle: "Bike", phone: "+91 98765 43217" },
  { name: "Anekal Chandan", rating: 4.6, vehicle: "Bike", phone: "+91 98765 43218" },
  { name: "Hosur Gowda", rating: 4.3, vehicle: "Scooter", phone: "+91 98765 43219" },
];

const deliveryIcon = new L.DivIcon({
  html: `<div style="background: hsl(24,100%,50%); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(255,102,0,0.6); border: 3px solid white; animation: pulse-marker 2s infinite;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 0 0-1-1H2"/><path d="m6 12 6-6"/><path d="M9 17H4V4"/><path d="m15 14 3 3"/><path d="m15 17 3-3"/></svg>
  </div>`,
  className: "",
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const storeIcon = new L.DivIcon({
  html: `<div style="background: hsl(24,100%,50%); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(255,102,0,0.4); border: 3px solid white;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  </div>`,
  className: "",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

const homeIcon = new L.DivIcon({
  html: `<div style="background: hsl(145,63%,42%); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,180,80,0.4); border: 3px solid white;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  </div>`,
  className: "",
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

// More realistic route with 30+ waypoints, turns, and realistic road pattern
const routePoints: [number, number][] = [
  [12.9716, 77.5946],
  [12.9718, 77.5950],
  [12.9722, 77.5948],
  [12.9726, 77.5952],
  [12.9730, 77.5955],
  [12.9733, 77.5953],
  [12.9736, 77.5958],
  [12.9738, 77.5962],
  [12.9742, 77.5960],
  [12.9745, 77.5965],
  [12.9748, 77.5968],
  [12.9750, 77.5972],
  [12.9754, 77.5970],
  [12.9758, 77.5974],
  [12.9760, 77.5978],
  [12.9763, 77.5976],
  [12.9766, 77.5980],
  [12.9770, 77.5984],
  [12.9772, 77.5988],
  [12.9775, 77.5990],
  [12.9778, 77.5994],
  [12.9780, 77.5998],
  [12.9784, 77.5996],
  [12.9788, 77.6002],
  [12.9792, 77.6006],
  [12.9796, 77.6010],
  [12.9800, 77.6014],
  [12.9805, 77.6018],
  [12.9810, 77.6024],
  [12.9816, 77.6030],
  [12.9822, 77.6036],
  [12.9828, 77.6040],
  [12.9834, 77.6046],
  [12.9840, 77.6050],
];

const AnimatedMarker = ({ routePoints, agentName, onArrive }: { routePoints: [number, number][]; agentName: string; onArrive: () => void }) => {
  const [posIdx, setPosIdx] = useState(0);
  const map = useMap();

  useEffect(() => {
    const interval = setInterval(() => {
      setPosIdx((prev) => {
        const next = Math.min(prev + 1, routePoints.length - 1);
        map.panTo(routePoints[next], { animate: true, duration: 1.2 });
        if (next === routePoints.length - 1) {
          onArrive();
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [map, routePoints, onArrive]);

  // Show traveled vs remaining route
  const traveled = routePoints.slice(0, posIdx + 1);
  const remaining = routePoints.slice(posIdx);

  return (
    <>
      {/* Traveled route - solid */}
      <Polyline positions={traveled} pathOptions={{ color: "hsl(145,63%,42%)", weight: 5, opacity: 0.9 }} />
      {/* Remaining route - dashed */}
      <Polyline positions={remaining} pathOptions={{ color: "hsl(24,100%,50%)", weight: 4, opacity: 0.6, dashArray: "10, 8" }} />
      <Marker position={routePoints[posIdx]} icon={deliveryIcon}>
        <Popup>
          <div className="text-center font-medium">
            <p className="text-sm">🏍️ {agentName}</p>
            <p className="text-xs text-gray-500">On the way to you!</p>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

const DeliveryTracker = () => {
  const totalSteps = routePoints.length;
  const [eta, setEta] = useState(Math.round(totalSteps * 2 / 60 * 10)); // ~10 min
  const [arrived, setArrived] = useState(false);
  const [showCallNotification, setShowCallNotification] = useState(false);
  const agent = useMemo(() => DELIVERY_AGENTS[Math.floor(Math.random() * DELIVERY_AGENTS.length)], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(prev - 1, 0));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleArrive = useCallback(() => {
    setArrived(true);
    setEta(0);
    // Show big call notification after arrival
    setTimeout(() => setShowCallNotification(true), 1500);
  }, []);

  const center: [number, number] = [12.9770, 77.5985];
  const distanceKm = (eta * 0.3).toFixed(1);

  return (
    <div className="space-y-4">
      {/* Big Call Notification Overlay */}
      <AnimatePresence>
        {showCallNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              className="bg-card border-2 border-primary rounded-3xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
              >
                <PhoneCall className="h-12 w-12 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-1">📞 Incoming Call</h2>
              <p className="text-lg font-heading font-semibold text-primary mb-1">{agent.name}</p>
              <p className="text-sm text-muted-foreground mb-2">POWERNOVA Delivery Agent</p>
              <p className="text-xs text-muted-foreground mb-6">"I've arrived at your location!"</p>
              
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCallNotification(false)}
                  className="flex-1 bg-destructive text-destructive-foreground py-3 rounded-xl font-heading font-semibold flex items-center justify-center gap-2"
                >
                  <X className="h-5 w-5" />
                  Decline
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCallNotification(false)}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-heading font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Accept
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {!arrived && <span>• {distanceKm} km away</span>}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 text-primary font-heading font-bold">
            <Clock className="h-4 w-4" />
            <span>{arrived ? "Arrived!" : `${eta} min`}</span>
          </div>
          <button
            onClick={() => setShowCallNotification(true)}
            className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
          >
            <Phone className="h-3 w-3" />
            Call
          </button>
        </div>
      </motion.div>

      {/* Arrived Banner */}
      <AnimatePresence>
        {arrived && !showCallNotification && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center"
          >
            <p className="text-primary font-heading font-bold text-lg">🎉 {agent.name} has arrived!</p>
            <p className="text-sm text-muted-foreground">Please collect your order at the door</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-border" style={{ height: 420 }}>
        <style>{`
          @keyframes pulse-marker {
            0%, 100% { box-shadow: 0 0 10px rgba(255,102,0,0.4); }
            50% { box-shadow: 0 0 35px rgba(255,102,0,0.8); }
          }
        `}</style>
        <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
          <AnimatedMarker routePoints={routePoints} agentName={agent.name} onArrive={handleArrive} />
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
        <MapPin className="h-3 w-3" /> Live tracking • {arrived ? `${agent.name} has arrived` : `${agent.name} is on the way`}
      </p>
    </div>
  );
};

export default DeliveryTracker;
