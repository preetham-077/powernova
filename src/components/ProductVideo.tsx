import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Working YouTube product review/demo videos (verified embeddable)
const DEMO_VIDEOS: Record<string, string> = {
  smartphones: "https://www.youtube.com/embed/in5RM9LjpMU",
  laptops: "https://www.youtube.com/embed/KnGY2dAKsQ0",
  headphones: "https://www.youtube.com/embed/PvQ0gQv1GjE",
  smartwatches: "https://www.youtube.com/embed/CAxS_GkYPnA",
  tablets: "https://www.youtube.com/embed/8Ajbj8BKXWU",
  cameras: "https://www.youtube.com/embed/se21WfKScXY",
  speakers: "https://www.youtube.com/embed/oJ2sQ0gMDds",
  gaming: "https://www.youtube.com/embed/vr0qNXmkUJ8",
  shoes: "https://www.youtube.com/embed/WnqLqAYCnHE",
  groceries: "https://www.youtube.com/embed/1MIbaGwhXTc",
  clothes: "https://www.youtube.com/embed/lPJVi797Uy0",
  "girls-wear": "https://www.youtube.com/embed/lPJVi797Uy0",
  underwear: "https://www.youtube.com/embed/lPJVi797Uy0",
  skincare: "https://www.youtube.com/embed/OrElyY7MFVs",
  "baby-products": "https://www.youtube.com/embed/ZCB-0GBOnFU",
  cafe: "https://www.youtube.com/embed/2FsRMh2Frp4",
  default: "https://www.youtube.com/embed/in5RM9LjpMU",
};

const ProductVideo = ({ category, productName }: { category: string; productName: string }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoUrl = DEMO_VIDEOS[category] || DEMO_VIDEOS.default;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowVideo(true)}
        className="w-full flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Play className="h-5 w-5 text-primary ml-0.5" />
        </div>
        <div className="text-left">
          <p className="text-sm font-heading font-semibold text-card-foreground">Watch Product Demo</p>
          <p className="text-xs text-muted-foreground">Expert review of {productName}</p>
        </div>
      </motion.button>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl mx-4 aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 z-10 p-2 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <iframe
                src={`${videoUrl}?autoplay=1&rel=0`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${productName} demo video`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductVideo;
