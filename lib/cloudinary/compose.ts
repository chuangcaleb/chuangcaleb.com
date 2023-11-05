import cloudinary from ".";

const W1 = 360;
const W2 = 480;

const widths = [
  W1, // 360
  W2, // 480
  W1 * 2, // 720
  850,
  // W2 * 2, // 960
  1024,
  // W1 * 3, // 1180
  1250,
  1440,
  // 1680,
  1920,
  2160,
];

export function composeSrc(publicId: string, width: number) {
  return cloudinary.url(publicId, {
    crop: "scale",
    fetch_format: "auto",
    quality: "auto",
    width: width,
  });
}

export function composeSrcset(publicId: string, maxWidth: number) {
  let set = [];
  for (const width of widths) {
    if (width > maxWidth) break;
    set.push(`${composeSrc(publicId, width)} ${width}w`);
  }
  return set.join(", ");
}
