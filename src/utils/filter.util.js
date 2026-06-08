const ORMfilterable = (query, fields) => {
  const filter = {};
  for (const field of fields) {
    if (query[field]) {
      filter[field] = { contains: query[field], mode: "insensitive" };
    }
  }
  return filter;
};

export { ORMfilterable };
