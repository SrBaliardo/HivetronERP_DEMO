import { toast } from 'react-toastify';

import { useAppointment } from '../../../../contexts/appointment';
import { usePdfPreview } from '../../../../hooks/usePdfPreview';
export function useAppointmentPdf(data, filters) {
  const { isDemonstration } = useAppointment();
  const action = usePdfPreview();
  return {
    pending: action.pending,
    exportPdf: () =>
      action.openPdf(
        async () => {
          const [{ pdf }, { ExportPDF_Appointments }] = await Promise.all([
            import('@react-pdf/renderer'),
            import('../components/Pdf'),
          ]);
          return pdf(
            <ExportPDF_Appointments
              data={data}
              filters={filters}
              demonstration={isDemonstration}
            />,
          ).toBlob();
        },
        () => toast.error('Erro ao exportar o relatório de apontamentos.'),
      ),
  };
}
