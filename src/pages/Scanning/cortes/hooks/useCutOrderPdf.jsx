import { toast } from 'react-toastify';

import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { downloadPdf } from '../../../../utils/downloadPdf';
export function useCutOrderPdf(order, items) {
  const action = useAsyncAction();
  return () =>
    action.run(
      async () => {
        const [{ pdf }, { ExportPDF_CutOrder }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('../components/PdfCutOrder'),
        ]);
        return pdf(
          <ExportPDF_CutOrder order={order} cutItems={items} />,
        ).toBlob();
      },
      (blob) => {
        downloadPdf(blob);
      },
      () => toast.error('Erro ao exportar a ordem de corte.'),
    );
}
