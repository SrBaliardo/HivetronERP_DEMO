import { toast } from 'react-toastify';

import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { downloadPdf } from '../../../../utils/downloadPdf';

export function useInspectionPdf(inspection, items) {
  const action = useAsyncAction();
  return () =>
    action.run(
      async () => {
        const [{ pdf }, { ExportPDF_Inspections }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('../components/Pdf'),
        ]);
        return pdf(
          <ExportPDF_Inspections
            inspection={inspection}
            inspectionItems={items}
          />,
        ).toBlob();
      },
      (blob) => {
        downloadPdf(blob);
      },
      () => toast.error('Erro ao exportar o romaneio de inspeção.'),
    );
}
