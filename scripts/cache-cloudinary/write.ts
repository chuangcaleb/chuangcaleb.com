import fs from 'fs';
import type { CloudinaryResource } from 'lib/cloudinary/types';
import { composeErrorStr } from 'lib/utils/log';
import { JSON_FILE } from 'lib/cloudinary/consts';

export async function write(resources: CloudinaryResource[]): Promise<void> {
  const contents = {
    date: new Date(),
    root: resources,
  };

  try {
    fs.writeFileSync(JSON_FILE, JSON.stringify(contents, null, 2));
    console.info(`📝 Updated ${JSON_FILE}`);
  } catch (error: unknown) {
    console.error(
      `🚨 Error updating ${JSON_FILE}:\n\n${composeErrorStr(error)}`,
    );
  }
}
