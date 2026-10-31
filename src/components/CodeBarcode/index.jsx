import { Image } from '@react-pdf/renderer';

import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function CodeBarcode({ barcodePath }) {
  if (!barcodePath) return null;

  return <Image src={barcodePath} style={S.styles.barcode} />;
}

CodeBarcode.propTypes = { barcodePath: validateProp('string') };
