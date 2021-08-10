import * as fs from 'fs'
import * as YAML from 'js-yaml'
import * as util from 'util'
import Log from './log.js'

const wait = util.promisify(setTimeout)

const yaml = {
  Get(file: string): object | null | undefined {
    if (fs.existsSync(`./${file}.yaml`)) {
      const fil = fs.readFileSync(`./${file}.yaml`, 'utf8')
      return YAML.load(fil) as object
    } else {
      wait(1000).then(() => {
        Log('Please restart your bot!', 'e')
        process.exit()
      })
    }
  },
  Generate(file: string, contents: object | string): void {
    if (!fs.existsSync(`./${file}.yaml`)) {
      fs.writeFile(`./${file}.yaml`, typeof contents === 'object' ? YAML.dump(contents) : contents, () => {
        wait(1000).then(() => {
          Log(`Successfully created ${file}.yaml`, 's')
        })
      })
    }
  },
}

export default yaml
