const DICEBEAR_STYLE = 'notionists-neutral';
const DICEBEAR_BACKGROUND_COLOR = 'e8e6dc'; // --color-warm-sand

export function getGeneratedAvatarUrl(seed: string) {
	const parameters = new URLSearchParams({
		seed,
		backgroundColor: DICEBEAR_BACKGROUND_COLOR,
	});

	return `https://api.dicebear.com/9.x/${DICEBEAR_STYLE}/svg?${parameters.toString()}`;
}
