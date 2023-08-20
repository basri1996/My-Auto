import styled from "styled-components";
import car from "../assets/car.svg";
import moto from "../assets/moto.svg";
import tractor from "../assets/tractor.svg";
import car2 from "../assets/car2.svg";
import moto2 from "../assets/moto2.svg";
import tractor2 from "../assets/tractor2.svg";
import { useEffect, useCallback, useContext } from "react";
import InputComponent from "./InputComponent";
import axios from "axios";
import { SearchCompContext } from "../SearchCompContext";

function Search() {
  const {
    Data,
    setData,
    apiInformation,
    setApiInformation,
    setMappedData,
    setDataModel,
    SearchApi,
  } = useContext(SearchCompContext);

  async function Api(number: any) {
    const response = await axios.get(
      `https://api2.myauto.ge/ka/getManModels?man_id=${number}`
    );
    response.data.data.forEach((item: any) =>
      setDataModel((prev: any) => [...prev, item])
    );
  }

  async function ModelAdder() {
    const response = await axios.get(
      "https://static.my.ge/myauto/js/mans.json"
    );
    response.data.forEach((item: any) => Api(item.man_id));
  }
  useEffect(() => {
    ModelAdder();
  }, []);

  useEffect(() => {
    if (apiInformation.man_id) {
      fetchModels(apiInformation.man_id);
    }
  }, [
    apiInformation.man_id,
    apiInformation.is_car,
    apiInformation.is_moto,
    apiInformation.is_spec,
  ]);

  const Type = ["იყიდება", "ქირავდება"];
  const fetchModels = async (number: any) => {
    const response = await axios.get(
      `https://api2.myauto.ge/ka/getManModels?man_id=${number}`
    );

    const Alldata = response.data.data;

    if (apiInformation.is_car === true) {
      const filteredData = Alldata.filter((item: any) => item.is_car === true);
      return setData((prev: any) => ({
        ...prev,
        models: filteredData,
      }));
    } else if (apiInformation.is_moto === true) {
      const filteredData = Alldata.filter((item: any) => item.is_moto === true);
      return setData((prev: any) => ({
        ...prev,
        models: filteredData,
      }));
    } else if (apiInformation.is_spec === true) {
      const filteredData = Alldata.filter((item: any) => item.is_spec === true);
      return setData((prev: any) => ({
        ...prev,
        models: filteredData,
      }));
    }
  };

  function FilterBrands(model: any) {
    const brands = Data.brands.filter((item) => item[model] === "1");

    setData((prev: any) => ({
      ...prev,
      filteredBrands: brands,
    }));
  }
  function FilterCategories(number: any) {
    const Categories = Data.categories.filter((item) => {
      return item.category_type === number;
    });

    setData((prev: any) => ({
      ...prev,
      filteredCategories: Categories,
    }));
  }
  function HandleIsActive(title: any) {
    setApiInformation((prev: any) => ({
      ...prev,
      is_car: false,
      is_spec: false,
      is_moto: false,
      [title]: true,
    }));
  }

  const fetchBrands = useCallback(async () => {
    const response = await axios.get(
      "https://static.my.ge/myauto/js/mans.json"
    );

    setData((prev: any) => ({
      ...prev,
      brands: response.data,
    }));
  }, []);
  const fetchCategories = useCallback(async () => {
    const response = await axios.get("https://api2.myauto.ge/ka/cats/get");

    setData((prev: any) => ({
      ...prev,
      categories: response.data.data,
    }));
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    FilterBrands("is_car");
  }, [Data.brands]);
  useEffect(() => {
    FilterCategories(0);
  }, [Data.categories]);

  return (
    <MainDiv>
      <CategoryDiv>
        <IconDiv1
          car={apiInformation.is_car}
          onClick={() => {
            FilterBrands("is_car");
            FilterCategories(0);
            HandleIsActive("is_car");
          }}
        >
          <Icon src={apiInformation.is_car ? car2 : car} />
        </IconDiv1>
        <IconDiv2
          moto={apiInformation.is_moto}
          onClick={() => {
            FilterBrands("is_moto");
            FilterCategories(2);
            HandleIsActive("is_moto");
          }}
        >
          <Icon src={apiInformation.is_moto ? moto2 : moto} />
        </IconDiv2>
        <IconDiv3
          tractor={apiInformation.is_spec}
          onClick={() => {
            FilterBrands("is_spec");
            FilterCategories(1);
            HandleIsActive("is_spec");
          }}
        >
          <Icon src={apiInformation.is_spec ? tractor2 : tractor} />
        </IconDiv3>
      </CategoryDiv>
      <InputDiv>
        <InputComponent title={"გარიგების ტიპი"} filteredData={Type} />
        <InputComponent title={"მწარმოებელი"} fetchModels={fetchModels} />
        <InputComponent title={"კატეგორია"} />
        <InputComponent title={"მოდელი"} />
      </InputDiv>
      <PriceDiv>
        <TopDiv>
          <PriceLabel>ფასი</PriceLabel>
          <DollarGelDiv>
            <Gel
              isDollar={apiInformation.isDollar}
              onClick={() => {
                +apiInformation.PriceFrom > 0 ||
                  (+apiInformation.PriceTo > 0 &&
                    setApiInformation((prev: any) => ({
                      ...prev,
                      isDollar: false,
                      PriceFrom: +apiInformation.PriceFrom / 2.62076923,
                      PriceTo: +apiInformation.PriceTo / 2.62076923,
                    })));
                setApiInformation((prev: any) => ({
                  ...prev,
                  isDollar: false,
                }));
              }}
            >
              ₾
            </Gel>
            <Dollar
              isDollar={apiInformation.isDollar}
              onClick={() => {
                +apiInformation.PriceFrom > 0 ||
                  (+apiInformation.PriceTo > 0 &&
                    setApiInformation((prev: any) => ({
                      ...prev,
                      isDollar: true,
                      PriceFrom: +apiInformation.PriceFrom * 2.62076923,
                      PriceTo: +apiInformation.PriceTo * 2.62076923,
                    })));

                setApiInformation((prev: any) => ({
                  ...prev,
                  isDollar: true,
                }));
              }}
            >
              $
            </Dollar>
          </DollarGelDiv>
        </TopDiv>
        <BottomDiv>
          <PriceInputMin
            placeholder="დან"
            onChange={(e: any) => {
              setApiInformation((prev: any) => ({
                ...prev,
                PriceFrom: apiInformation.isDollar
                  ? +e.target.value * 2.62076923
                  : e.target.value,
              }));
            }}
          />
          <LineDiv />
          <PriceInputMax
            placeholder="მდე"
            onChange={(e: any) => {
              setApiInformation((prev: any) => ({
                ...prev,
                PriceTo: apiInformation.isDollar
                  ? +e.target.value * 2.62076923
                  : e.target.value,
              }));
            }}
          />
        </BottomDiv>
      </PriceDiv>
      <ButtonDiv>
        <ButtonSearch
          onClick={() => {
            setMappedData([]);
            SearchApi(1);
          }}
        >
          ძებნა
        </ButtonSearch>
      </ButtonDiv>
    </MainDiv>
  );
}

