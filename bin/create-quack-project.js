#! /usr/bin/env node

const fs = require('fs')
const path = require('path')

const args = process.argv.splice(2)
const pwd = process.cwd()

if (args[0] == null || new RegExp('[/\\?%*:|"<>]', 'g').test(args[0])) {
  console.log('Invalid Project Name!')
  process.exit()
} 


if (fs.existsSync(path.join(pwd, args[0]))) {
  console.log('A Folder Already Has The Project Name!')
  process.exit()
}

const createDir = (p) => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p)
  }
}

const copyFile = (file) => {
  fs.writeFileSync(path.join(pwd, args[0], file), fs.readFileSync(path.join(__dirname, 'template', file)).toString())
}

createDir(path.join(pwd, args[0]))
createDir(path.join(pwd, args[0], 'src'))
createDir(path.join(pwd, args[0], 'src', 'modules'))

copyFile('tslint.json')
copyFile('tsconfig.json')
copyFile('package.json')
copyFile('.prettierrc')
copyFile('src/index.ts')
copyFile('src/modules/template.ts')

const package = JSON.parse(fs.readFileSync(path.join(pwd, args[0], 'package.json')).toString())
package.name = args[0]
fs.writeFileSync(path.join(pwd, args[0], 'package.json'), JSON.stringify(package, null, 2))

console.log('Yay! Your Quack.js project has been created!')