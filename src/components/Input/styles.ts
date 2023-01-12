import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  disabled: boolean;
}

export const Label = styled.span`
  margin: 4px;
`;

export const Container = styled.div<ContainerProps>`
  background: var(--background);
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 4px;
  border: 2px solid var(--background);
  color: var(--grey);

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid var(--red);
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid var(--contrast);
      color: var(--contrast);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--contrast);
    `}

  ${props =>
    props.disabled &&
    css`
      border: 2px solid var(--grey);
      color: var(--grey);
    `}

  input {
    color: var(--white);
    background: transparent;
    flex: 1;
    border: 0;
    &::placeholder {
      color: var(--grey);
    }
    &:focus {
      outline: none;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: var(--red);
    color: var(--white);

    &::before {
      border-color: var(--red) transparent;
    }
  }
`;

export const RightIconContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
