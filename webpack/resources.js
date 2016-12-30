const src = '../src/';
const i18n = `${src}i18n/`;
const fs = require('fs');
const glob = require('glob');
var resourceNames = glob.sync(`${i18n}*.json`);
console.log(resourceNames);
var resources = resourceNames.map(resourceName => {
  return {
    name: resourceName.replace(i18n, '').replace('.json', ''),
    data: require(resourceName)
  }
})
console.log(resources);

module.exports = resources;