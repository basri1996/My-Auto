import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoaderCircle = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #fd4100;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 2s linear infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderCircle />
    </LoaderContainer>
  );
};

export default Loader;
