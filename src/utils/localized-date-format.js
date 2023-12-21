export default function localizedDateFormat(date, t) {
  date = new Date(Date.parse(date));
  if (!date) {
    return t('date.unknown');
  }

  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes() / 10 < 1 ? `0${date.getMinutes()}` : date.getMinutes();
  const year = date.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "December"];

  return `${day} ${t(`date.${monthNames[month - 1]}`)} ${year} ${t('date.at')} ${hours}:${minutes}`;
}