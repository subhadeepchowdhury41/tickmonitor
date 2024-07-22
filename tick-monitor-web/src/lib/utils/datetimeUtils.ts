export const getDateTime = (date: string, time?: string) => {
  if (date && time) {
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );
  }
  return null;
};
