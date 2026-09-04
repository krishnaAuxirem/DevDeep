import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check window scroll
      const windowScrolled = window.scrollY > 250;
      
      // Also check if any main scroll container has scrolled
      const scrollContainers = document.querySelectorAll(".overflow-y-auto");
      let containerScrolled = false;
      scrollContainers.forEach((container) => {
        if (container.scrollTop > 250) {
          containerScrolled = true;
        }
      });

      setIsVisible(windowScrolled || containerScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Add scroll listener to any active scrollable container
    const scrollContainers = document.querySelectorAll(".overflow-y-auto");
    scrollContainers.forEach((c) => c.addEventListener("scroll", handleScroll, { passive: true }));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollContainers.forEach((c) => c.removeEventListener("scroll", handleScroll));
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const scrollContainers = document.querySelectorAll(".overflow-y-auto, .overflow-auto, main");
    scrollContainers.forEach((container) => {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-indigo-900 text-white shadow-lg hover:bg-indigo-950 hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <ArrowUp size={18} className="transition-transform group-hover:-translate-y-0.5" />
      <span className="sr-only">Scroll to top</span>
    </button>
  );
}
