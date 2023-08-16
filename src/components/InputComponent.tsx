import styled from "styled-components";
import { SearchCompContext } from "../SearchCompContext";
import { useContext } from "react";

function InputComponent({ title, fetchModels }: any) {
  const { setApiInformation, Type, Data } = useContext(SearchCompContext);
  function GetManId(brand: any) {
    const Mybrand = Data.filteredBrands.find(
      (item: any) => item.man_name === brand
    );
    setApiInformation((prev: any) => ({ ...prev, man_id: Mybrand.man_id }));
    fetchModels(Mybrand.man_id);
  }

  function GetCatId(title: any) {
    const MyCategorie = Data.filteredCategories.find(
      (item: any) => item.title === title
    );
    setApiInformation((prev: any) => ({
      ...prev,
      category_id: MyCategorie.category_id,
    }));
  }
  function GetModelId(model: any) {
    const MyModel = Data.models.find((item: any) => item.model_name === model);
    setApiInformation((prev: any) => ({
      ...prev,
      model_id: "." + MyModel.model_id,
    }));
  }

  function IsForRent(text: any) {
    if (text === "იყიდება") {
      setApiInformation((prev: any) => ({
        ...prev,
        forSale: true,
        forRent: false,
      }));
    } else {
      setApiInformation((prev: any) => ({
        ...prev,
        forRent: true,
        forSale: false,
      }));
    }
  }

  let OptionVar = (
    <Input onChange={(e: any) => IsForRent(e.target.value)}>
      {Type.map((item: any) => (
        <Option key={item}>{item}</Option>
      ))}
    </Input>
  );

  if (title === "მწარმოებელი") {
    OptionVar = (
      <Input
        onChange={(e) => {
          e.target.value != "ყველა მწარმოებელი" && GetManId(e.target.value);
        }}
      >
        <Option>ყველა მწარმოებელი</Option>
        {Data.filteredBrands.map((item: any) => (
          <Option key={item.man_id}>{item.man_name}</Option>
        ))}
      </Input>
    );
  }

  if (title === "კატეგორია") {
    OptionVar = (
      <Input
        onChange={(e) => {
          e.target.value != "ყველა კატეგორია" && GetCatId(e.target.value);
        }}
      >
        <Option>ყველა კატეგორია</Option>
        {Data.filteredCategories.map((item: any) => (
          <Option key={item.category_id}>{item.title}</Option>
        ))}
      </Input>
    );
  }
  if (title === "მოდელი") {
    OptionVar = (
      <Input
        onChange={(e: any) => {
          e.target.value != "ყველა მოდელი" && GetModelId(e.target.value);
        }}
      >
        <Option>ყველა მოდელი</Option>
        {Data.models.map((item: any) => (
          <Option key={item.model_id}>{item.model_name}</Option>
        ))}
      </Input>
    );
  }

  return (
    <InputWrapper>
      <TitleWrapper>
        <InputLabel>{title}</InputLabel>
      </TitleWrapper>
      {OptionVar}
    </InputWrapper>
  );
}

export default InputComponent;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
const TitleWrapper = styled.div`
  width: 80%;
`;
const InputLabel = styled.h1`
  font-size: 15px;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 10px;
  font-family: "YourFontName";
`;
const Input = styled.select`
  height: 40px;
  width: 80%;
  border-radius: 6px;
  border-color: rgba(194, 201, 216, 1);
  color: black;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.75;
  outline: none;
  padding: 10px;
`;
const Option = styled.option`
  color: black;
  font-size: 13px;
  font-weight: 500;
  opacity: 0.75;
  outline: none;
  font-family: "YourFontName";
`;
