/**
 * MDX component overrides for Insights long-form posts.
 *
 * Map HTML elements rendered from MDX to typographic primitives that
 * match the design tokens. Inline links use next/link for same-origin
 * paths so client-side navigation stays smooth.
 */
import Link, { type LinkProps } from 'next/link';
import type {
  AnchorHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';
import type { MDXComponents } from 'mdx/types';

interface QuoteProps {
  name: string;
  title: string;
  children: ReactNode;
}

/**
 * Pull-quote with author attribution. Used in case-study MDX bodies
 * to render the technical-buyer quote in section 8.
 */
function Quote({ name, title, children }: QuoteProps) {
  return (
    <figure className="mdx__quote">
      <blockquote className="mdx__quote-body">{children}</blockquote>
      <figcaption className="mdx__quote-author">
        <span className="mdx__quote-name">{name}</span>
        <span className="mdx__quote-title">{title}</span>
      </figcaption>
    </figure>
  );
}

function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href = '', children, ...rest } = props;
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} {...(rest as Omit<LinkProps, 'href'>)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className="mdx__h1" {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className="mdx__h2" {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="mdx__h3" {...props} />,
  h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 className="mdx__h4" {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mdx__p" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="mdx__ul" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="mdx__ol" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="mdx__li" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote className="mdx__blockquote" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <pre className="mdx__pre" {...props} />,
  code: (props: ComponentPropsWithoutRef<'code'>) => <code className="mdx__code" {...props} />,
  hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr className="mdx__hr" {...props} />,
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="mdx__img" {...props} />
  ),
  a: MdxLink,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="mdx__strong" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="mdx__em" {...props} />,
  Quote,
};
