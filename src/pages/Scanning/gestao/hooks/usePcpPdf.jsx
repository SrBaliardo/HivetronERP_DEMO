import { toast } from 'react-toastify';

import { useScanning } from '../../../../contexts/scanning/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { downloadPdf } from '../../../../utils/downloadPdf';
const documents = {
  service: () => import('../components/PdfAllServiceOrders'),
  cut: () => import('../components/PdfAllCutOrders'),
  report: () => import('../components/PdfReport'),
};
const names = {
  service: 'ExportPDF_AllServiceOrders',
  cut: 'ExportPDF_AllCutOrders',
  report: 'ExportPDF_Report',
};
export function usePcpPdf(kind, filtered, records, filters) {
  const { pcpExportRows } = useScanning();
  const action = useAsyncAction();
  return {
    pending: action.pending,
    exportPdf: () =>
      action.run(
        async () => {
          const [{ pdf }, module] = await Promise.all([
            import('@react-pdf/renderer'),
            documents[kind](),
          ]);
          const Document = module[names[kind]];
          return pdf(
            <Document
              data={pcpExportRows(filtered, records)}
              filters={filters}
            />,
          ).toBlob();
        },
        (blob) => {
          downloadPdf(blob);
        },
        () => toast.error('Erro ao exportar o relatório.'),
      ),
  };
}
