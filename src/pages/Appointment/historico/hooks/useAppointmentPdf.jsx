import { toast } from 'react-toastify';

import { useAppointment } from '../../../../contexts/appointment';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { downloadPdf } from '../../../../utils/downloadPdf';
export function useAppointmentPdf(data, filters) {
  const { isDemonstration } = useAppointment();
  const action = useAsyncAction();
  return {
    pending: action.pending,
    exportPdf: () =>
      action.run(
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
        (blob) => {
          downloadPdf(blob);
        },
        () => toast.error('Erro ao exportar o relatório de apontamentos.'),
      ),
  };
}
