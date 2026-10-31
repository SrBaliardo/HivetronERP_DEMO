// Reserve synchronously during the click; keep the blob alive while its tab is open.
export function createPdfPreview() {
  const preview = window.open('about:blank', '_blank');
  if (!preview)
    throw new Error(
      'Permita a abertura de uma nova aba para visualizar o PDF.',
    );
  preview.opener = null;
  preview.document.title = 'Hivetron - Preparando PDF';
  preview.document.body.textContent = 'Preparando PDF de demonstração...';
  return {
    close: () => {
      if (!preview.closed) preview.close();
    },
    show: (blob) => {
      if (preview.closed) return;
      const url = URL.createObjectURL(blob);
      try {
        preview.location.replace(url);
      } catch (error) {
        URL.revokeObjectURL(url);
        throw error;
      }
      const timer = setInterval(() => {
        if (preview.closed) {
          clearInterval(timer);
          URL.revokeObjectURL(url);
        }
      }, 1000);
    },
  };
}
