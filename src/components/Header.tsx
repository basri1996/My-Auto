import styled from "styled-components";
import logo from "../assets/logo.png";
function Header() {
  return (
    <MainDiv>
      <Logo src={logo} />
    </MainDiv>
  );
}

export default Header;

const MainDiv = styled.div`
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255, 1);
`;

const Logo = styled.img`
  width: 161px;
  height: 46px;
  margin-top: 17px;
  margin-left: 10%;
  @media (min-width: 768px) {
    margin-left: 5%;
  }
`;
