export const formatDate = (dateString?: string) => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  return date.toLocaleDateString("pt-BR");
};
