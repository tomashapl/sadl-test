import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Stack, Heading } from "@kiwicom/orbit-components";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import { ProfileModel } from "../generated/graphql";
import {
  PassengerOutline,
  Close,
  MenuHamburger,
} from "@kiwicom/orbit-components/icons";
import InternalButton from "./Buttons/InternalButton";
import Drawer from "./Drawer";

const StyledHeader = styled.div`
  padding: ${({ theme }) => `${theme.orbit.spaceLarge} 0`};
  position: relative;
`;

const StyledLogo = styled.div`
  cursor: pointer;
  text-transform: uppercase;
`;

interface IHeaderProps {
  profile: ProfileModel;
}

const Header: React.VFC<IHeaderProps> = ({ profile }) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = React.useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);
  const { pathname, push } = useRouter();

  const toggleMenu = React.useCallback(() => {
    setIsDrawerVisible(!isDrawerVisible);
  }, [isDrawerVisible]);

  return (
    <>
      <StyledHeader>
        <Stack direction="row" justify="between" align="center">
          <Stack>
            {pathname !== "/" && (
              <Link href="/" as="/">
                <StyledLogo>
                  <Heading type="title1" as="h1">
                    DIGILAB
                  </Heading>
                </StyledLogo>
              </Link>
            )}
          </Stack>
          <Stack direction="row" justify="end" inline>
            {profile ? (
              <Stack direction="row">
                <InternalButton
                  type="primary"
                  href="/cars"
                  as="/cars"
                  size="large"
                  iconLeft={<PassengerOutline />}
                >
                  {[profile.firstName, profile.lastName].join(" ")}
                </InternalButton>
                <Button
                  type="white"
                  size="large"
                  onClick={toggleMenu}
                  iconLeft={isDrawerVisible ? <Close /> : <MenuHamburger />}
                />
              </Stack>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={() => setIsLoginModalVisible(true)}
              >
                LOG IN
              </Button>
            )}
          </Stack>
        </Stack>

        {isDrawerVisible && (
          <Drawer onChangePath={() => setIsDrawerVisible(false)} />
        )}
      </StyledHeader>

      {isLoginModalVisible && (
        <LoginModal
          onClose={async () => {
            setIsLoginModalVisible(false);
            await push("/cars", "/cars");
          }}
        />
      )}
    </>
  );
};

export default Header;
