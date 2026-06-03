import React from 'react';

type MotionProps = {
  children?: React.ReactNode;
  whileHover?: unknown;
  whileTap?: unknown;
  animate?: unknown;
  transition?: unknown;
};

const removeMotionProps = <T extends MotionProps>({
  whileHover: _whileHover,
  whileTap: _whileTap,
  animate: _animate,
  transition: _transition,
  ...rest
}: T) => rest;

const motion = <T extends object>(Component: React.ComponentType<T>) => {
  return function MockMotionComponent(props: T & MotionProps) {
    const cleanProps = removeMotionProps(props);
    return <Component {...(cleanProps as T)}>{props.children}</Component>;
  };
};

motion.div = (props: React.HTMLAttributes<HTMLDivElement> & MotionProps) => {
  const cleanProps = removeMotionProps(props);
  return <div {...cleanProps}>{props.children}</div>;
};

motion.a = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & MotionProps,
) => {
  const cleanProps = removeMotionProps(props);
  return <a {...cleanProps}>{props.children}</a>;
};

export { motion };
