export const filterData = (data, filterValue) => {
  const filteredData = data.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });

  return filteredData;
};
