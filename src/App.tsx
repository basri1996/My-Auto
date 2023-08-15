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
  const [pirmebi, setPirmebi] = useState([]);
  const [DataModel, setDataModel] = useState([]);

  console.log("Chemebi", DataModel);

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
          setPirmebi={setPirmebi}
          setDataModel={setDataModel}
        />
        <CardWrapper>
          {MappedData.map((item: any) => (
            <Card
              photo={item.photo}
              ProductId={item.car_id}
              Var={item.photo_ver}
              price={item.price_value}
              year={item.prod_year}
              carRun={item.car_run_km}
              man_id={item.man_id}
              engine={(item.engine_volume / 1000).toFixed(1)}
              customs_passed={item.customs_passed}
              right_wheel={item.right_wheel}
              gear_type_id={item.gear_type_id}
              fuel_type_id={item.fuel_type_id}
              location_id={item.location_id}
              pirmebi={pirmebi}
              brendebi={DataModel}
              model_id={item.model_id}
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
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 100px;
`;

const WrapperDiv = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;
