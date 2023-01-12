import React, { memo } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import * as S from './styles';

const Loader: React.FC = () => {
  return (
    <S.LoaderWrapper>
      <Spinner animation="border" role="status" variant="light"/>
    </S.LoaderWrapper>
  );
};

export default memo(Loader);
