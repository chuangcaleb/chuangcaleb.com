import * as Dialog from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { cn } from "~/utils/css";
import { Fragment } from "react/jsx-runtime";

const DialogDemo = (props: any) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className={styles.FloatingButton}>
        <Fragment>{props.menuIcon}</Fragment>
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.DialogOverlay} />
      <Dialog.Content className={cn(styles.DialogContent, "flow")}>
        <Dialog.Title className={styles.DialogTitle}>Navigation</Dialog.Title>
        <Dialog.Close asChild>
          <button className={styles.CloseButton} aria-label="Close">
            <Fragment>{props.closeIcon}</Fragment>
          </button>
        </Dialog.Close>
        <div>Some Content</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
