import { useState, useEffect, useRef } from 'react';

import { validateProp } from '../../utils/validateProp';

export const TimePickerInput = ({
  onChange,
  initialSeconds = 0,
  disabled = false,
  reset = false,
  ariaLabel = 'Tempo',
}) => {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const [inputValue, setInputValue] = useState('00:00:00');

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (reset) {
      setInputValue('00:00:00');
      onChangeRef.current(0);
    } else {
      setInputValue(formatTime(initialSeconds));
    }
  }, [initialSeconds, reset]);

  const handleChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > 6) value = value.slice(-6);

    value = value.padStart(6, '0');

    const hours = value.slice(0, 2);
    const minutes = value.slice(2, 4);
    const seconds = value.slice(4, 6);

    const formattedValue = `${hours}:${minutes}:${seconds}`;
    setInputValue(formattedValue);

    const totalSeconds =
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10);
    onChange(totalSeconds);
  };

  return (
    <input
      aria-label={ariaLabel}
      type="text"
      value={inputValue}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

TimePickerInput.propTypes = {
  onChange: validateProp('function'),
  initialSeconds: validateProp('number'),
  disabled: validateProp('boolean'),
  reset: validateProp('boolean'),
  ariaLabel: validateProp('string'),
};
