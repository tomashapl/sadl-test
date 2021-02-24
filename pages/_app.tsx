import { AppProps } from "next/app";
import getTokens from "@kiwicom/orbit-components/lib/getTokens";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider
        theme={{
          orbit: TOKENS,
        }}
      >
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
