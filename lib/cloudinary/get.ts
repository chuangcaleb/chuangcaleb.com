import { ROOT_DIR } from "./consts";
import getCache from "./reader";

const cache = await getCache();

export function getCldImgData(publicId: string) {
  if (!cache) throw new Error("Cloudinary resources have not been cached yet.");

  const imgData = cache.find(
    (resource) => resource.public_id === `${ROOT_DIR}/${publicId}`,
  );

  if (!imgData)
    console.warn(
      `No cached Cloudinary resource found for public_id "${publicId}"`,
    );

  return imgData;
}
