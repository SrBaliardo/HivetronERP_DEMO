import { useTooltipInteraction } from '../../hooks/useTooltipInteraction';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function TooltipCustom2({ icon, content, style }) {
  const { id, visible, triggerProps, popoverProps } = useTooltipInteraction();

  return (
    <S.TooltipContainer>
      <div
        style={style}
        aria-label={typeof content === 'string' ? content : 'Informações'}
        className="tooltip-icon"
        {...triggerProps}
      >
        {icon}
      </div>

      {visible && (
        <div
          id={id}
          role="tooltip"
          className="popover-content"
          {...popoverProps}
        >
          {content}
        </div>
      )}
    </S.TooltipContainer>
  );
}

TooltipCustom2.propTypes = {
  icon: validateProp(['object', 'string', 'number']),
  content: validateProp(['object', 'string', 'number']),
  style: validateProp('object'),
};
