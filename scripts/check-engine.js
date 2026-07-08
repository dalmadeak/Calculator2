const semver = require('semver');
const { engines } = require('../package.json');

const currentNode = process.version;
const currentNpm = require('child_process').execSync('npm -v').toString().trim();

/**
 * Checks whether the node and npm versions are withing range when installing
 * Requires ignore-scripts = false to work
 * @param name the name of the package from engines
 * @param currentVersion current version installed
 * @param range required version range
 */
function checkEngine(name, currentVersion, range) {
  if (!semver.satisfies(semver.coerce(currentVersion), range)) {
    console.log(`❌ ${name} version ${currentVersion} does not satisfy required range ${range}`);
    process.exit(1);
  } else {
    console.log(`✅ ${name} ${currentVersion} is compatible (${range})`);
  }
}

if (engines) {
  if (engines.node) checkEngine('node', currentNode, engines.node);
  if (engines.npm) checkEngine('npm', currentNpm, engines.npm);
}
