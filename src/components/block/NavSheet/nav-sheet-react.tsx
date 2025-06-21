import * as Dialog from '@radix-ui/react-dialog';
import React, {useEffect, type MouseEvent} from 'react';
import {Fragment} from 'react/jsx-runtime';
import styles from './styles.module.css';
import {cn} from '~/utils/css.ts';
import {useScroll} from '~/utils/hooks/use-scroll.ts';
import {useWindowSize} from '~/utils/hooks/use-window-size.ts';

// Lazy any lol

const NavSheetReact = (properties: any) => {
	const [open, setOpen] = React.useState(false);
	const {scrollY, direction} = useScroll('up');
	const {width} = useWindowSize();

	const sheetRef = React.useRef<HTMLDivElement>(null);

	// Previously should use an eventlistener for `hashchange`
	// but this clashes with ViewTransitions API
	useEffect(() => {
		function handleClick(event: Event): void {
			if (!(event instanceof MouseEvent)) return;

			const {target} = event;
			if (!(target instanceof Element)) return;
			if (!sheetRef.current?.contains(target)) return;

			const anchor = target.closest('a');
			if (!(anchor instanceof HTMLAnchorElement)) return;

			const href = anchor.getAttribute('href');
			if (!href?.startsWith('#')) return;

			event.preventDefault();
			setOpen(false);

			setTimeout(() => {
				const scrollTarget = document.querySelector(href);
				if (scrollTarget instanceof HTMLElement) {
					scrollTarget.scrollIntoView({behavior: 'smooth'});
					history.replaceState(null, '', href);
				}
			}, 300);
		}

		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);

	const isMobileTop = width && width < 900 && scrollY < 1;
	const shouldShowFloatingButton = direction === 'down' || isMobileTop;

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button
					className={cn([
						styles.FloatingButton,
						shouldShowFloatingButton
							? styles.FloatingShow
							: styles.FloatingHide,
						isMobileTop && styles.ZeroAnimationDuration,
					])}
					aria-label="Open Navigation Sidebar Sheet"
				>
					<Fragment>{properties.menuIcon}</Fragment>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.DialogOverlay} />
				<Dialog.Content
					className={cn(styles.DialogContent, 'flow sheet-content')}
					ref={sheetRef}
				>
					<Dialog.Title className={cn(styles.DialogTitle, 'sr-only')}>
						Page Navigation
					</Dialog.Title>
					<Dialog.Description className={'sr-only'}>
						Navigation for the current page
					</Dialog.Description>
					<Dialog.Close asChild>
						<button className={styles.CloseButton} aria-label="Close">
							<Fragment>{properties.closeIcon}</Fragment>
						</button>
					</Dialog.Close>
					{properties.body}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default NavSheetReact;
