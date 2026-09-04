import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component ensures that every navigation to a new route
 * automatically scrolls the window and primary scrollable containers to the top.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the main document window to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });

    // Also reset any scrollable container if found
    const scrollContainers = document.querySelectorAll(".overflow-y-auto, .overflow-auto, main");
    scrollContainers.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}
