import React from "react";
import styled from "styled-components";
import { Button, Stack, Heading } from "@kiwicom/orbit-components";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import { ProfileModel } from "../generated/graphql";

const StyledHeader = styled.div`
  padding: ${({ theme }) =>
    `${theme.orbit.spaceLarge} ${theme.orbit.spaceSmall}`};
`;

const StyledLogo = styled.div`
  text-transform: uppercase;
`;

interface IHeaderProps {
  profile: ProfileModel;
}

const Header: React.VFC<IHeaderProps> = ({ profile }) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = React.useState(false);
  const { pathname } = useRouter();

  return (
    <>
      <StyledHeader>
        <Stack direction="row" justify="end" align="center">
          {pathname !== "/" && (
            <StyledLogo>
              <Heading type="title1" as="h1">
                DIGILAB
              </Heading>
            </StyledLogo>
          )}
          {profile ? (
            <div>Loged in</div>
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
      </StyledHeader>

      {isLoginModalVisible && (
        <LoginModal onClose={() => setIsLoginModalVisible(false)} />
      )}
    </>
  );
};

export default Header;
