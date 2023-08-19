import axios from "axios";
import { createContext, useState } from "react";

type SearchCompContextType = {
  apiInformation: {
    man_id: string;
    category_id: string;
    model_id: string;
    forRent: boolean;
    forSale: boolean;
    is_car: boolean;
    is_moto: boolean;
    is_spec: boolean;
    PriceFrom: string;
    PriceTo: string;
    isDollar: boolean;
  };

  setApiInformation: React.Dispatch<
    React.SetStateAction<{
      man_id: string;
      category_id: string;
      model_id: string;
      forRent: boolean;
      forSale: boolean;
      is_car: boolean;
      is_moto: boolean;
      is_spec: boolean;
      PriceFrom: string;
      PriceTo: string;
      isDollar: boolean;
    }>
  >;

  Data: {
    brands: any;
    filteredBrands: any;
    categories: any;
    filteredCategories: any;
    models: any;
  };

  setData: React.Dispatch<
    React.SetStateAction<{
      brands: any;
      filteredBrands: any;
      categories: any;
      filteredCategories: any;
      models: any;
    }>
  >;
  Type: any;
  MappedData: any;
  setMappedData: any;
  DataModel: any;
  setDataModel: any;
  IsCarCatIds: Array<number>;
  isMotoCatIds: Array<number>;
  isSpecCatIds: Array<number>;
  loaderVisible: any;
  setLoaderVisible: any;
  searchVisible: any;
  setSearchVisible: any;
  SearchApi: any;
  pagesVisible: any;
  setPagesVisible: any;
  pageNumber: any;
};

export const SearchCompContext = createContext<SearchCompContextType>(
  {} as SearchCompContextType
);

export function SearchCompContextProvider({ children }) {
  const [Data, setData] = useState({
    brands: [],
    filteredBrands: [],
    categories: [],
    filteredCategories: [],
    models: [],
  });

  const [apiInformation, setApiInformation] = useState({
    man_id: "",
    category_id: "",
    model_id: "",
    forRent: false,
    forSale: true,
    is_car: true,
    is_moto: false,
    is_spec: false,
    PriceFrom: "",
    PriceTo: "",
    isDollar: false,
  });

  const IsCarCatIds = [0, 5, 4, 2, 3, 6, 29, 30, 7, 13, 15, 66];
  const isMotoCatIds = [17, 31, 33, 21, 47, 46, 32];
  const isSpecCatIds = [
    36, 16, 38, 27, 23, 25, 20, 19, 28, 42, 37, 44, 43, 40, 14, 39, 45, 50, 53,
    24, 26, 48, 35, 41, 57, 65, 61, 49,
  ];

  const Type = ["იყიდება", "ქირავდება"];
  const [MappedData, setMappedData] = useState([]);
  const [DataModel, setDataModel] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);
  const [pagesVisible, setPagesVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState([]);
  console.log("ddddd", pageNumber);

  async function SearchApi(number: any) {
    setLoaderVisible(true);
    const response = await axios.get(`https://api2.myauto.ge/ka/products`, {
      params: {
        Mans: `${apiInformation.man_id}${apiInformation.model_id}`,
        Cats: apiInformation.category_id,
        PriceFrom: apiInformation.PriceFrom,
        PriceTo: apiInformation.PriceTo,
        ForRent: apiInformation.forRent ? "1" : "0",
        SortOrder: "4",
        Page: number,
      },
    });

    setPageNumber(response.data.data.meta.last_page);
    setMappedData(response.data.data.items);
    setSearchVisible(false);
    setLoaderVisible(false);
  }

  return (
    <SearchCompContext.Provider
      value={{
        Data,
        setData,
        apiInformation,
        setApiInformation,
        Type,
        MappedData,
        setMappedData,
        DataModel,
        setDataModel,
        IsCarCatIds,
        isMotoCatIds,
        isSpecCatIds,
        loaderVisible,
        setLoaderVisible,
        searchVisible,
        setSearchVisible,
        SearchApi,
        pagesVisible,
        setPagesVisible,
        pageNumber,
      }}
    >
      {children}
    </SearchCompContext.Provider>
  );
}
