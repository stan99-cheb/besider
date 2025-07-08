import { useEffect, useState } from "react";

const getOrientationType = () => {
  if (typeof window === "undefined" || typeof window.screen.orientation === 'undefined') {
    return "unknown";
  }

  return window.screen.orientation.type.startsWith("portrait")
    ? "portrait"
    : "landscape";
};

const useOrientation = () => {
  const [orientationType, setOrientationType] = useState(getOrientationType());

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.screen.orientation === 'undefined') {
      return;
    }

    const handleOrientationChange = () => {
      setOrientationType(getOrientationType());
    };

    window.screen.orientation.addEventListener("change", handleOrientationChange);
    return () => {
      window.screen.orientation.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  return {
    orientationType,
  };
};

export default useOrientation;