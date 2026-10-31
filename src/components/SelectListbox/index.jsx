import { forwardRef, useState } from 'react';

import { useListboxLayout } from '../../hooks/useListboxLayout';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

const popperOptions = { strategy: 'fixed' };
const modifiers = [
  { name: 'flip', enabled: false },
  { name: 'offset', options: { offset: [0, 10] } },
  { name: 'preventOverflow', options: { padding: 8, altAxis: true } },
];

export const SelectListbox = forwardRef(function SelectListbox(
  { anchorEl, listboxHeight, children, ...props },
  ref,
) {
  const [contentEl, setContentEl] = useState(null);
  const layout = useListboxLayout(anchorEl, listboxHeight, contentEl);
  if (!layout) return null;
  return (
    <S.Listbox
      {...props}
      ref={ref}
      open
      anchorEl={anchorEl}
      placement={layout.placement}
      popperOptions={popperOptions}
      modifiers={modifiers}
      $width={layout.width}
      $height={layout.height}
      $font={layout.font}
    >
      <S.Content ref={setContentEl}>{children}</S.Content>
    </S.Listbox>
  );
});

SelectListbox.propTypes = {
  anchorEl: validateProp('object'),
  listboxHeight: validateProp('number'),
  children: validateProp(['object', 'string', 'number']),
};
