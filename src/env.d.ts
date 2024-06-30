/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
