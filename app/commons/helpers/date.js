const converIntToDate = (value) => {
  return new Date(
    value.substr(0, 4) + "/" + value.substr(4, 2) + "/" + value.substr(6, 2)
  );
};

export { converIntToDate };
