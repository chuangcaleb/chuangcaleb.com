import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import {Fragment} from 'react/jsx-runtime';
import styles from './styles.module.css';
import {cn} from '~/utils/css';
import {useScroll} from '~/utils/hooks/use-scroll';

// Lazy any lol
// eslint-disable-next-line unicorn/prevent-abbreviations
const NavSheetReact = (properties: any) => {
	const [open, setOpen] = React.useState(false);
	const {direction} = useScroll('up');

	React.useEffect(() => {
		window.addEventListener('hashchange', handleAClick, false);

		return () => {
			window.removeEventListener('hashchange', handleAClick, false);
		};
	}, []);

	function handleAClick() {
		setOpen(false);
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button
					className={cn([
						styles.FloatingButton,
						direction === 'up' ? styles.FloatingUp : styles.FloatingDown,
					])}
				>
					<Fragment>{properties.menuIcon}</Fragment>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.DialogOverlay} />
				<Dialog.Content
					className={cn(styles.DialogContent, 'flow sheet-content')}
				>
					<Dialog.Title className={cn(styles.DialogTitle, 'sr-only')}>
            Page Navigation
					</Dialog.Title>
					<Dialog.Description className={'sr-only'}>
            Navigation for the current page
					</Dialog.Description>
					<Dialog.Close asChild>
						<button className={styles.CloseButton} aria-label='Close'>
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
