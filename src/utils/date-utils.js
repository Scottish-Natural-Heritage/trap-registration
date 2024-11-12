const monthsFromNow = (months) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const newMonth = (new Date().getMonth() + months) % 12;
  const newYear = newMonth < currentMonth ? currentDate.getFullYear() + 1 : currentDate.getFullYear();

  return new Date(newYear, newMonth, currentDate.getDate());
};

const yearsAgo = (years) => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear() - years, currentDate.getMonth(), currentDate.getDate());
};

const formattedDateString = (dateString) => {
  if (!dateString) {
    return undefined;
  }

  try {
    const fullDate = new Date(dateString);
    const d = fullDate.getDate();
    const m = fullDate.getMonth() + 1;
    const y = fullDate.getFullYear();

    return `${d}/${m}/${y}`;
  } catch (error) {
    return undefined;
  }
};

export {monthsFromNow, yearsAgo, formattedDateString};
