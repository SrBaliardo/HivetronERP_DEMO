import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { format, isValid, toDate } from 'date-fns';
import { Fragment } from 'react';

import LogoHeader from '../../../../../assets/images/logoHeaderHivetron.png';
import { CodeBarcode } from '../../../../../components/CodeBarcode';
import { formatCodeWithSuffix } from '../../../../../utils/formatCodeWithSuffix';
import { generateBarcodePath } from '../../../../../utils/generateBarcodePath';
import { validateProp } from '../../../../../utils/validateProp';
import { displayStatus } from '../../status';
import * as S from './styles';

export function ExportPDF_AllServiceOrders({ data, filters }) {
  const barcodePath = generateBarcodePath('DEMO-LISTA-OS');

  const formatDisplayDate = (dateString) => {
    const date = dateString ? toDate(new Date(dateString)) : new Date();
    return isValid(date)
      ? format(date, 'dd/MM/yyyy')
      : format(new Date(), 'dd/MM/yyyy');
  };

  return (
    <Document>
      <Page size="A4" style={S.styles.page}>
        <Text fixed style={S.styles.demonstrationNotice}>
          Demonstração — dados fictícios · Nenhuma operação real
        </Text>
        <View style={S.styles.sectionHeader}>
          <Image src={LogoHeader} style={S.styles.image} />
          <View style={S.styles.headerIntersection}>
            <Text style={S.styles.titleHeader}>Ordens de Serviço</Text>
            <CodeBarcode barcodePath={barcodePath} />
          </View>
        </View>

        <View style={S.styles.sectionHeader}>
          <Text style={S.styles.titleSection}>
            Lista filtrada por: {filters}
          </Text>
        </View>

        {data?.map((item, index) => (
          <Fragment key={item.id || index}>
            <View key={index} style={S.styles.blockSection}>
              <View style={S.styles.section}>
                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Status:{' '}
                    <Text style={S.styles.text}>
                      {displayStatus(item.status)}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={S.styles.section}>
                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Prazo de Entrega:{' '}
                    <Text style={S.styles.text}>
                      {formatDisplayDate(item.deadline)}
                    </Text>
                  </Text>
                </View>

                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Código do Cliente:{' '}
                    <Text style={S.styles.text}>{item.clientCode}</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    <Text style={S.styles.text}></Text>
                  </Text>
                </View>
              </View>

              <View style={S.styles.section}>
                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Número da O.S.:{' '}
                    <Text style={S.styles.text}>
                      {formatCodeWithSuffix(item.code, item.branch)}
                    </Text>
                  </Text>
                </View>

                <View key={index} style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Cliente: <Text style={S.styles.text}>{item.client}</Text>
                  </Text>
                </View>

                <View key={index} style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Item/Conjunto:{' '}
                    <Text style={S.styles.text}>{item.item}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </Fragment>
        ))}
      </Page>
    </Document>
  );
}

ExportPDF_AllServiceOrders.propTypes = {
  data: validateProp('object'),
  filters: validateProp('string'),
};
