const injectQueryParams = (baseUrl, paramsObject) => {
  const paramsStr = objectToQueryParamsStr(paramsObject);

  if (baseUrl.includes('?')) {
    return `${baseUrl}${paramsStr}`;
  }

  return `${baseUrl}?${paramsStr}`;
};

const objectToQueryParamsStr = (paramObject) => {
  const objKeys = Object.keys(paramObject || {});
  if (!objKeys.length) {
    return '';
  }

  let finalStr = '';
  objKeys.map((key) => {
    finalStr += `${key}=${paramObject[key]}${objKeys.length > 1 ? '&' : ''}`;
  });

  return finalStr;
};

module.exports = { injectQueryParams, objectToQueryParamsStr };
