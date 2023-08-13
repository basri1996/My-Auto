import GlobalStyles from "./GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import Search from "./components/Search";
import Card from "./components/Card";
import { useState } from "react";
function App() {
  const [MappedData, setMappedData] = useState([]);
  const [cardInformation, setCardInformation] = useState({
    brandName: "",
  });
  console.log("map :", MappedData);

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
      <WrapperDiv>
        <Search
          setMappedData={setMappedData}
          setCardInformation={setCardInformation}
        />
        <CardWrapper>
          {MappedData.map((item: any) => (
            <Card
              photo={item.photo}
              ProductId={item.car_id}
              Var={item.photo_ver}
              price={item.price}
              year={item.prod_year}
              carRun={item.car_run_km}
              carname={cardInformation.brandName}
              engine={(item.engine_volume / 1000).toFixed(1)}
            />
          ))}
        </CardWrapper>
      </WrapperDiv>
    </ThemeProvider>
  );
}

export default App;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const WrapperDiv = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;
