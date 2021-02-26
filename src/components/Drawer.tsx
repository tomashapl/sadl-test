import React from "react";
import styled from "styled-components";
import { Heading, Stack } from "@kiwicom/orbit-components";
import InternalTextLink from "./Buttons/InternalTextLink";

const StyledDrawer = styled.div`
  position: absolute;
  border-bottom: 2px solid ${({ theme }) => theme.orbit.paletteCloudDark};
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.orbit.spaceXXXLarge};
  background: ${({ theme }) => theme.orbit.paletteWhite};
  margin: 0 auto;
  z-index: 10;
`;

interface IDrawerProps {
  onChangePath: () => void;
}

const Drawer: React.VFC<IDrawerProps> = ({ onChangePath }) => (
  <StyledDrawer>
    <Stack direction="row" justify="center" spacing="XXLarge">
      <Stack direction="column" grow={false} inline>
        <Heading type="title2">Car Rental</Heading>
        <InternalTextLink
          type="secondary"
          href="/cars"
          as="/cars"
          onClick={onChangePath}
        >
          New Rental
        </InternalTextLink>
        <InternalTextLink
          type="secondary"
          href="/history"
          as="/history"
          onClick={onChangePath}
        >
          My rides history
        </InternalTextLink>
      </Stack>
      <Stack direction="column" grow={false} inline>
        <Heading type="title2">About</Heading>
        <InternalTextLink
          type="secondary"
          href="/about"
          as="/about"
          onClick={onChangePath}
        >
          Email us
        </InternalTextLink>
      </Stack>
    </Stack>
  </StyledDrawer>
);

export default Drawer;
