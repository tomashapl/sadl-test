import React from "react";
import Link, { LinkProps } from "next/link";

import TextLink, {
  Props as TextLinkProps,
} from "@kiwicom/orbit-components/lib/TextLink";

interface IInternalTextLinkProps extends TextLinkProps, Pick<LinkProps, "as"> {}

const InternalTextLink: React.FC<IInternalTextLinkProps> = ({
  href,
  as,
  children,
  ...props
}) => (
  <Link href={href} as={as}>
    <TextLink {...props}>{children}</TextLink>
  </Link>
);

export default InternalTextLink;
