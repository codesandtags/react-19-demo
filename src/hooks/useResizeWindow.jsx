import { useEffect, useState } from "react";
import { debounce } from "../utils/debounce";

/**
 * Hook that listens when the windows is resize and return the width and height
 *
 * @returns {Object} - Object with width and height of the window resized
 */
export function useResizeWindow() {
  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
  });

  const getWindowSize = (event) => {
    console.log("Getting window size");
    setWindowSize({
      width: event.target.innerWidth,
      height: event.target.innerHeight,
    });
  };

  useEffect(() => {
    const handleResize = debounce(getWindowSize, 250);
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array

  return windowSize;
}
