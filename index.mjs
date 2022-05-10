import { $, quiet, cd } from 'zx'

const packageName = process.env.PACKAGE_NAME
const packageNameNoScope = packageName.replace(/^@fs\//, '')

const { stdout: packageInfo } = await quiet($`npm info ${packageName}`)
const versionNumber = packageInfo.match(/\d+\.\d+\.\d+/)[0]

cd(`${process.env.REPO_TO_UPDATE}`)

const { stdout: npmLs } = await $`npm ls ${packageName}`
const currentVersionNumber = npmLs.match(/\d+\.\d+\.\d+/)[1]
if (currentVersionNumber === versionNumber) {
  console.log(`${packageName} is already up to date (${versionNumber})`)
  process.exit(1)
}

await $`git checkout master`
await $`git pull`
const branchName = `update-to-${packageNameNoScope}-${versionNumber.replace(/\./g, '-')}`
await $`git checkout -b ${branchName}`

await $`~/.nvm/versions/node/${process.env.NODE_VERSION}/bin/npm install ${packageName}@${versionNumber} --save`

await $`git add package.json package-lock.json`
await $`git commit -m "Update ${packageNameNoScope} to ${versionNumber}"`
const { stdout: pushInfo } = await $`git push --set-upstream origin ${branchName}`
const pullRequestUrl = pushInfo.match(/remote:      (?<prUrl>.+)?$/m).groups.prUrl.trim()
await $`open ${pullRequestUrl}`
