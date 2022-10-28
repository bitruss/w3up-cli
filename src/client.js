import * as CBOR from '@ucanto/transport/cbor'
import W3Client from '@web3-storage/w3up-client'
import Conf from 'conf'

import { default as cliSettings } from './settings.js'

const serialize = ({ ...data }) =>
  Buffer.from(CBOR.codec.encode(data)).toString('binary')

/**
 * @param {string} text
 */
const deserialize = (text) => CBOR.codec.decode(Buffer.from(text, 'binary'))

/**
 * @param {any} profileSettings
 */
function mergeSettings(profileSettings) {
  if (profileSettings.size) {
    return
  }

  // @ts-expect-error
  const oldSettings = new Conf({
    projectName: cliSettings.projectName,
    fileExtension: 'json',
    // serialize,
    // deserialize,
  })

  if (oldSettings.size) {
    profileSettings.store = { ...oldSettings.store }
  }
}

export function getProfileSettings(profile = 'main') {
  // @ts-expect-error
  const profileSettings = new Conf({
    projectName: 'w3up',
    projectSuffix: '',
    configName: profile,
    fileExtension: 'json',
    // serialize,
    // deserialize,
  })

  // TODO: remove this when no longer needed.
  mergeSettings(profileSettings)

  return profileSettings
}

export function getClient(profile = 'main') {
  const settings = getProfileSettings(profile)

  const client = new W3Client({
    serviceDID: /** @type {`did:${string}`} */ (cliSettings.W3_STORE_DID),
    serviceURL: cliSettings.SERVICE_URL,
    accessDID: /** @type {`did:${string}`} */ (cliSettings.ACCESS_DID),
    accessURL: cliSettings.ACCESS_URL,
    settings,
  })

  return client
}
