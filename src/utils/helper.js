const getPaginatedRecords = (page, pageSize, records) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return records.slice(startIndex, endIndex);
};

module.exports = {
  getPaginatedRecords,
};
