import GlobalStyles from "./GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import Search from "./components/Search";
import Card from "./components/Card";
import { useContext, useLayoutEffect, useRef } from "react";
import { SearchCompContext } from "./SearchCompContext";
import Loader from "./components/Loader";
import ReactPaginate from "react-paginate";
import "./pagination.css";

function App() {
  const {
    MappedData,
    apiInformation,
    IsCarCatIds,
    isMotoCatIds,
    isSpecCatIds,
    setMappedData,
    SearchApi,
    loaderVisible,
    pagesVisible,
    setPagesVisible,
    pageNumber,
  } = useContext(SearchCompContext);

  const FilterMappedData = () => {
    if (apiInformation.is_car === true) {
      const Filtered = MappedData.filter((item: any) =>
        IsCarCatIds.includes(item.category_id)
      );
      if (Filtered.length > 0) {
        setPagesVisible(true);
      }
      return Filtered;
    } else if (apiInformation.is_moto === true) {
      const Filtered = MappedData.filter((item: any) =>
        isMotoCatIds.includes(item.category_id)
      );
      if (Filtered.length > 0) {
        setPagesVisible(true);
      }
      return Filtered;
    } else if (apiInformation.is_spec === true) {
      const Filtered = MappedData.filter((item: any) =>
        isSpecCatIds.includes(item.category_id)
      );
      if (Filtered.length > 0) {
        setPagesVisible(true);
      }
      return Filtered;
    }
  };

  function HandlePageChange(e: any) {
    SearchApi(e.selected + 1);
    setMappedData([]);
    console.log("selected", e.selected);
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

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
        <Search />

        <CardWrapper loaderVisible={loaderVisible}>
          {loaderVisible && <Loader />}
          {FilterMappedData().map((item: any) => (
            <Card
              photo={item.photo}
              ProductId={item.car_id}
              Var={item.photo_ver}
              price={item.price_value}
              priceUsd={item.price_usd}
              year={item.prod_year}
              carRun={item.car_run_km}
              man_id={item.man_id}
              model_id={item.model_id}
              engine={(item.engine_volume / 1000).toFixed(1)}
              customs_passed={item.customs_passed}
              right_wheel={item.right_wheel}
              gear_type_id={item.gear_type_id}
              fuel_type_id={item.fuel_type_id}
              location_id={item.location_id}
              category_id={item.category_id}
            />
          ))}
          {pagesVisible && (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={HandlePageChange}
              pageRangeDisplayed={5}
              pageCount={pageNumber}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              activeClassName="active"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
            />
          )}
        </CardWrapper>
      </WrapperDiv>
    </ThemeProvider>
  );
}

export default App;

const CardWrapper = styled.div<{ loaderVisible: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  margin-top: ${(props) => (props.loaderVisible === true ? "-100px" : "16px")};
  margin-bottom: 100px;
`;

const WrapperDiv = styled.div`
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
  }
`;

const TextNotFound = styled.h1`
  font-size: 30px;
  font-weight: 400;
  line-height: 17px;
  font-family: "YourFontName";
  color: rgba(253, 65, 0, 1);
  border: 2px solid rgba(253, 65, 0, 1);
  border-radius: 20px;
  padding: 50px;
  opacity: 70%;
`;
