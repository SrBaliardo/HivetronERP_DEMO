import { toast } from 'react-toastify';

import { usePdfPreview } from '../../../../hooks/usePdfPreview';
export function useCutOrderPdf(order, items) {
  const action = usePdfPreview();
  return () =>
    action.openPdf(
      async () => {
        const [{ pdf }, { ExportPDF_CutOrder }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('../components/PdfCutOrder'),
        ]);
        return pdf(
          <ExportPDF_CutOrder order={order} cutItems={items} />,
        ).toBlob();
      },
      () => toast.error('Erro ao exportar a ordem de corte.'),
    );
}
