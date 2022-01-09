import('dotenv').then(dotenv => dotenv.config())
import { QuackJS, QuackJSUtils } from "@n-f9/quack.js"

const Quack = new QuackJS(process.env.TOKEN as string, {}) 

const files = QuackJSUtils.GetFiles('./out/modules')

const getModules = async () => {
  for (const file of files) {
    const execute = (await import('./' + file)).default
    await execute(Quack)
  }
}

getModules().then(() => {
  Quack.Start(Quack)
})
