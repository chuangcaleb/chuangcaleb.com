import cloudinary from ".";

const W = 375;

const widths = [
  W, // 375
  W * 2, // 750
  850,
  1020,
  W * 3, // 1125
  1440,
  1680,
  1920,
  2160,
];

export function composeSrc(publicId: string) {}

export function composeSrcset(publicId: string) {
  return widths
    .reduce(function (prev, curr) {
      prev.push(
        `${cloudinary.url(publicId, {
          crop: "scale",
          fetch_format: "auto",
          quality: "auto",
          width: curr,
        })} ${curr}w`,
      );
      return prev;
    }, [] as string[])
    .join(", ");
}
