// https://blog.coolhead.in/navbar-hide-and-show-on-scroll-using-custom-react-hooks
/**
 * useScroll React custom hook
 * Usage:
 *    const { scrollX, scrollY, scrollDirection } = useScroll();
 */

import {useState, useEffect} from 'react';

export function useScroll(initialDirection: 'up' | 'down') {
	// Storing this to get the scroll direction
	const [lastScrollTop, setLastScrollTop] = useState(0);
	// The offset of the document.body
	const [bodyOffset, setBodyOffset] = useState(
		document.body.getBoundingClientRect(),
	);
	// The vertical direction
	// const [scrollY, setScrollY] = useState(bodyOffset.top);
	// the horizontal direction
	// const [scrollX, setScrollX] = useState(bodyOffset.left);
	// scroll direction would be either up or down
	const [direction, setDirection] = useState<'up' | 'down'>(initialDirection);

	const listener = () => {
		setBodyOffset(document.body.getBoundingClientRect());
		// SetScrollY(-bodyOffset.top);
		// setScrollX(bodyOffset.left);
		setDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up');
		setLastScrollTop(-bodyOffset.top);
	};

	useEffect(() => {
		window.addEventListener('scroll', listener);
		return () => {
			window.removeEventListener('scroll', listener);
		};
	});

	return {
		scrollY,
		// ScrollX,
		direction,
	};
}
