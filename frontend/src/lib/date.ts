export const formatDate = (dateString?: string | Date | number) => {
  if (!dateString) return '';

  if (typeof dateString === 'string') {
    const isoDateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (isoDateMatch) {
      const [, year, month, day] = isoDateMatch;
      return `${Number(day)}/${Number(month)}/${year}`;
    }
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('pt-BR');
};
