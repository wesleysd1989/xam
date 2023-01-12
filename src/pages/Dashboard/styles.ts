import styled, { keyframes } from "styled-components";
import media from "styled-media-query";
import { shade } from "polished";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: start;
  width: 100%;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  animation: ${appearFromLeft} 1s;

  form {
    margin: 50px 24px 0 0;
    width: 340px;


  ${media.lessThan("large")`
    width: 100%;
    margin: 50px 0;
    `}
  }



  ${media.lessThan("large")`
    flex-direction: column;
    `}
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  ${media.lessThan("large")`
  margin-top: 300px;
    `}

  h1 {
    font-size: 32px;
    color: var(--white);
    margin-right: 32px;
  }
`;

export const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 110px;
  display: flex;
  justify-content: start;
  align-items: flex-start;

  ${media.lessThan("large")`
    margin-top: 0;
    `}
`;

export const ButtonContainer = styled.div`
  width: 280px;
`;

export const FormButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .white {
    background: var(--white);
    margin-right: 8px;
    &:hover {
      background: ${shade(0.2, "#FFF")};
      cursor: pointer;
    }
  }
`;
