import fs from 'fs';
import type { CloudinaryResource } from 'lib/cloudinary/types';
import { composeErrorStr } from 'lib/utils/log';

function composeJsonFileName(folderName: string): string {
  return `./lib/cloudinary/${folderName}.json`;
}

export async function write(
  folderName: string,
  resources: CloudinaryResource[],
): Promise<void> {
  const contents = {
    date: new Date(),
    root: resources,
  };

  const jsonFileName = composeJsonFileName(folderName);

  try {
    fs.writeFileSync(jsonFileName, JSON.stringify(contents, null, 2));
    console.info(`📝 Updated ${jsonFileName}`);
  } catch (error: unknown) {
    console.error(
      `🚨 Error updating ${jsonFileName}:\n\n${composeErrorStr(error)}`,
    );
  }
}
