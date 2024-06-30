/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import 'react';

declare module 'react' {
	type CSSProperties = Record<`--${string}`, string | number>;
}
