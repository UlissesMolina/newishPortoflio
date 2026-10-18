import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { makeDisplacementMap, supportsRefraction } from '../lib/refraction';

interface Props {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Bend the backdrop at the edges (Chromium only; others get frosted glass). */
  refract?: boolean;
  /** Refraction strength in px of backdrop shift at the rim. */
  strength?: number;
  /** Width of the refracting rim in px. */
  bevel?: number;
  /** Blur applied after refraction; refracting glass stays clearer than panels. */
  blur?: number;
  [key: string]: unknown;
}

interface MapState {
  url: string;
  w: number;
  h: number;
}

/**
 * Glass surface. Always frosted via the global `.glass` class; with `refract`, a
 * size-matched displacement map is regenerated on resize and fed to backdrop-filter.
 */
export function LiquidGlass({
  as: Tag = 'div',
  className = '',
  style,
  children,
  refract = false,
  strength = 38,
  bevel = 18,
  blur = 3,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const filterId = `lg${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [map, setMap] = useState<MapState | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!refract || !el || !supportsRefraction()) return;
    let raf = 0;
    const build = () => {
      const { width, height } = el.getBoundingClientRect();
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      if (width < 2 || height < 2) return;
      setMap({ url: makeDisplacementMap(width, height, radius, bevel), w: width, h: height });
    };
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [refract, bevel]);

  const refractStyle: CSSProperties | undefined = map
    ? {
        backdropFilter: `url(#${filterId}) blur(${blur}px) saturate(190%)`,
        WebkitBackdropFilter: `url(#${filterId}) blur(${blur}px) saturate(190%)`,
      }
    : undefined;

  return (
    <Tag ref={ref} className={`glass ${className}`} style={{ ...style, ...refractStyle }} {...rest}>
      {map && (
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <filter
            id={filterId}
            x="0"
            y="0"
            width={map.w}
            height={map.h}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={map.url}
              x="0"
              y="0"
              width={map.w}
              height={map.h}
              preserveAspectRatio="none"
              result="map"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={strength * 2}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}
      {children}
    </Tag>
  );
}
