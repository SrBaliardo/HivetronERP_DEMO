import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { format, isValid, toDate } from 'date-fns';
import { Fragment } from 'react';

import LogoHeader from '../../../../../assets/images/logoHeaderHivetron.png';
import { CodeBarcode } from '../../../../../components/CodeBarcode';
import { convertSecondsToTime } from '../../../../../utils/formatTimeInput';
import { generateBarcodePath } from '../../../../../utils/generateBarcodePath';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

export function ExportPDF_ServiceOrder({ order, orderSequences }) {
  const barcodePath = generateBarcodePath('DEMO-OS-1001');

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
            <Text style={S.styles.titleHeader}>Ordem de Serviço</Text>
            <CodeBarcode barcodePath={barcodePath} />
          </View>
        </View>

        <Text style={S.styles.titleSection}>
          O.S.:{' '}
          <Text style={S.styles.titleSection}>
            {order.code} - {order.branch}
          </Text>
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
                Produto: <Text style={S.styles.text}>{order.item}</Text>
              </Text>
            </View>

            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Desenho:{' '}
                <Text style={S.styles.text}>{order.drawingNumber}</Text>
              </Text>
            </View>

            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Descrição:{' '}
                <Text style={S.styles.text}>{order.description}</Text>
              </Text>
            </View>
          </View>

          <View style={S.styles.section}>
            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                MP: <Text style={S.styles.text}>{order.rawMaterial}</Text>
              </Text>
            </View>

            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Quantidade: <Text style={S.styles.text}>{order.amount}</Text>
              </Text>
            </View>

            <View style={S.styles.intersection}>
              <Text style={S.styles.label}>
                Prazo de Entrega:{' '}
                <Text style={S.styles.text}>
                  {formatDisplayDate(order.deadline)}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <Text style={S.styles.titleSection}>SEQUÊNCIAS:</Text>

        {orderSequences?.map((item, index) => (
          <Fragment key={item.id || index}>
            {item.status !== 'CANCELED' && (
              <Fragment>
                <View key={index} style={S.styles.blockSection}>
                  <View style={S.styles.section}>
                    <View style={S.styles.intersection}>
                      <Text style={S.styles.label}>
                        Sequência:{' '}
                        <Text style={S.styles.text}>{item.sequence}</Text>
                      </Text>
                    </View>

                    <View style={S.styles.intersection}>
                      <Text style={S.styles.label}>
                        Tempo Estimado:{' '}
                        <Text style={S.styles.text}>
                          {convertSecondsToTime(item.totalTime)}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View style={S.styles.section}>
                    <View style={S.styles.intersection}>
                      <Text style={S.styles.label}>
                        Operação:{' '}
                        <Text style={S.styles.text}>
                          {item.operationDescription}
                        </Text>
                      </Text>
                    </View>

                    <View style={S.styles.intersection}>
                      <Text style={S.styles.label}>
                        Máquina:{' '}
                        <Text style={S.styles.text}>
                          {item.machineDescription}
                        </Text>
                      </Text>
                    </View>
                  </View>

                  <View style={S.styles.section}>
                    <View style={S.styles.intersection}>
                      <Text style={S.styles.label}>
                        Tipo:{' '}
                        <Text style={S.styles.text}>{item.operationType}</Text>
                      </Text>
                      <Text style={S.styles.label}>
                        Modalidade:{' '}
                        <Text style={S.styles.text}>
                          {item.collectiveTime === true
                            ? 'Coletivo'
                            : 'Individual'}
                        </Text>
                      </Text>
                    </View>

                    <View style={S.styles.intersection}>
                      <Text style={S.styles.label}>
                        Grupo:{' '}
                        <Text style={S.styles.text}>{item.machineGroup}</Text>
                      </Text>
                    </View>
                  </View>

                  {item.tools && item.tools.length > 0 && (
                    <Fragment>
                      <Text style={S.styles.subtitle}>Ferramentas:</Text>
                      {item.tools.map((tool, tIdx) => (
                        <View
                          key={tool.id || tIdx}
                          style={S.styles.blockSection2}
                        >
                          <View style={S.styles.section}>
                            <View style={S.styles.intersection}>
                              <Text style={S.styles.label}>
                                Código:{' '}
                                <Text style={S.styles.text}>
                                  {tool.toolCode}
                                </Text>
                              </Text>
                            </View>
                            <View style={S.styles.intersection}>
                              <Text style={S.styles.label}>
                                Descrição:{' '}
                                <Text style={S.styles.text}>
                                  {tool.toolDescription}
                                </Text>
                              </Text>
                            </View>
                            <View style={S.styles.intersection}>
                              <Text style={S.styles.label}>
                                Insumo:{' '}
                                <Text style={S.styles.text}>
                                  {tool.inputCode}
                                </Text>
                              </Text>
                            </View>

                            <View style={S.styles.intersectionInner}>
                              <View style={S.styles.intersection}>
                                <Text style={S.styles.label}>
                                  VC:{' '}
                                  <Text style={S.styles.text}>
                                    {tool.cuttingSpeed}
                                  </Text>
                                </Text>
                              </View>
                              <View style={S.styles.intersection}>
                                <Text style={S.styles.label}>
                                  AV:{' '}
                                  <Text style={S.styles.text}>
                                    {tool.toolFeed}
                                  </Text>
                                </Text>
                              </View>
                              <View style={S.styles.intersection}>
                                <Text style={S.styles.label}>
                                  AP:{' '}
                                  <Text style={S.styles.text}>{tool.ap}</Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}
                    </Fragment>
                  )}

                  <View style={S.styles.section}>
                    <View style={S.styles.intersection}>
                      <Text style={S.styles.label}>
                        Observação:{' '}
                        <Text style={S.styles.text}>{item.observation}</Text>
                      </Text>
                    </View>

                    <View style={S.styles.intersection}>
                      <Text style={S.styles.label}>
                        Prazo Planejado:{' '}
                        <Text style={S.styles.text}>
                          {formatDisplayDate(item.plannedDeadline)}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </Fragment>
            )}
          </Fragment>
        ))}
      </Page>
    </Document>
  );
}

ExportPDF_ServiceOrder.propTypes = {
  order: validateProp('object'),
  orderSequences: validateProp('object'),
};
