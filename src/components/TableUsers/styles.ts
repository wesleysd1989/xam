import styled from "styled-components";
import media from "styled-media-query";

export const Container = styled.div`
  width: 100%;

  button {
    margin: 0;
    padding: 0;
    height: 24px;
    width: 110px;
  }
  thead {
    ${media.lessThan("large")`
    th:nth-child(3), th:nth-child(4) {
      display: none;
    }
  `}
  }

  tbody {
    ${media.lessThan("large")`
    td:nth-child(3), td:nth-child(4) {
      display: none;
    }
  `}
  }
  
`;
