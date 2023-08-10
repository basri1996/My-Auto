import styled from "styled-components";
import car from "../assets/car.svg";
import moto from "../assets/moto.svg";
import tractor from "../assets/tractor.svg";
import car2 from "../assets/car2.svg";
import moto2 from "../assets/moto2.svg";
import tractor2 from "../assets/tractor2.svg";
import { useState, useEffect, useCallback } from "react";
import InputComponent from "./InputComponent";
import axios from "axios";

function Search() {
  const [isActive, setIsActive] = useState({
    car: true,
    moto: false,
    tractor: false,
  });
  const [isDollar, setIsDollar] = useState(false);
  const [Brands, setBrands] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [Models, setModels] = useState([]);
  const [apiInformation, setApiInformation] = useState({
    man_id: "",
    category_id: 0,
    is_car: false,
    is_moto: false,
    is_spec: false,
  });

  const Type = ["იყიდება", "ქირავდება"];
  const fetchModels = async (number: any) => {
    const response = await axios.get(
      `https://api2.myauto.ge/ka/getManModels?man_id=${number}`
    );

    const Alldata = response.data.data;

    if (apiInformation.is_car === true) {
      const filteredData = Alldata.filter((item: any) => item.is_car === true);
      return setModels(filteredData);
    } else if (apiInformation.is_moto === true) {
      const filteredData = Alldata.filter((item: any) => item.is_moto === true);
      return setModels(filteredData);
    } else if (apiInformation.is_spec === true) {
      const filteredData = Alldata.filter((item: any) => item.is_spec === true);
      return setModels(filteredData);
    }
  };

  console.log(apiInformation);

  function FilterBrands(model: any) {
    const brands = Brands.filter((item) => item[model] === "1");
    setFilteredData(brands);
  }
  function FilterCategories(number: any) {
    const Categories = categories.filter((item) => {
      return item.category_type === number;
    });
    setFilteredCategories(Categories);
  }
  function HandleIsActive(title: any) {
    setIsActive({
      car: false,
      moto: false,
      tractor: false,
      [title]: true,
    });
  }
  const fetchBrands = useCallback(async () => {
    const response = await axios.get(
      "https://static.my.ge/myauto/js/mans.json"
    );
    setBrands(response.data);
  }, []);
  const fetchCategories = useCallback(async () => {
    const response = await axios.get("https://api2.myauto.ge/ka/cats/get");
    setCategories(response.data.data);
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    FilterBrands("is_car");
  }, [Brands]);
  useEffect(() => {
    FilterCategories(0);
  }, [categories]);

  return (
    <MainDiv>
      <CategoryDiv>
        <IconDiv1
          car={isActive.car}
          onClick={() => {
            HandleIsActive("car");
            FilterBrands("is_car");
            FilterCategories(0);
            setApiInformation((prev: any) => ({
              ...prev,
              is_car: true,
              is_spec: false,
              is_moto: false,
            }));
          }}
        >
          <Icon src={isActive.car ? car2 : car} />
        </IconDiv1>
        <IconDiv2
          moto={isActive.moto}
          onClick={() => {
            HandleIsActive("moto");
            FilterBrands("is_moto");
            FilterCategories(2);
            setApiInformation((prev: any) => ({
              ...prev,
              is_car: false,
              is_spec: false,
              is_moto: true,
            }));
          }}
        >
          <Icon src={isActive.moto ? moto2 : moto} />
        </IconDiv2>
        <IconDiv3
          tractor={isActive.tractor}
          onClick={() => {
            HandleIsActive("tractor");
            FilterBrands("is_spec");
            FilterCategories(1);
            setApiInformation((prev: any) => ({
              ...prev,
              is_car: false,
              is_spec: true,
              is_moto: false,
            }));
          }}
        >
          <Icon src={isActive.tractor ? tractor2 : tractor} />
        </IconDiv3>
      </CategoryDiv>
      <InputDiv>
        <InputComponent
          setApiInformation={setApiInformation}
          title={"გარიგების ტიპი"}
          filteredData={Type}
        />
        <InputComponent
          setApiInformation={setApiInformation}
          title={"მწარმოებელი"}
          filteredData={filteredData}
          fetchModels={fetchModels}
        />
        <InputComponent
          setApiInformation={setApiInformation}
          title={"კატეგორია"}
          filteredData={filteredCategories}
        />
        <InputComponent
          setApiInformation={setApiInformation}
          title={"მოდელი"}
          filteredData={Models}
        />
      </InputDiv>
      <PriceDiv>
        <TopDiv>
          <PriceLabel>ფასი</PriceLabel>
          <DollarGelDiv>
            <Gel isDollar={isDollar} onClick={() => setIsDollar(false)}>
              ₾
            </Gel>
            <Dollar isDollar={isDollar} onClick={() => setIsDollar(true)}>
              $
            </Dollar>
          </DollarGelDiv>
        </TopDiv>
        <BottomDiv>
          <PriceInputMin placeholder="დან" />
          <LineDiv />
          <PriceInputMax placeholder="მდე" />
        </BottomDiv>
      </PriceDiv>
      <ButtonDiv>
        <ButtonSearch>ძებნა</ButtonSearch>
      </ButtonDiv>
    </MainDiv>
  );
}

export default Search;

const MainDiv = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 12px 12px 0 0;
  margin-top: 16px;
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
  width: 33.3%;
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
`;
