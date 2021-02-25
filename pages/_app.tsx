import { AppProps } from "next/app";
import getTokens from "@kiwicom/orbit-components/lib/getTokens";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "../lib/apolloClient";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    font-family: Roboto, sans-serif;
    background: #F5F7F9;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  a {
    text-decoration: none;
  }
  
  #__next {
    min-height: 100%;
    display: flex;
  }
`;

const TOKENS = {
  ...getTokens({
    palette: {
      product: {
        normal: "#080D9E",
        normalHover: "#0C1082",
        normalActive: "#090C6A",
      },
      ink: {
        lighter: "#94A8BE",
      },
    },
  }),
};

interface IAppProps extends AppProps {
  apollo: ApolloClient<InMemoryCache>;
}

const App = ({ Component, pageProps, apollo }: IAppProps) => (
  <>
    <ThemeProvider
      theme={{
        orbit: TOKENS,
      }}
    >
      <GlobalStyle />
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  </>
);

export default withApollo(App);
