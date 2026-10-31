import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { format, isValid, toDate } from 'date-fns';
import { Fragment } from 'react';

import LogoStar from '../../../../../assets/images/logoHivetron.png';
import { formatCodeWithSuffix } from '../../../../../utils/formatCodeWithSuffix';
import { validateProp } from '../../../../../utils/validateProp';
import { displayStatus } from '../../../status';
import * as S from './styles';

export function ExportPDF_Appointments({
  data,
  filters,
  demonstration = false,
}) {
  const formatDisplayDate = (dateString) => {
    const date = dateString ? toDate(new Date(dateString)) : new Date();
    return isValid(date)
      ? format(date, 'dd/MM/yyyy')
      : format(new Date(), 'dd/MM/yyyy');
  };

  return (
    <Document>
      <Page size="A4" style={S.styles.page}>
        <Text fixed>
          Demonstração — dados fictícios · Nenhuma operação real
        </Text>
        <View style={S.styles.sectionHeader}>
          <Image src={LogoStar} style={S.styles.image} />
          <Text style={S.styles.titleHeader}>Relatório de Apontamentos</Text>
        </View>

        <View style={S.styles.sectionHeader}>
          <Text style={S.styles.titleSection}>
            {demonstration ? 'Degustação — dados fictícios. ' : ''}
            Lista filtrada por: {filters}
          </Text>
        </View>

        {data?.map((item, index) => (
          <Fragment key={item.id || index}>
            <View key={index} style={S.styles.blockSection}>
              <View style={S.styles.section}>
                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Status:{' '}
                    <Text style={S.styles.text}>
                      {displayStatus(item.newStatus, true)}
                    </Text>
                  </Text>
                </View>

                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Número da O.S.:{' '}
                    <Text style={S.styles.text}>
                      {formatCodeWithSuffix(item.serviceOrderCode, item.branch)}
                    </Text>
                  </Text>
                </View>

                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}> </Text>
                </View>
              </View>

              <View style={S.styles.section}>
                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Usuário:{' '}
                    <Text style={S.styles.text}>{item.responsible}</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Data:{' '}
                    <Text style={S.styles.text}>
                      {formatDisplayDate(item.createdAt)}
                    </Text>
                  </Text>
                </View>

                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}> </Text>
                </View>
              </View>

              <View style={S.styles.section}>
                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Item/Conjunto:{' '}
                    <Text style={S.styles.text}>{item.itemCode}</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Processo:{' '}
                    <Text style={S.styles.text}>{item.operation}</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection2}>
                  <Text style={S.styles.label}>
                    Máquina: <Text style={S.styles.text}>{item.machine}</Text>
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

ExportPDF_Appointments.propTypes = {
  demonstration: validateProp('boolean'),
  data: validateProp('object'),
  filters: validateProp('string'),
};
