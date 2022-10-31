export function renderTpl (tpl, data) {
  return tpl.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    return data[key.trim()] || ''
  })
}