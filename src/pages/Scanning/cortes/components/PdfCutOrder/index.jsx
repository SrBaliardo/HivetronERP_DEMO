import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { format, isValid, toDate } from 'date-fns';
import { Fragment } from 'react';

import LogoHeader from '../../../../../assets/images/logoHeaderHivetron.png';
import { CodeBarcode } from '../../../../../components/CodeBarcode';
import { generateBarcodePath } from '../../../../../utils/generateBarcodePath';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

export function ExportPDF_CutOrder({ order, cutItems }) {
  const barcodePath = generateBarcodePath('DEMO-OC-2001');

  const formatDisplayDate = (dateString) => {
    const date = dateString ? toDate(new Date(dateString)) : new Date();
    return isValid(date)
      ? format(date, 'dd/MM/yyyy')
      : format(new Date(), 'dd/MM/yyyy');
  };

  const translateRawMaterialProfile = (status) => {
    switch (status) {
      case 'ROUND':
        return 'REDONDO';
      case 'RECTANGULAR':
        return 'RETANGULAR';
      case 'SHEET':
        return 'CHAPA';
      case 'ROUNDTUBE':
        return 'TUBULAR REDONDO';
      default:
        return 'N/A';
    }
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
            <Text style={S.styles.titleHeader}>Ordem de Corte</Text>
            <CodeBarcode barcodePath={barcodePath} />
          </View>
        </View>

        <Text style={S.styles.titleSection}>
          O.C.: <Text style={S.styles.titleSection}>{order.cutOrderCode}</Text>
        </Text>

        <View style={S.styles.blockSection}>
          <View style={S.styles.section}>
            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Cliente: <Text style={S.styles.text}>{order.client}</Text>
              </Text>
            </View>

            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Código do Cliente:{' '}
                <Text style={S.styles.text}>{order.clientCode}</Text>
              </Text>
            </View>

            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Observação:{' '}
                <Text style={S.styles.text}>{order.observation}</Text>
              </Text>
            </View>
          </View>

          <View style={S.styles.section}>
            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Produto: <Text style={S.styles.text}>{order.itemCode}</Text>
              </Text>
            </View>

            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Desenho:{' '}
                <Text style={S.styles.text}>{order.itemDrawingNumber}</Text>
              </Text>
            </View>

            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Descrição:{' '}
                <Text style={S.styles.text}>{order.itemDescription}</Text>
              </Text>
            </View>
          </View>

          <View style={S.styles.intersection}>
            <Text style={S.styles.label}>
              Peso Total de Material:{' '}
              <Text style={S.styles.text}>
                {Number.isFinite(order.totalMaterialsWeight)
                  ? order.totalMaterialsWeight.toFixed(2)
                  : ''}{' '}
                kg
              </Text>
            </Text>
          </View>

          <Text style={S.styles.hint}>
            * Para o cálculo do &quot;Peso Total de Material&quot;,
            considerou-se o peso de todos os materiais incluídos na ordem, sem
            qualquer discriminação entre eles.
          </Text>
        </View>

        <Text style={S.styles.titleSection}>Itens:</Text>

        {cutItems?.map((block, blockIndex) => (
          <Fragment key={block.id || blockIndex}>
            <View key={blockIndex} style={S.styles.blockSection}>
              <View style={S.styles.section}>
                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Certificado:{' '}
                    <Text style={S.styles.text}>{block.certificate}</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Prazo Entrada MP:{' '}
                    <Text style={S.styles.text}>
                      {formatDisplayDate(block.inputDeadline)}
                    </Text>
                  </Text>
                </View>

                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Peso Total:{' '}
                    <Text style={S.styles.text}>
                      {Number.isFinite(block?.blockWeight)
                        ? block.blockWeight.toFixed(2)
                        : ''}{' '}
                      kg
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={S.styles.section}>
                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Código MP:{' '}
                    <Text style={S.styles.text}>{block.rawMaterialCode}</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Norma: <Text style={S.styles.text}>{block.standard}</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Dimensão A:{' '}
                    <Text style={S.styles.text}>{block.dimensionA} mm</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Dimensão B:{' '}
                    <Text style={S.styles.text}>{block.dimensionB} mm</Text>
                  </Text>
                </View>

                <View style={S.styles.intersection}>
                  <Text style={S.styles.label}>
                    Perfil:{' '}
                    <Text style={S.styles.text}>
                      {translateRawMaterialProfile(block.rawMaterialProfile)}
                    </Text>
                  </Text>
                </View>
              </View>

              {block?.cutItems?.map((item, itemIndex) => (
                <Fragment key={item.id || itemIndex}>
                  <View
                    key={itemIndex}
                    style={[
                      S.styles.itemIntersection,
                      itemIndex % 2 === 0 ? S.styles.even : S.styles.odd,
                    ]}
                  >
                    <View style={S.styles.section}>
                      <View style={S.styles.intersection}>
                        <Text style={S.styles.label}>
                          Código do Item:{' '}
                          <Text style={S.styles.text}>{item.code}</Text>
                        </Text>
                      </View>

                      <View style={S.styles.intersection}>
                        <Text style={S.styles.label}>
                          Descrição:{' '}
                          <Text style={S.styles.text}>{item.description}</Text>
                        </Text>
                      </View>

                      <View style={S.styles.intersection}>
                        <Text style={S.styles.label}>
                          Comprimento (mm):{' '}
                          <Text style={S.styles.text}>
                            {item.rawMaterialLength}
                          </Text>
                        </Text>
                      </View>
                    </View>

                    <View style={S.styles.section}>
                      <View style={S.styles.intersection}>
                        <Text style={S.styles.label}>
                          Quantidade:{' '}
                          <Text style={S.styles.text}>{item.amount}</Text>
                        </Text>
                      </View>

                      <View style={S.styles.intersection}>
                        <Text style={S.styles.label}>
                          Item:{' '}
                          <Text style={S.styles.text}>
                            {item.isStock ? 'em Estoque' : 'Comprado'}
                          </Text>
                        </Text>
                      </View>

                      <View style={S.styles.intersection}>
                        <Text style={S.styles.label}>
                          Peso (kg):{' '}
                          <Text style={S.styles.text}>{item.totalWeight}</Text>
                        </Text>
                      </View>
                    </View>

                    <Text style={S.styles.label}>
                      Observação:{' '}
                      <Text style={S.styles.text}>{item.observation}</Text>
                    </Text>
                  </View>
                </Fragment>
              ))}
            </View>
          </Fragment>
        ))}
      </Page>
    </Document>
  );
}

ExportPDF_CutOrder.propTypes = {
  order: validateProp('object'),
  cutItems: validateProp('object'),
};
