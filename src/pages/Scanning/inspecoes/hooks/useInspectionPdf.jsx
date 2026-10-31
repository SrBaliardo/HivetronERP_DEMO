import { toast } from 'react-toastify';

import { usePdfPreview } from '../../../../hooks/usePdfPreview';

export function useInspectionPdf(inspection, items) {
  const action = usePdfPreview();
  return () =>
    action.openPdf(
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
      () => toast.error('Erro ao exportar o romaneio de inspeção.'),
    );
}
