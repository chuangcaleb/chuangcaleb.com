import React from 'react';

// Ripped from [usehooks/index.js at 90fbbb4cc085e74e50c36a62a5759a40c62bb98e · uidotdev/usehooks](https://github.com/uidotdev/usehooks/blob/90fbbb4cc085e74e50c36a62a5759a40c62bb98e/index.js#L1341)

export function useWindowSize() {
	const [size, setSize] = React.useState<{width?: number; height?: number}>({
		width: undefined,
		height: undefined,
	});

	React.useLayoutEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return size;
}
