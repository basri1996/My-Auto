import GlobalStyles from "./GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import Search from "./components/Search";
import Card from "./components/Card";
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <Search />
      <CardWrapper>
        <Card />
        <Card />
        <Card />
        <Card />
      </CardWrapper>
    </ThemeProvider>
  );
}

export default App;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
