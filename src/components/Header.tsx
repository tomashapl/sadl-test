import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Stack, Heading } from "@kiwicom/orbit-components";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import { ProfileModel } from "../generated/graphql";
import { PassengerOutline } from "@kiwicom/orbit-components/icons";
import InternalButton from "./Buttons/InternalButton";

const StyledHeader = styled.div`
  padding: ${({ theme }) => `${theme.orbit.spaceLarge} 0`};
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
  const { pathname, push } = useRouter();

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
              <InternalButton
                type="primary"
                href="/cars"
                as="/cars"
                size="large"
                iconLeft={<PassengerOutline />}
              >
                {[profile.firstName, profile.lastName].join(" ")}
              </InternalButton>
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
