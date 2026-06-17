import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './Button.css';

type Variant = 'primary' | 'ghost';

type CommonProps = {
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'>;

type ButtonElProps = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

type ButtonProps = AnchorProps | ButtonElProps;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  withArrow = true,
  className = '',
  children,
  ...rest
}) => {
  const classes = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight className="btn__arrow" size={18} aria-hidden="true" />}
    </>
  );

  if ('href' in rest && rest.href) {
    const { href, external, ...anchorRest } = rest as AnchorProps;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer noopener"
          {...anchorRest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonRest } = rest as ButtonElProps;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
};

export default Button;
