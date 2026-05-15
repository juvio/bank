export const formatDate = (dateString?: string) => {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('-');

  return `${Number(day)}/${Number(month)}/${year}`;
};
