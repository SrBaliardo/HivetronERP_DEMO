import { toast } from 'react-toastify';

import { usePdfPreview } from '../../../../hooks/usePdfPreview';

export function useOrderPdf(order, items) {
  const action = usePdfPreview();
  return () =>
    action.openPdf(
      async () => {
        const [{ pdf }, { ExportPDF_ServiceOrder }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('../components/PdfServiceOrder'),
        ]);
        return pdf(
          <ExportPDF_ServiceOrder order={order} orderSequences={items} />,
        ).toBlob();
      },
      () => toast.error('Erro ao exportar o ordem de serviço.'),
    );
}
