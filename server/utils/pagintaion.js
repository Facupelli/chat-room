const getPagination = (page, size, totalRows) => {

  const pageNumber = Math.floor(totalRows.count / 10)

  const limit = size ? +size : 10;
  const offset = page ? page * limit : pageNumber * 10;

  return { limit, offset };
};

module.exports = { getPagination };
