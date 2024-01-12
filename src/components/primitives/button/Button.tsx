import { type HTMLTag } from "astro/types";
import {
  children,
  mergeProps,
  splitProps,
  type ComponentProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import styles from "./styles.module.css";

interface Props {
  as?: HTMLTag;
  class?: string;
  // theme?: "brand";
}

export type ButtonProps = ComponentProps<HTMLTag> & Props;

const defaultProps: Props = { as: "button" };

function Button(props: ButtonProps) {
  const merged = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merged, ["as", "children", "class"]);
  const resolvedChildren = children(() => local.children);

  return (
    <Dynamic component={local.as} class={styles["cc-btn"]} {...rest}>
      {resolvedChildren()}
    </Dynamic>
  );
}

export default Button;
