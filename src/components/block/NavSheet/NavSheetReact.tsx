import * as Dialog from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { cn } from "~/utils/css";
import { Fragment } from "react/jsx-runtime";
import React from "react";

// lazy any lol
const NavSheetReact = (props: any) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("hashchange", handleAClick, false);

    return () => {
      window.removeEventListener("hashchange", handleAClick, false);
    };
  }, []);

  function handleAClick() {
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className={styles.FloatingButton}>
          <Fragment>{props.menuIcon}</Fragment>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content
          className={cn(styles.DialogContent, "flow sheet-content")}
        >
          <Dialog.Title className={cn(styles.DialogTitle, "sr-only")}>
            Page Navigation
          </Dialog.Title>
          <Dialog.Description className={"sr-only"}>
            Navigation for the current page
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className={styles.CloseButton} aria-label="Close">
              <Fragment>{props.closeIcon}</Fragment>
            </button>
          </Dialog.Close>
          {props.body}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NavSheetReact;
