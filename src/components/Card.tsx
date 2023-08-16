import styled from "styled-components";
import icon from "../assets/done-path.png";
import flag from "../assets/flag - geo.png";
import { SearchCompContext } from "../SearchCompContext";
import { useContext } from "react";
function Card({
  photo,
  ProductId,
  Var,
  price,
  priceUsd,
  year,
  carRun,
  man_id,
  engine,
  customs_passed,
  right_wheel,
  gear_type_id,
  fuel_type_id,
  model_id,
}: any) {
  const { Data, DataModel, apiInformation } = useContext(SearchCompContext);
  let GearType = () => {
    if (gear_type_id == "1") {
      return "მექანიკა";
    } else if (gear_type_id == "2") {
      return "ავტომატიკა";
    } else if (gear_type_id == "3") {
      return "ტიპტრონიკი";
    } else if (gear_type_id == "4") {
      return "ვარიატორი";
    }
  };

  let FuelType = () => {
    if (fuel_type_id == "2") {
      return "ბენზინი";
    } else if (fuel_type_id == "3") {
      return "დიზელი";
    } else if (fuel_type_id == "8") {
      return "ბუნებრივი გაზი";
    } else if (fuel_type_id == "9") {
      return "თხევადი გაზი";
    } else if (fuel_type_id == "6") {
      return "ჰიბრიდი";
    } else if (fuel_type_id == "7") {
      return "ელექტრო";
    }
  };

  let TitleFinder = (id: any) => {
    let data = Data.brands.find((item: any) => item.man_id == id);
    return data.man_name;
  };
  let ModelFinder = (id: any) => {
    let data = DataModel.find((item: any) => item.model_id == id);
    return data.model_name;
  };

  return (
    <ResponsiveDiv>
      <AutoImage2
        src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${ProductId}_1.jpg?v=${Var}`}
      />
      <MainDiv>
        <HeaderDiv>
          <Title>
            {TitleFinder(man_id)} {ModelFinder(model_id)}
          </Title>
          <Year>{year} წ</Year>
        </HeaderDiv>
        <AfterHeader>
          <PriceDiv>
            <Price price={price}>
              {price == 0
                ? "ფასი შეთანხმებით"
                : apiInformation.isDollar
                ? priceUsd.toLocaleString()
                : price.toLocaleString()}
            </Price>
            {price != 0 && (
              <Gel isDollar={apiInformation.isDollar}>
                {apiInformation.isDollar ? "$" : "₾"}
              </Gel>
            )}
          </PriceDiv>
          {customs_passed ? (
            <Clearance>
              <Icon src={icon} />
              <Text>განბაჟებული</Text>
            </Clearance>
          ) : (
            <NoClearance>განბაჟება 2,176 ₾</NoClearance>
          )}
        </AfterHeader>
        <AutoImage
          src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${ProductId}_1.jpg?v=${Var}`}
        />
        <FooterDiv>
          <LeftColumn>
            <InfoTag>{carRun} კმ</InfoTag>
            <InfoTag>
              {engine}

              {FuelType()}
            </InfoTag>
            <InfoTag>{GearType()}</InfoTag>
          </LeftColumn>
          <RightColumn>
            <InfoTag>სედანი</InfoTag>
            <InfoTag>{right_wheel ? "მარჯვენა" : "მარცხენა"}</InfoTag>
            <LocationTag>
              <Icon src={flag} />
              <InfoTag>თბილისი</InfoTag>
            </LocationTag>
          </RightColumn>
        </FooterDiv>
      </MainDiv>
      {customs_passed ? (
        <Clearance2>
          <Icon src={icon} />
          <Text>განბაჟებული</Text>
        </Clearance2>
      ) : (
        <NoClearance2>განბაჟება 2,176 ₾</NoClearance2>
      )}
    </ResponsiveDiv>
  );
}

export default Card;
const ResponsiveDiv = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 90%;
  }
  @media (min-width: 1440px) {
    display: flex;
    background-color: rgba(255, 255, 255, 1);
    width: 80%;
    height: 180px;
    align-items: center;
    border-radius: 12px;
  }
`;

const MainDiv = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  padding: 15px 10%;
  width: 100%;
  border-radius: 12px 12px 0 0;
  @media (min-width: 768px) {
    width: 90%;
  }
  @media (min-width: 1440px) {
    width: 50%;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  gap: 7px;
`;
const Title = styled.h1`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  font-family: "YourFontName";
`;
const Year = styled.h2`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  font-family: "YourFontName";
  color: rgba(137, 150, 174, 1);
`;

const AfterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
`;

const PriceDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Price = styled.h1<{ price: string }>`
  font-family: "YourFontName";
  font-size: ${(props) => (props.price == "0" ? "13px" : "20px")};
  font-weight: 700;
  line-height: 28px;
`;
const Gel = styled.div<{ isDollar: any }>`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "YourFontName";
  color: ${(props) => (props.isDollar ? "white" : "rgba(140, 146, 155, 1)")};
  background-color: ${(props) =>
    props.isDollar ? "rgba(39, 42, 55, 1)" : "rgba(242, 242, 246, 1)"};
`;

const Clearance = styled.div`
  width: 95px;
  height: 24px;
  border-radius: 6px;
  background-color: rgba(238, 251, 241, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  @media (min-width: 1440px) {
    display: none;
  }
`;

const Clearance2 = styled.div`
  display: none;
  @media (min-width: 1440px) {
    width: 95px;
    height: 24px;
    border-radius: 6px;
    background-color: rgba(238, 251, 241, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-top: -90px;
    margin-left: 13%;
  }
`;

const NoClearance = styled.h1`
  font-family: "YourFontName";
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
  color: rgba(255, 59, 48, 1);
  @media (min-width: 1440px) {
    display: none;
  }
`;
const NoClearance2 = styled.h1`
  display: none;
  @media (min-width: 1440px) {
    display: inline-block;
    font-family: "YourFontName";
    font-size: 11px;
    font-weight: 500;
    line-height: 13px;
    color: rgba(255, 59, 48, 1);
    margin-top: -90px;
    margin-left: 13%;
  }
`;

const Text = styled.h2`
  color: rgba(30, 182, 118, 1);
  font-size: 10px;
  font-family: "YourFontName";
  font-weight: 400;
  line-height: 11.93px;
`;

const Icon = styled.img``;

const AutoImage = styled.img`
  margin-top: 15px;
  border-radius: 16px;
  width: 100%;
  @media (min-width: 1440px) {
    display: none;
  }
`;
const AutoImage2 = styled.img`
  display: none;
  @media (min-width: 1440px) {
    display: inline-block;
    border-radius: 10px;
    width: 182px;
    height: 144px;
    margin-left: 16px;
  }
`;

const FooterDiv = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  width: 100%;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-right: 20%;
`;

const InfoTag = styled.h1`
  font-family: "YourFontName";
  font-size: 12px;
  font-weight: 200;
  line-height: 14px;
  color: rgba(69, 72, 87, 1);
`;

const LocationTag = styled.div`
  display: flex;
  gap: 5px;
`;
