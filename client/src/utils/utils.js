import _ from 'lodash'

export const rediectToHomepage = () => {
  window.location = 'http://www.example.com/'
}

export const getRefsValues = (refs, refName) => {
  const item = _.get(refs, refName, false)
  if (!item || _.isEmpty(item.refs)) return {}
  const keys = Object.keys(item.refs)
  const collection = []
  for (const key of keys) {
    const value = item.refs[key].value
    collection.push({ key, value })
  }
  return collection
}
