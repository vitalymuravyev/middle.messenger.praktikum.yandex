const queryStringify = (data: Record<string, string>): string => {
  const str = Object.keys(data).reduce((acc, key) => [...acc, (`${key}=${data[key]}`)], []);

  return `?${str.join('&')}`;
};

export default queryStringify;
