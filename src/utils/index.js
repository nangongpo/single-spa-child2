// 短横线命名 => 骆驼命名
export function camelCase(name) {
  return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(/^moz([A-Z])/, 'Moz$1')
}
