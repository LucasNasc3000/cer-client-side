export function BrDateFormat(date) {
  const localDateReplace = date.replaceAll("/", "-");
  const year = localDateReplace.slice(0, 4);
  const month = localDateReplace.slice(5, 7);
  const day = localDateReplace.slice(8, 10);

  return `${day}-${month}-${year}`;
}
