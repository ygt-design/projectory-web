import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export type ButtonVariant = 'lime' | 'coral' | 'teal' | 'plum' | 'light' | 'outline';

type ButtonBaseProps = {
  variant: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsLink = ButtonBaseProps &
  Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'> & {
    to: string;
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> & {
    href: string;
    to?: never;
  };

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: never;
    href?: never;
  };

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

const isExternal = (href: string) => /^(https?:)?\/\/|^mailto:|^tel:/.test(href);

const Button: React.FC<ButtonProps> = ({
  variant,
  className: layoutClassName,
  children,
  ...rest
}) => {
  const className = [styles.base, styles[variant], layoutClassName].filter(Boolean).join(' ');

  if (rest.to !== undefined) {
    const { to, ...linkProps } = rest;
    return (
      <Link {...linkProps} to={to} className={className}>
        {children}
      </Link>
    );
  }

  if (rest.href !== undefined) {
    const { href, target, rel, ...anchorProps } = rest;
    const external = isExternal(href);
    return (
      <a
        {...anchorProps}
        href={href}
        target={target ?? (external ? '_blank' : undefined)}
        rel={rel ?? (external ? 'noopener noreferrer' : undefined)}
        className={className}
      >
        {children}
      </a>
    );
  }

  const { type, ...buttonProps } = rest;
  return (
    <button {...buttonProps} type={type ?? 'button'} className={className}>
      {children}
    </button>
  );
};

export default Button;
