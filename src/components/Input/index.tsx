import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Label, Container, Error, RightIconContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  icon?: React.ComponentType<IconBaseProps>;
  rightIcon?: React.ComponentType<IconBaseProps>;
  disabled?: boolean;
  onRightIconClick?: any;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  icon: Icon,
  rightIcon: RightIcon,
  disabled = false,
  onRightIconClick,
  ...rest
}) => {
  const inputRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField, clearError } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    clearError();
  }, [clearError]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    setIsFilled(!!defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Label>{label}</Label>}
      <Container
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        disabled={disabled}
      >
        {Icon && <Icon size={20} />}
        <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue}
            ref={inputRef}
            {...rest}
            disabled={disabled}
          />
        {RightIcon && (
          <RightIconContainer onClick={onRightIconClick}>
            <RightIcon size={20} />
          </RightIconContainer>
        )}
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default Input;
