import { useTooltipInteraction } from '../../../../../hooks/useTooltipInteraction';
import * as S from './styles';

export function TooltipProfile() {
  const { id, visible, triggerProps, popoverProps } = useTooltipInteraction();

  return (
    <S.TooltipContainer>
      <div
        aria-label="Informações sobre perfil e dimensões"
        className="tooltip-icon"
        {...triggerProps}
      >
        i
      </div>

      {visible && (
        <div
          id={id}
          role="tooltip"
          className="popover-content"
          {...popoverProps}
        >
          <div className="pop-info">
            <div className="pop-header">
              <p>PERFIL</p>
              <p>DIM. &quot;A&quot; MP</p>
              <p>DIM. &quot;B&quot; MP</p>
            </div>
            <div className="pop-content">
              <p>Redondo</p> <p>Diâmetro</p> <p>---</p>
              <p>Retangular</p> <p>Largura</p> <p>Altura</p>
              <p>Chapa</p> <p>Largura</p> <p>Espessura</p>
              <p>Tubular Redondo</p> <p>Diâmetro Externo</p>{' '}
              <p>Diâmetro Interno</p>
            </div>
          </div>
        </div>
      )}
    </S.TooltipContainer>
  );
}
