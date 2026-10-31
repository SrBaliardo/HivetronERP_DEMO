import { useTooltipInteraction } from '../../../../../hooks/useTooltipInteraction';
import * as S from './styles';

export function TooltipTotalWeight() {
  const { id, visible, triggerProps, popoverProps } = useTooltipInteraction({
    keepFocusedOnScroll: true,
  });

  return (
    <S.TooltipContainer>
      <div
        aria-label="Informações sobre o peso total"
        className="tooltip-icon"
        {...triggerProps}
      >
        i
      </div>

      {visible && (
        <S.Popover
          open={visible}
          anchorEl={triggerProps.ref.current}
          placement="top"
          modifiers={[
            {
              name: 'preventOverflow',
              options: { padding: 16, rootBoundary: 'viewport', altAxis: true },
            },
            { name: 'offset', options: { offset: [0, 10] } },
          ]}
          id={id}
          role="tooltip"
          className="popover-content"
          {...popoverProps}
        >
          <div className="pop-info">
            <div className="pop-header">
              <p>Sobre o total:</p>
            </div>
            <div className="pop-content">
              <p>
                Para o cálculo, considerou-se o peso de todos os materiais
                incluídos na ordem, sem qualquer discriminação entre eles.
              </p>
            </div>
          </div>
        </S.Popover>
      )}
    </S.TooltipContainer>
  );
}
