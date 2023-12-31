import fsExtra from "fs-extra/esm";
import { composeErrorStr } from "lib/utils/log";
import { JSON_FILE } from "../consts";
import type { CloudinaryResource } from "../types";

let resources: CloudinaryResource[];

try {
  const json = await fsExtra.readJson(JSON_FILE);
  resources = json["root"];
} catch (error: unknown) {
  throw new Error(
    `🚨 Error reading ${JSON_FILE}:\n\n${composeErrorStr(error)}`,
  );
}

export default function getCache(): CloudinaryResource[] {
  return resources;
}
