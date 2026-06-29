function calculateAgeInMonths(birthDate, measurementDate) {
  const birth = new Date(birthDate);
  const measure = new Date(measurementDate);

  let months =
    (measure.getFullYear() - birth.getFullYear()) * 12 +
    (measure.getMonth() - birth.getMonth());

  if (measure.getDate() < birth.getDate()) {
    months--;
  }

  return months;
}

export default calculateAgeInMonths;
