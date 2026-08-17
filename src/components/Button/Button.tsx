import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/*
 * Renders whichever element the props imply: `to` gives a router <Link>,
 * `href` a plain <a>, and neither a <button type="button">. Those are the
 * three shapes the site's CTAs actually take. The union below is exclusive,
 * so `to` and `href` together is a type error rather than a silent winner.
 */

export type ButtonVariant = 'lime' | 'coral' | 'teal' | 'plum' | 'light' | 'outline';

type ButtonBaseProps = {
  variant: ButtonVariant;
  children: React.ReactNode;
  /* Layout only — margin, width, flex-shrink. For colour, set a --btn-*
     custom property on an ancestor; see Button.module.css. */
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
