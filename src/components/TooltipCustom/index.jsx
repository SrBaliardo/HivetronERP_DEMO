import { useTooltipInteraction } from '../../hooks/useTooltipInteraction';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function TooltipCustom({ icon: IconComponent, content, children }) {
  const { id, visible, triggerProps, popoverProps } = useTooltipInteraction();

  return (
    <S.TooltipContainer>
      <div
        aria-label={typeof content === 'string' ? content : 'Informações'}
        className="tooltip-icon"
        {...triggerProps}
      >
        {children ?? <IconComponent />}
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

TooltipCustom.propTypes = {
  icon: validateProp(['function', 'object']),
  children: validateProp(['object', 'string', 'number']),
  content: validateProp(['object', 'string', 'number']),
};
