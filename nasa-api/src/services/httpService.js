// NOTE: this file serves as abstraction of HTTP library that makes requests to third party apis
// it is kept in separate file if it is decided for this code to use something else other than axios
// also it helps with testing, so we when services method are tested, we do not test usage of third party library like axios
// but we only focuse on business logic of service method(s)

const axios = require('axios');
const { injectQueryParams } = require('../common');

const get = (url, params = {}, opt = {}) => axios.get(injectQueryParams(url, params), opt).then(response => response.data);

// todo: add more defintions for all other HTTP methods covering all use-cases how those can be used

module.exports = { get };
