import styled from "styled-components";
import icon from "../assets/done-path.png";
import langrover from "../assets/Screenshot 2021-10-25 at 6.15 1.png";
import flag from "../assets/flag - geo.png";
function Card() {
  return (
    <MainDiv>
      <HeaderDiv>
        <Title>LAND ROVER Range Rover Evoque</Title>
        <Year>2020 წ</Year>
      </HeaderDiv>
      <AfterHeader>
        <PriceDiv>
          <Price>108,122</Price>
          <Gel>₾</Gel>
        </PriceDiv>
        <Clearance>
          <Icon src={icon} />
          <Text>განბაჟებული</Text>
        </Clearance>
      </AfterHeader>
      <AutoImage src={langrover} />
      <FooterDiv>
        <LeftColumn>
          <InfoTag>173 000 კმ</InfoTag>
          <InfoTag>3.0 ბენზინი</InfoTag>
          <InfoTag>ავტომატიკა</InfoTag>
        </LeftColumn>
        <RightColumn>
          <InfoTag>სედანი</InfoTag>
          <InfoTag>საჭე მარცხნივ</InfoTag>
          <LocationTag>
            <Icon src={flag} />
            <InfoTag>თბილისი</InfoTag>
          </LocationTag>
        </RightColumn>
      </FooterDiv>
    </MainDiv>
  );
}

export default Card;

const MainDiv = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  margin-top: 16px;
  padding: 15px 10%;
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
const Price = styled.h1`
  font-family: "YourFontName";
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`;
const Gel = styled.div`
  background-color: rgba(242, 242, 246, 1);
  color: rgba(39, 42, 55, 1);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "YourFontName";
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