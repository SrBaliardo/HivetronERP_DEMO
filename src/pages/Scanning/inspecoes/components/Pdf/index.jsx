import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { format, isValid, toDate } from 'date-fns';

import LogoStar from '../../../../../assets/images/logoHivetron.png';
import { CodeBarcode } from '../../../../../components/CodeBarcode';
import { generateBarcodePath } from '../../../../../utils/generateBarcodePath';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

export function ExportPDF_Inspections({ inspection, inspectionItems }) {
  const formId = inspection?.id;
  const barcodePath = generateBarcodePath(formId);
  const stepStage = inspection?.inspectionStage;

  const formatDisplayDate = (dateString) => {
    const date = dateString ? toDate(new Date(dateString)) : new Date();
    return isValid(date)
      ? format(date, 'dd/MM/yyyy')
      : format(new Date(), 'dd/MM/yyyy');
  };

  const translateBudgetStatus = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'APROVADO';
      case 'FAILED':
        return 'REPROVADO';
      case 'PARTIAL':
        return 'PARCIAL';
      default:
        return 'N/A';
    }
  };

  return (
    <Document>
      <Page size="A4" style={S.styles.page}>
        <Text fixed>
          Demonstração — dados fictícios · Nenhuma operação real
        </Text>
        <View style={S.styles.sectionHeader}>
          <Image src={LogoStar} style={S.styles.image} />
          <View style={S.styles.headerIntersection}>
            <Text style={S.styles.titleHeader}>Romaneio de Inspeção</Text>
            <CodeBarcode barcodePath={barcodePath} />
          </View>
        </View>

        {(stepStage === 'INSPECTION' ||
          stepStage === 'RELEASE' ||
          stepStage === 'EXPEDITION' ||
          stepStage === 'COMPLETED') && (
          <>
            <Text style={S.styles.titleSection}>Dados do Romaneio</Text>
            <View style={S.styles.section}>
              <View style={S.styles.intersection1}>
                <Text style={S.styles.label}>
                  NF: <Text style={S.styles.text}>{inspection?.invoice}</Text>
                </Text>
                <Text style={S.styles.label}>
                  Código Conjunto/Item:{' '}
                  <Text style={S.styles.text}>{inspection?.itemCode}</Text>
                </Text>

                {stepStage !== 'INSPECTION' && (
                  <>
                    <Text style={S.styles.label}>
                      Bitola:{' '}
                      <Text style={S.styles.text}>
                        {inspection?.gaugeDescription}
                      </Text>
                    </Text>
                  </>
                )}
              </View>

              <View style={S.styles.intersection2}>
                <Text style={S.styles.label}>
                  Cliente:{' '}
                  <Text style={S.styles.text}>{inspection?.client}</Text>
                </Text>
                <Text style={S.styles.label}>
                  Descrição:{' '}
                  <Text style={S.styles.text}>
                    {inspection?.itemDescription}
                  </Text>
                </Text>

                {stepStage !== 'INSPECTION' && (
                  <>
                    <Text style={S.styles.label}>
                      Modelo:{' '}
                      <Text style={S.styles.text}>{inspection?.itemModel}</Text>
                    </Text>
                    <Text style={S.styles.label}>
                      Fabricante:{' '}
                      <Text style={S.styles.text}>
                        {inspection?.manufacturer || 'N/A'}
                      </Text>
                    </Text>
                  </>
                )}
              </View>

              <View style={S.styles.intersection3}>
                <Text style={S.styles.label}>
                  Item NF:{' '}
                  <Text style={S.styles.text}>{inspection?.invoiceItem}</Text>
                </Text>
                <Text style={S.styles.label}>
                  Desenho:{' '}
                  <Text style={S.styles.text}>
                    {inspection?.itemDrawingNumber}
                  </Text>
                </Text>

                {stepStage !== 'INSPECTION' && (
                  <>
                    <Text style={S.styles.label}>
                      Pasta:{' '}
                      <Text style={S.styles.text}>
                        {inspection?.folder || 'N/A'}
                      </Text>
                    </Text>
                    <Text style={S.styles.label}>
                      Série:{' '}
                      <Text style={S.styles.text}>
                        {inspection?.series || 'N/A'}
                      </Text>
                    </Text>
                  </>
                )}
              </View>
            </View>

            <Text style={S.styles.titleSection}>Inspeção</Text>
            {inspectionItems.map((item, index) => (
              <View key={index} style={S.styles.item}>
                <View style={S.styles.intersectionItem}>
                  <View style={S.styles.intersectionItem1}>
                    <Text style={S.styles.label}>
                      Posição:{' '}
                      <Text style={S.styles.text}>
                        {item.position || 'N/A'}
                      </Text>
                    </Text>

                    {stepStage !== 'INSPECTION' && (
                      <>
                        <Text style={S.styles.label}>
                          Recebido:{' '}
                          <Text style={S.styles.text}>
                            {item.received || 'N/A'}
                          </Text>
                        </Text>
                      </>
                    )}
                  </View>

                  <View style={S.styles.intersectionItem2}>
                    <Text style={S.styles.label}>
                      Desenho:{' '}
                      <Text style={S.styles.text}>
                        {item.itemDrawingNumber || 'N/A'}
                      </Text>
                    </Text>

                    {stepStage !== 'INSPECTION' && (
                      <>
                        <Text style={S.styles.label}>
                          Liberado:{' '}
                          <Text style={S.styles.text}>
                            {item.releasedAmount || 'N/A'}
                          </Text>
                        </Text>
                      </>
                    )}
                  </View>

                  <View style={S.styles.intersectionItem3}>
                    <Text style={S.styles.label}>
                      Código do Item:{' '}
                      <Text style={S.styles.text}>
                        {item.itemCode || 'N/A'}
                      </Text>
                    </Text>

                    {stepStage !== 'INSPECTION' && (
                      <>
                        <Text style={S.styles.label}>
                          Visual:{' '}
                          <Text style={S.styles.text}>
                            {item.visual || 'N/A'}
                          </Text>
                        </Text>
                      </>
                    )}
                  </View>

                  <View style={S.styles.intersectionItem4}>
                    <Text style={S.styles.label}>
                      Descrição:{' '}
                      <Text style={S.styles.text}>
                        {item.itemDescription || 'N/A'}
                      </Text>
                    </Text>

                    {stepStage !== 'INSPECTION' && (
                      <>
                        <Text style={S.styles.label}>
                          Serviço:{' '}
                          <Text style={S.styles.text}>
                            {item.serviceType || 'N/A'}
                          </Text>
                        </Text>
                      </>
                    )}
                  </View>
                </View>

                {stepStage !== 'INSPECTION' && (
                  <>
                    <Text style={S.styles.label}>
                      Observação:{' '}
                      <Text style={S.styles.text}>
                        {item.observation || 'N/A'}
                      </Text>
                    </Text>
                  </>
                )}
              </View>
            ))}

            {stepStage !== 'INSPECTION' && (
              <>
                <View style={S.styles.section}>
                  <View style={S.styles.intersection1}>
                    <Text style={S.styles.label}>
                      Inspecionado por:{' '}
                      <Text style={S.styles.text}>
                        {inspection?.Inspector || 'N/A'}
                      </Text>
                    </Text>
                    <Text style={S.styles.label}>
                      Data:{' '}
                      <Text style={S.styles.text}>
                        {formatDisplayDate(inspection?.inspectionDate)}
                      </Text>
                    </Text>
                  </View>
                </View>
              </>
            )}
          </>
        )}
        {(stepStage === 'RELEASE' ||
          stepStage === 'EXPEDITION' ||
          stepStage === 'COMPLETED') && (
          <>
            {stepStage !== 'RELEASE' && (
              <>
                <Text style={S.styles.titleSection}>Liberação</Text>
                <View style={S.styles.sectionRelease}>
                  <Text style={S.styles.label}>
                    O.S.:{' '}
                    <Text style={S.styles.text}>
                      {inspection?.budgetOrder || 'N/A'}
                    </Text>
                  </Text>
                  <Text style={S.styles.label}>
                    Status:{' '}
                    <Text style={S.styles.text}>
                      {translateBudgetStatus(inspection?.budgetStatus)}
                    </Text>
                  </Text>
                </View>

                {inspection?.budgetStatus !== 'FAILED' && (
                  <>
                    {inspectionItems
                      .filter((item) => item.isReleased)
                      .map((item, index) => (
                        <View key={index} style={S.styles.item}>
                          <View style={S.styles.intersectionItem}>
                            <View style={S.styles.intersectionItem1}>
                              <Text style={S.styles.label}>
                                Posição:{' '}
                                <Text style={S.styles.text}>
                                  {item.position || 'N/A'}
                                </Text>
                              </Text>
                            </View>

                            <View style={S.styles.intersectionItem2}>
                              <Text style={S.styles.label}>
                                Desenho:{' '}
                                <Text style={S.styles.text}>
                                  {item.itemDrawingNumber || 'N/A'}
                                </Text>
                              </Text>
                            </View>

                            <View style={S.styles.intersectionItem3}>
                              <Text style={S.styles.label}>
                                Código do Item:{' '}
                                <Text style={S.styles.text}>
                                  {item.itemCode || 'N/A'}
                                </Text>
                              </Text>
                            </View>

                            <View style={S.styles.intersectionItem4}>
                              <Text style={S.styles.label}>
                                Descrição:{' '}
                                <Text style={S.styles.text}>
                                  {item.itemDescription || 'N/A'}
                                </Text>
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}
                  </>
                )}

                <View style={S.styles.section}>
                  <View style={S.styles.intersection1}>
                    <Text style={S.styles.label}>
                      Observação geral:{' '}
                      <Text style={S.styles.text}>
                        {inspection.releaseObservation || 'N/A'}
                      </Text>
                    </Text>
                    <Text style={S.styles.label}>
                      Liberado por:{' '}
                      <Text style={S.styles.text}>
                        {inspection?.releaseResponsible || 'N/A'}
                      </Text>
                    </Text>
                    <Text style={S.styles.label}>
                      Data:{' '}
                      <Text style={S.styles.text}>
                        {formatDisplayDate(inspection?.releaseDate)}
                      </Text>
                    </Text>
                  </View>
                </View>
              </>
            )}
          </>
        )}
        {inspection?.budgetStatus !== 'FAILED' && (
          <>
            {(stepStage === 'EXPEDITION' || stepStage === 'COMPLETED') && (
              <>
                {stepStage !== 'EXPEDITION' && (
                  <>
                    <Text style={S.styles.titleSection}>Expedição</Text>
                    {inspectionItems
                      .filter((item) => item.isShipped)
                      .map((item, index) => (
                        <View key={index} style={S.styles.item}>
                          <View style={S.styles.intersectionItem}>
                            <View style={S.styles.intersectionItem1}>
                              <Text style={S.styles.label}>
                                Posição:{' '}
                                <Text style={S.styles.text}>
                                  {item.position || 'N/A'}
                                </Text>
                              </Text>
                              <Text style={S.styles.label}>
                                Total expedido:{' '}
                                <Text style={S.styles.text}>
                                  {item.shippedAmount} / {item.releasedAmount}
                                </Text>
                              </Text>
                            </View>

                            <View style={S.styles.intersectionItem2}>
                              <Text style={S.styles.label}>
                                Desenho:{' '}
                                <Text style={S.styles.text}>
                                  {item.itemDrawingNumber || 'N/A'}
                                </Text>
                              </Text>
                            </View>

                            <View style={S.styles.intersectionItem3}>
                              <Text style={S.styles.label}>
                                Código do Item:{' '}
                                <Text style={S.styles.text}>
                                  {item.itemCode || 'N/A'}
                                </Text>
                              </Text>
                            </View>

                            <View style={S.styles.intersectionItem4}>
                              <Text style={S.styles.label}>
                                Descrição:{' '}
                                <Text style={S.styles.text}>
                                  {item.itemDescription || 'N/A'}
                                </Text>
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}

                    <View style={S.styles.section}>
                      <View style={S.styles.intersection1}>
                        <Text style={S.styles.label}>
                          Observação geral:{' '}
                          <Text style={S.styles.text}>
                            {inspection.shipmentObservation || 'N/A'}
                          </Text>
                        </Text>
                        <Text style={S.styles.label}>
                          Expedido por:{' '}
                          <Text style={S.styles.text}>
                            {inspection?.shippedBy || 'N/A'}
                          </Text>
                        </Text>
                        <Text style={S.styles.label}>
                          Data:{' '}
                          <Text style={S.styles.text}>
                            {formatDisplayDate(inspection?.shipmentDate)}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* <Text style={S.styles.footer}>Documento gerado automaticamente</Text> */}
      </Page>
    </Document>
  );
}

ExportPDF_Inspections.propTypes = {
  inspection: validateProp('object'),
  inspectionItems: validateProp('object'),
};
