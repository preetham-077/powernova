import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEMO_VIDEOS: Record<string, string> = {
  smartphones: "https://www.youtube.com/embed/ZJGh164OjVU",
  laptops: "https://www.youtube.com/embed/hU7oHk3fNbA",
  headphones: "https://www.youtube.com/embed/a1EbU7xBIcE",
  smartwatches: "https://www.youtube.com/embed/hmKshpLXnxc",
  tablets: "https://www.youtube.com/embed/UB8-oV2V9GY",
  cameras: "https://www.youtube.com/embed/9WQM263bVEU",
  speakers: "https://www.youtube.com/embed/6-FUJEplbkE",
  gaming: "https://www.youtube.com/embed/RkC0l4iekYo",
  shoes: "https://www.youtube.com/embed/Lnj4C8a4plc",
  default: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/70 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl mx-4 aspect-video rounded-2xl overflow-hidden bg-foreground shadow-2xl"
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-3 right-3 z-10 p-2 bg-foreground/80 text-primary-foreground rounded-full hover:bg-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <iframe
                src={`${videoUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
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
