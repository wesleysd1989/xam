import React, { ButtonHTMLAttributes, memo } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" disabled={loading} {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
};

export default memo(Button);
