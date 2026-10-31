import { forwardRef, useEffect, useId, useRef, useState } from 'react';

import { validateProp } from '../../utils/validateProp';
import { SelectListbox } from '../SelectListbox';
import * as S from './styles';

export const InputSelect = forwardRef(function InputSelect(
  {
    selectOptions,
    value,
    onChange,
    placeholder,
    name,
    disabled = false,
    ariaLabel,
    loading = false,
    error = false,
    onRetry,
    listboxHeight,
  },
  ref,
) {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  const listboxRef = useRef(null);
  const id = useId();
  const selectOption = (option) => {
    if (disabled) return;
    onChange({ target: { name, value: option.value } });
    setIsVisible(false);
  };
  useEffect(() => {
    const outside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !listboxRef.current?.contains(event.target)
      )
        setIsVisible(false);
    };
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, []);
  useEffect(() => {
    if (disabled) {
      setIsVisible(false);
      const select = dropdownRef.current?.querySelector('[role="combobox"]');
      if (select === select?.ownerDocument.activeElement) select.blur();
    }
  }, [disabled]);
  return (
    <S.Container ref={dropdownRef}>
      <S.SelectInput
        data-input-container
        ref={ref}
        role="combobox"
        tabIndex={disabled ? undefined : 0}
        aria-label={ariaLabel || placeholder || name || 'Selecionar opção'}
        aria-disabled={disabled}
        aria-expanded={isVisible}
        aria-controls={id}
        onClick={() => {
          if (!disabled) setIsVisible((v) => !v);
        }}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === 'Escape') setIsVisible(false);
          if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            setIsVisible(true);
          }
        }}
      >
        {value
          ? selectOptions.find((option) => option.value === value)?.label
          : placeholder}
        {isVisible ? (
          <S.ArrowIconUp className="icon-purple" />
        ) : (
          <S.ArrowIconDown className="icon-purple" />
        )}
      </S.SelectInput>
      {isVisible && (
        <SelectListbox
          ref={listboxRef}
          anchorEl={dropdownRef.current?.querySelector('[role="combobox"]')}
          listboxHeight={listboxHeight}
          id={id}
          role="listbox"
          aria-label={ariaLabel || placeholder}
        >
          {loading ? (
            <S.Placeholder role="status" className="loading-message">
              Carregando...
            </S.Placeholder>
          ) : error ? (
            <S.Placeholder role="alert">
              Erro ao buscar opções.{' '}
              <button type="button" onClick={onRetry}>
                Tentar novamente
              </button>
            </S.Placeholder>
          ) : selectOptions.length ? (
            selectOptions.map((option) => (
              <S.DropdownItem
                as="button"
                type="button"
                role="option"
                aria-selected={option.value === value}
                key={option.value}
                onClick={() => selectOption(option)}
              >
                {option.label}
                <hr />
              </S.DropdownItem>
            ))
          ) : (
            <S.Placeholder>Nenhum resultado encontrado</S.Placeholder>
          )}
        </SelectListbox>
      )}
    </S.Container>
  );
});
InputSelect.propTypes = {
  selectOptions: validateProp('object', true),
  value: validateProp(['string', 'number']),
  onChange: validateProp('function', true),
  placeholder: validateProp('string'),
  name: validateProp('string'),
  disabled: validateProp('boolean'),
  ariaLabel: validateProp('string'),
  loading: validateProp('boolean'),
  error: validateProp('boolean'),
  onRetry: validateProp('function'),
  listboxHeight: validateProp('number'),
};
