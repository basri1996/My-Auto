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
  const Type = ["იყიდება", "ქირავდება"];
  const [MappedData, setMappedData] = useState([]);
  const [DataModel, setDataModel] = useState([]);

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
      }}
    >
      {children}
    </SearchCompContext.Provider>
  );
}
