import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { validateProp } from '../../utils/validateProp';
import { SelectListbox } from '../SelectListbox';
import * as S from './styles';

export function CodePicker({
  options,
  value,
  onChange,
  disabled = false,
  label,
  placeholder = 'Digite/Selecione',
  validateSelection,
  loading = false,
  error = false,
  onRetry,
  strict = true,
  clearInvalid = true,
  large = false,
  listboxHeight,
}) {
  const id = useId();
  const container = useRef(null);
  const input = useRef(null);
  const listboxRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(null);
  const [validation, setValidation] = useState('');
  const selected = options.find((option) => option.value === value);
  const display = draft ?? selected?.label ?? value ?? '';
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(String(display).toLowerCase()),
      ),
    [options, display],
  );
  useEffect(() => {
    setDraft(null);
    setValidation('');
  }, [value]);
  useEffect(() => {
    const outside = (event) => {
      if (
        container.current &&
        !container.current.contains(event.target) &&
        !listboxRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, []);
  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setDraft(null);
      setValidation('');
    }
  }, [disabled]);
  const choose = (option) => {
    if (disabled) return;
    if (validateSelection && !validateSelection(option)) return;
    setDraft(null);
    setOpen(false);
    setValidation('');
    onChange(option);
  };
  const blur = (event) => {
    if (
      container.current?.contains(event.relatedTarget) ||
      listboxRef.current?.contains(event.relatedTarget)
    )
      return;
    setOpen(false);
    if (disabled || !strict || loading) return;
    const matching = options.find(
      (option) => option.label === String(display).trim(),
    );
    if (matching) {
      if (matching.value !== value) choose(matching);
    } else if (display) {
      setValidation('Selecione uma opção válida');
      if (clearInvalid) onChange(null);
    }
  };
  return (
    <S.Container ref={container}>
      <S.SelectInput data-input-container data-large={large || undefined}>
        <input
          ref={input}
          aria-label={label}
          role="combobox"
          aria-expanded={open}
          aria-controls={id}
          aria-invalid={Boolean(validation)}
          autoComplete="off"
          value={display}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onBlur={blur}
          onChange={(event) => {
            setDraft(event.target.value);
            setValidation('');
            setOpen(true);
            if (!strict) onChange({ value: event.target.value });
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false);
            if (event.key === 'Enter') {
              event.preventDefault();
              if (open && filtered.length) choose(filtered[0]);
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setOpen(true);
              listboxRef.current?.querySelector('[role="option"]')?.focus();
            }
          }}
        />
        <S.OpenButton
          type="button"
          aria-label={`Abrir opções de ${label}`}
          aria-controls={id}
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            setOpen(true);
            input.current?.focus();
          }}
        >
          {open ? (
            <S.SearchIcon className="icon-purple" />
          ) : (
            <S.ArrowIconDown className="icon-purple" />
          )}
        </S.OpenButton>
      </S.SelectInput>
      {open && (
        <SelectListbox
          ref={listboxRef}
          anchorEl={input.current?.parentElement}
          listboxHeight={listboxHeight}
          id={id}
          role="listbox"
          aria-label={label}
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
          ) : filtered.length ? (
            filtered.map((option) => (
              <S.DropdownItem
                type="button"
                role="option"
                aria-selected={option.value === value}
                key={option.value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(option)}
              >
                {option.label}
                <hr />
              </S.DropdownItem>
            ))
          ) : (
            <S.Placeholder>
              <S.SearchIcon /> Nenhum resultado encontrado
            </S.Placeholder>
          )}
        </SelectListbox>
      )}
      {validation && <S.ErrorMessage>{validation}</S.ErrorMessage>}
    </S.Container>
  );
}
CodePicker.propTypes = {
  options: validateProp('object', true),
  value: validateProp(['string', 'number']),
  onChange: validateProp('function', true),
  disabled: validateProp('boolean'),
  label: validateProp('string', true),
  placeholder: validateProp('string'),
  validateSelection: validateProp('function'),
  loading: validateProp('boolean'),
  error: validateProp('boolean'),
  onRetry: validateProp('function'),
  listboxHeight: validateProp('number'),
  strict: validateProp('boolean'),
  clearInvalid: validateProp('boolean'),
  large: validateProp('boolean'),
};
