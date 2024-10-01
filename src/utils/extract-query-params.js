export function extractQueryParams(query) {
  return query
    .substr(1)
    .split('&')
    .reduce((queryParams, item) => {
      const [key, value] = param.split('=')

      queryParams[key] = value

      return queryParams
    }, {})
}
