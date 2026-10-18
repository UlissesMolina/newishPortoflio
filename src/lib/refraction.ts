/**
 * Edge refraction for liquid glass.
 *
 * Builds a displacement map for a rounded rectangle of a given size: neutral (no shift)
 * in the middle, bending the backdrop inward near the edges like the rim of a lens.
 * Used as an SVG <feDisplacementMap> inside `backdrop-filter: url(#…)`, which only
 * Chromium renders, so callers gate on `supportsRefraction()`.
 */

/** Chromium-based browsers render SVG filters in backdrop-filter; others ignore or break. */
export function supportsRefraction(): boolean {
  if (typeof navigator === 'undefined') return false;
  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } })
    .userAgentData?.brands;
  return !!brands?.some((b) => b.brand === 'Chromium');
}

/** Signed distance from point (px, py) to a rounded box centred at the origin. */
function sdRoundBox(px: number, py: number, hw: number, hh: number, r: number) {
  const qx = Math.abs(px) - (hw - r);
  const qy = Math.abs(py) - (hh - r);
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  return outside + Math.min(Math.max(qx, qy), 0) - r;
}

/**
 * @param width   element width in CSS px
 * @param height  element height in CSS px
 * @param radius  corner radius in CSS px
 * @param bevel   width of the refracting rim in CSS px
 * @returns PNG data URL; R = x shift, G = y shift, 128 = none
 */
export function makeDisplacementMap(width: number, height: number, radius: number, bevel: number) {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const img = ctx.createImageData(w, h);
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(radius, hw, hh);
  const eps = 0.75;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const d = -sdRoundBox(px, py, hw, hh, r); // depth inside the shape
      let dx = 0;
      let dy = 0;
      if (d > 0 && d < bevel) {
        // Inward normal from the distance-field gradient.
        const gx = sdRoundBox(px + eps, py, hw, hh, r) - sdRoundBox(px - eps, py, hw, hh, r);
        const gy = sdRoundBox(px, py + eps, hw, hh, r) - sdRoundBox(px, py - eps, hw, hh, r);
        const len = Math.hypot(gx, gy) || 1;
        // Strongest right at the rim, easing to zero across the bevel (circular lens profile).
        const t = 1 - d / bevel;
        const m = 1 - Math.sqrt(1 - t * t);
        dx = (-gx / len) * m;
        dy = (-gy / len) * m;
      }
      const i = (y * w + x) * 4;
      img.data[i] = 128 + dx * 127;
      img.data[i + 1] = 128 + dy * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}
