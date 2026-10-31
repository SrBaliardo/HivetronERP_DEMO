import { createPdfPreview } from '../utils/pdfPreview';
import { useAsyncAction } from './useAsyncAction';

// Shared React coordination for document previews; independent of any domain.
export function usePdfPreview() {
  const action = useAsyncAction();
  return {
    pending: action.pending,
    openPdf: (buildPdf, onError) =>
      action.run(
        async (signal) => {
          const preview = createPdfPreview();
          try {
            const blob = await buildPdf();
            if (signal.aborted) preview.close();
            else preview.show(blob);
          } catch (error) {
            preview.close();
            throw error;
          }
        },
        undefined,
        onError,
      ),
  };
}
