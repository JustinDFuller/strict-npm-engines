const { promisify } = require('util')
const { exec } = require('child_process')

const { packageJson } = require('./packageJson.js')

const execAsync = promisify(exec)

/**
 * @returns {Object} an object of the actual engine versions.
 * @throws An error when the found version does not match the required range.
 */
async function strictNpmEngines () {
  const pkg = await packageJson()

  const nodeVersion = process.version
  const npmVersion = (await execAsync('npm --version')).stdout

  const node = pkg.enforceVersion('node', nodeVersion)
  const npm = pkg.enforceVersion('npm', npmVersion)

  return {
    node,
    npm
  }
}

module.exports = {
  strictNpmEngines
}
