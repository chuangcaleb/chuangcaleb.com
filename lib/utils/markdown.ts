import type {AstroComponentFactory} from 'astro/runtime/server/index.js';
import ProseA from '~/components/styled/monom/ProseA.astro';

export const defaultComponents = {a: ProseA as AstroComponentFactory};
