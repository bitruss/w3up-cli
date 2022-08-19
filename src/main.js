#!/usr/bin/env node

import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import printQuickstart from './quickstart.js'

import id from './commands/id.js'
import register from './commands/register.js'

import list from './commands/list.js'
import whoami from './commands/whoami.js'
import upload from './commands/upload.js'
import remove from './commands/remove.js'

import importSettings from './commands/importSettings.js'
import exportSettings from './commands/exportSettings.js'
import resetSettings from './commands/resetSettings.js'

import insights from './commands/insights.js'

import carToDot from './commands/carToDot.js'
import generateCar from './commands/generateCar.js'

const yargs = _yargs(hideBin(process.argv))

export const main = async () => {
  const argv = await yargs
    .scriptName('w3up')
    .usage('Usage:\n  $0 <cmd> [options]')
    .command({
      command: '*',
      handler() {
        printQuickstart()
        yargs.showHelp()
      },
    })

    //registration
    .command(id.cmd, id.description, id.build, id.exe)
    .example(id.exampleIn, id.exampleOut)

    .command(register.cmd, register.description, register.build, register.exe)
    .command(whoami.cmd, whoami.description, whoami.build, whoami.exe)
    .example(whoami.exampleIn, whoami.exampleOut)

    //general usage
    .command(list.cmd, list.description, list.build, list.exe)
    .example(list.exampleIn, list.exampleOut)

    .command(upload.cmd, upload.description, upload.build, upload.exe)
    .example(upload.exampleIn, upload.exampleOut)

    .command(remove.cmd, remove.description, remove.build, remove.exe)
    .example(remove.exampleIn, remove.exampleOut)

    //settings
    .command(
      importSettings.cmd,
      importSettings.description,
      importSettings.build,
      importSettings.exe
    )
    .command(
      exportSettings.cmd,
      exportSettings.description,
      exportSettings.build,
      exportSettings.exe
    )
    .command(
      resetSettings.cmd,
      resetSettings.description,
      resetSettings.build,
      resetSettings.exe
    )

    //insights
    .command(insights.cmd, insights.description, insights.build, insights.exe)

    //utilities
    .command(carToDot.cmd, carToDot.description, carToDot.build, carToDot.exe)
    .example(carToDot.exampleIn, carToDot.exampleOut)

    .command(
      generateCar.cmd,
      generateCar.description,
      generateCar.build,
      generateCar.exe
    )
    .example(generateCar.exampleIn, generateCar.exampleOut)

    .help()
    //     .showHelpOnFail(true)
    .demandCommand(1, '')
    .recommendCommands()
    .strict()
    .epilog('Docs:\n  https://github.com/nftstorage/w3up-cli').argv

  return argv
}
