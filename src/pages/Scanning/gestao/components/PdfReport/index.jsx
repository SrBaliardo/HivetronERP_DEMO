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

export function ExportPDF_Report({ data, filters }) {
  const barcodePath = generateBarcodePath('DEMO-PCP-001');

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
            <Text style={S.styles.titleHeader}>
              Relatório de Ordens de Serviço
            </Text>
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
                <Text style={S.styles.label}>
                  Status:{' '}
                  <Text style={S.styles.text}>
                    {displayStatus(item.sequenceStatus)}
                  </Text>
                </Text>
              </View>

              <View style={S.styles.section}>
                <View style={S.styles.intersection1}>
                  <Text style={S.styles.label}>
                    Número da O.S.:{' '}
                    <Text style={S.styles.text}>
                      {formatCodeWithSuffix(item.serviceOrderCode, item.branch)}
                    </Text>
                  </Text>
                </View>

                <View style={S.styles.intersection1}>
                  <Text style={S.styles.label}>
                    Código do Cliente:{' '}
                    <Text style={S.styles.text}>{item.clientCode}</Text>
                  </Text>
                </View>
              </View>

              <View style={S.styles.section}>
                <View key={index} style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Cliente: <Text style={S.styles.text}>{item.client}</Text>
                  </Text>
                </View>

                <View key={index} style={S.styles.intersection3}>
                  <Text style={S.styles.label}>
                    Item/Conjunto:{' '}
                    <Text style={S.styles.text}>{item.itemCode}</Text>
                  </Text>
                </View>
              </View>

              <View style={S.styles.section}>
                <View style={S.styles.intersection1}>
                  <Text style={S.styles.label}>
                    Processo:{' '}
                    <Text style={S.styles.text}>{item.operation}</Text>
                  </Text>

                  <Text style={S.styles.label}>
                    Tipo de Processo:{' '}
                    <Text style={S.styles.text}>{item.operationType}</Text>
                  </Text>
                </View>

                <View key={index} style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Máquina: <Text style={S.styles.text}>{item.machine}</Text>
                  </Text>

                  <Text style={S.styles.label}>
                    Grupo:{' '}
                    <Text style={S.styles.text}>{item.machineGroup}</Text>
                  </Text>
                </View>
              </View>

              <View style={S.styles.section}>
                <View style={S.styles.intersection1}>
                  <Text style={S.styles.label}>
                    Planejamento:{' '}
                    <Text style={S.styles.text}>
                      {formatDisplayDate(item.plannedDeadline)}
                    </Text>
                  </Text>
                </View>

                <View key={index} style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Conclusão:{' '}
                    <Text style={S.styles.text}>
                      {formatDisplayDate(item.completionDeadline)}
                    </Text>
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

ExportPDF_Report.propTypes = {
  data: validateProp('object'),
  filters: validateProp('string'),
};