export default Search;

const MainDiv = styled.div`
  width: 100%;
  height: 700px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px 12px 0 0;
  margin-top: 16px;
  @media (min-width: 768px) {
    width: 85%;
    margin-left: 5%;
  }
  @media (min-width: 1000px) {
    width: 70%;
    margin-left: 5%;
  }
  @media (min-width: 1440px) {
    width: 30%;
    margin-left: 5%;
  }
`;

const CategoryDiv = styled.div`
  height: 47px;
  display: flex;
`;

const IconDiv1 = styled.div<{ car: any }>`
  height: 47px;
  border: 1px solid rgba(226, 229, 235, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  border-radius: 12px 0 0;
  border-bottom: ${(props) =>
    props.car ? "1px solid #FD4100" : "1px solid #E2E5EB"};
  background-color: ${(props) =>
    props.car ? "white" : "rgba(249, 249, 251, 1)"};
`;

const IconDiv2 = styled.div<{ moto: any }>`
  height: 47px;
  border-top: 1px solid rgba(226, 229, 235, 1);
  border-bottom: ${(props) =>
    props.moto ? "1px solid #FD4100" : "1px solid #E2E5EB"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  background-color: ${(props) =>
    props.moto ? "white" : "rgba(249, 249, 251, 1)"};
`;
const IconDiv3 = styled.div<{ tractor: any }>`
  display: flex;
  justify-content: center;
  height: 47px;
  align-items: center;
  width: 33.4%;
  border-radius: 0 12px 0 0;
  border: 1px solid rgba(226, 229, 235, 1);
  border-bottom: ${(props) =>
    props.tractor ? "1px solid #FD4100" : "1px solid #E2E5EB"};
  background-color: ${(props) =>
    props.tractor ? "white" : "rgba(249, 249, 251, 1)"};
`;

const Icon = styled.img``;

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(226, 229, 235, 1);
`;

const PriceDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;
const TopDiv = styled.div`
  width: 80%;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;
const PriceLabel = styled.h1`
  font-size: 18px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0px;
  color: rgba(39, 42, 55, 1);
  font-family: "YourFontName";
`;
const DollarGelDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 48px;
  height: 26px;
  border-radius: 20px;
  border: 1px solid #e2e5eb;
`;
const Dollar = styled.div<{ isDollar: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: ${(props) => (props.isDollar ? "white" : "rgba(140, 146, 155, 1)")};
  background-color: ${(props) =>
    props.isDollar ? "rgba(39, 42, 55, 1)" : "white"};
  font-family: "YourFontName";
`;
const Gel = styled.div<{ isDollar: any }>`
  background-color: ${(props) =>
    props.isDollar ? "white" : "rgba(39, 42, 55, 1)"};
  color: ${(props) => (props.isDollar ? "rgba(140, 146, 155, 1)" : "white")};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "YourFontName";
`;
const BottomDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 25px;
`;
const PriceInputMin = styled.input`
  height: 40px;
  width: 50%;
  border-radius: 6px;
  border: 1px solid rgba(194, 201, 216, 1);
  color: black;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.75;
  outline: none;
  padding: 10px;
`;
const PriceInputMax = styled.input`
  height: 40px;
  width: 50%;
  border-radius: 6px;
  border: 1px solid rgba(194, 201, 216, 1);
  color: black;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.75;
  outline: none;
  padding: 10px;
`;

const LineDiv = styled.div`
  width: 6px;
  height: 2px;
  border-radius: 100px;
  background-color: rgba(140, 146, 155, 1);
`;

const ButtonDiv = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonSearch = styled.button`
  width: 202px;
  height: 32px;
  padding: 8px 76px 8px 76px;
  border-radius: 6px;
  gap: 4px;
  background-color: rgba(253, 65, 0, 1);
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0px;
  color: white;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
