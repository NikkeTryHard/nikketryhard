import React, { useEffect, useRef, useState, useId } from "react";

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  displace?: number;
  backgroundOpacity?: number;
  saturation?: number;
  distortionScale?: number;
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  xChannel?: "R" | "G" | "B";
  yChannel?: "R" | "G" | "B";
  mixBlendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity"
    | "plus-darker"
    | "plus-lighter";
  className?: string;
  style?: React.CSSProperties;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDark;
};

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 50,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 24,
  displace = 0.5,
  backgroundOpacity = 0.4,
  saturation = 1.4,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "normal",
  className = "",
  style = {},
}) => {
  const uniqueId = useId().replace(/:/g, "-");
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const isDarkMode = useDarkMode();

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${
      actualWidth - edgeSize * 2
    }" height="${
      actualHeight - edgeSize * 2
    }" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute("href", generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    if (displacementMapRef.current) {
      displacementMapRef.current.setAttribute(
        "scale",
        distortionScale.toString()
      );
      displacementMapRef.current.setAttribute("xChannelSelector", xChannel);
      displacementMapRef.current.setAttribute("yChannelSelector", yChannel);
    }

    gaussianBlurRef.current?.setAttribute("stdDeviation", displace.toString());
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height]);

  const supportsSVGFilters = () => {
    const isWebkit =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    if (isWebkit || isFirefox) {
      return false;
    }

    const div = document.createElement("div");
    div.style.backdropFilter = `url(#${filterId})`;
    return div.style.backdropFilter !== "";
  };

  const supportsBackdropFilter = () => {
    if (typeof window === "undefined") return false;
    return CSS.supports("backdrop-filter", "blur(10px)");
  };

  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      ...style,
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"],
      "--glass-frost": backgroundOpacity,
      "--glass-saturation": saturation,
    } as React.CSSProperties;

    const svgSupported = supportsSVGFilters();
    const backdropFilterSupported = supportsBackdropFilter();

    const backdropBlur = `blur(${blur}px)`;
    const backdropSaturate = `saturate(${saturation})`;

    const glassBackground = isDarkMode
      ? `linear-gradient(145deg, rgba(40,40,40,${Math.min(
          backgroundOpacity + 0.3,
          0.9
        )}), rgba(10,10,10,${Math.min(backgroundOpacity + 0.1, 0.8)}))`
      : `linear-gradient(145deg, rgba(255,255,255,${Math.min(
          backgroundOpacity + 0.4,
          0.95
        )}), rgba(255,255,255,${Math.min(backgroundOpacity + 0.1, 0.8)}))`;

    const borderGradient = isDarkMode
      ? `linear-gradient(to bottom right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.05) 100%)`
      : `linear-gradient(to bottom right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.1) 100%)`;

    if (svgSupported) {
      return {
        ...baseStyles,
        background: `${glassBackground} padding-box, ${borderGradient} border-box`,
        border: "1px solid transparent",
        backdropFilter: `url(#${filterId}) ${backdropBlur} ${backdropSaturate}`,
        boxShadow: isDarkMode
          ? `inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
             inset 0 -15px 30px -10px rgba(0, 0, 0, 0.7),
             inset 0 0 20px rgba(0, 0, 0, 0.3),
             0 20px 40px -10px rgba(0, 0, 0, 0.6)`
          : `inset 0 1px 0 0 rgba(255, 255, 255, 0.6),
             inset 0 -15px 30px -10px rgba(200, 200, 200, 0.3),
             inset 0 0 20px rgba(255, 255, 255, 0.6),
             0 20px 40px -10px rgba(0, 0, 0, 0.2)`,
      };
    } else {
      if (isDarkMode) {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: "rgba(20, 20, 20, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.15)`,
          };
        } else {
          return {
            ...baseStyles,
            background: `${glassBackground} padding-box, ${borderGradient} border-box`,
            border: "1px solid transparent",
            backdropFilter: `${backdropBlur} ${backdropSaturate}`,
            WebkitBackdropFilter: `${backdropBlur} ${backdropSaturate}`,
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                        inset 0 -20px 40px -10px rgba(0, 0, 0, 0.4),
                        0 20px 40px -10px rgba(0, 0, 0, 0.4)`,
          };
        }
      } else {
        // Light mode fallback
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: "rgba(255, 255, 255, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5)`,
          };
        } else {
          return {
            ...baseStyles,
            background: `${glassBackground} padding-box, ${borderGradient} border-box`,
            border: "1px solid transparent",
            backdropFilter: `${backdropBlur} ${backdropSaturate}`,
            WebkitBackdropFilter: `${backdropBlur} ${backdropSaturate}`,
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                        inset 0 -10px 30px -5px rgba(0, 0, 0, 0.05),
                        0 20px 40px -10px rgba(0, 0, 0, 0.15)`,
          };
        }
      }
    }
  };

  const glassSurfaceClasses =
    "relative flex items-center justify-center overflow-hidden transition-opacity duration-[260ms] ease-out";

  const focusVisibleClasses = isDarkMode
    ? "focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2"
    : "focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2";

  return (
    <div
      ref={containerRef}
      className={`${glassSurfaceClasses} ${focusVisibleClasses} ${className}`}
      style={getContainerStyles()}
    >
      <svg
        className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage
              ref={feImageRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />

            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="map"
              result="output"
            />
            <feGaussianBlur
              ref={gaussianBlurRef}
              in="output"
              stdDeviation={displace}
            />
          </filter>
        </defs>
      </svg>

      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
