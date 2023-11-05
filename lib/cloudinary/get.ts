import { ROOT_DIR } from "./consts";
import getCache from "./reader";

const cache = await getCache();

export function getCldImgData(route: string) {
  if (!cache) throw new Error("Cloudinary resources have not been cached yet.");

  const publicId = `${ROOT_DIR}/${route}`;
  const imgData = cache.find((resource) => resource.public_id === publicId);

  if (!imgData)
    console.warn(
      `⚠️ No cached Cloudinary resource found for public_id "${publicId}"`,
    );

  return imgData;
}
