import React from "react";
import { AppProps } from "next/app";
import getTokens from "@kiwicom/orbit-components/lib/getTokens";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "../lib/apolloClient";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Header from "../src/components/Header";
import Content from "../src/components/Content";
import { ProfileModel } from "../apollo/models/profile.model";
import getAuthorization from "../src/helpers/getAuthorization";
import { GetUserDocument } from "../src/generated/graphql";
import { omitByDeep } from "../src/helpers/omitByDeep";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import removeAuthorization from "../src/helpers/removeAuthorization";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    font-family: Roboto, sans-serif;
    background: #EBEDEC;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  a {
    text-decoration: none;
  }
  
  #__next {
    min-height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: 1400px;
  }
`;

const TOKENS = {
  ...getTokens({
    palette: {
      product: {
        normal: "#3A3A3B",
        normalHover: "#0C1082",
        normalActive: "#090C6A",
      },
      ink: {
        lighter: "#94A8BE",
      },
    },
  }),
};

interface ISadlContext {
  setProfile: (user: ProfileModel) => void;
}

export const SadlContext = React.createContext<ISadlContext>({
  setProfile: () => {},
});

interface IAppProps extends AppProps {
  apollo: ApolloClient<InMemoryCache>;
  user?: ProfileModel;
}

function App({ Component, pageProps, apollo, user }: IAppProps) {
  const [profile, setProfile] = React.useState<ProfileModel>(user);

  return (
    <>
      <ThemeProvider
        theme={{
          orbit: TOKENS,
        }}
      >
        <GlobalStyle />
        <ApolloProvider client={apollo}>
          <SadlContext.Provider
            value={{
              setProfile,
            }}
          >
            <Header profile={profile} />
            <Content>
              <Component {...pageProps} />
            </Content>
          </SadlContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  const { token } = getAuthorization(ctx);

  let profile;
  if (token) {
    try {
      const { data } = await ctx.apolloClient.query({
        query: GetUserDocument,
      });

      profile = omitByDeep(data.user, ["__typename"]);
    } catch (err) {
      removeAuthorization(ctx);
    }
  }

  return {
    pageProps,
    apollo: ctx.apolloClient,
    user: profile,
  };
};

// @ts-ignore
export default withApollo(App);
