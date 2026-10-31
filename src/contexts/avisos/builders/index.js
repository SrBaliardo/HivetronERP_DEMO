import { format } from 'date-fns';

export function buildNoticePayload(values, notice, date = new Date()) {
  if (notice)
    return {
      id: notice.id,
      title: values.title,
      description: values.description,
    };
  return { ...values, createdAt: format(date, 'dd/MM/yyyy') };
}

export function buildNoticeList(response) {
  if (
    !Array.isArray(response?.content) ||
    response.content.some(
      (item) => !item || typeof item !== 'object' || Array.isArray(item),
    )
  )
    throw new Error('Resposta inválida ao buscar avisos.');
  return response.content;
}

export function buildNoticeForm(notice) {
  return { title: notice?.title || '', description: notice?.description || '' };
}
