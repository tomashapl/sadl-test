import React from "react";
import Link from "next/link";

import { Button } from "@kiwicom/orbit-components";

const InternalButton = ({ href, as, ...props }) => (
  <Link href={href} as={as}>
    <Button {...props} />
  </Link>
);

export default InternalButton;
