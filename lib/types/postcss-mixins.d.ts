declare module 'postcss-mixins' {
	import {type Plugin} from 'postcss';

	const mixins: () => Plugin;
	export default mixins;
}
