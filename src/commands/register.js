import ora from 'ora'
import Inquirer from 'inquirer'
import client from '../client.js'
import { isEmail, hasID } from '../validation.js'

/**
 * @typedef {{email?:string}} Register
 * @typedef {import('yargs').Arguments<Register>} RegisterArgs
 */

/**
 * @async
 * @param {RegisterArgs} argv
 * @returns {Promise<void>}
 */
const exe = async (argv) => {
  const { email } = argv
  // TODO: https://github.com/nftstorage/w3up-cli/issues/15
  // this can hang if there's network disconnectivity.
  const view = ora({
    text: `Registering ${email}, check your email for the link.`,
    spinner: 'line',
  }).start()

  try {
    let result = await client.register(email)
    if (result) {
      view.succeed(`Registration succeeded: ${email}`)
    }
  } catch (err) {
    // @ts-ignore
    view.fail(err.toString())
  }
}
/**
 * @type {import('yargs').CommandBuilder} yargs
 * @returns {import('yargs').Argv<{}>}
 */

const build = (yargs) => yargs.check(() => hasID()).check(checkEmail)

/**
 * @param {RegisterArgs} argv
 */
const checkEmail = (argv) => {
  const { email } = argv
  if (isEmail(email)) {
    return true
  }
  throw new Error(`Error: ${email} is probably not a valid email.`)
}

const register = {
  cmd: 'register <email>',
  description: 'Register your UCAN Identity with w3up',
  build,
  exe,
}

export default register
