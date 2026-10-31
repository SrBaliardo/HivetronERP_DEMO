import { toast } from 'react-toastify';

import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { downloadPdf } from '../../../../utils/downloadPdf';

export function useOrderPdf(order, items) {
  const action = useAsyncAction();
  return () =>
    action.run(
      async () => {
        const [{ pdf }, { ExportPDF_ServiceOrder }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('../components/PdfServiceOrder'),
        ]);
        return pdf(
          <ExportPDF_ServiceOrder order={order} orderSequences={items} />,
        ).toBlob();
      },
      (blob) => {
        downloadPdf(blob);
      },
      () => toast.error('Erro ao exportar o ordem de serviço.'),
    );
}
