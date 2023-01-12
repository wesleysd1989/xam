import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: var(--contrast);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-65%);
    color: var(--background);

    &::before {
      content: '';
      border-style: solid;
      border-color: var(--contrast) transparent;
      border-width: 0 6px 6px 6px;
      bottom: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(130%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
