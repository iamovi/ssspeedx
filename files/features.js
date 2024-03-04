const readlineSync = require('readline-sync');
const packageJson = require('../package.json'); // Adjust the path if necessary

function handleOptions(args) {
  if (args.includes('--help')) {
    displayHelp();
    process.exit(0);
  }

  if (args.includes('-v') || args.includes('--version')) {
    displayVersion();
    process.exit(0);
  }
}

function displayHelp() {
  console.log('Usage:');
  console.log('  ssspeed [options]');
  console.log('\nOptions:');
  console.log('  -v, --version    Display the current version');
  console.log('  --help           Display this help message');
  console.log('\nDescription:');
  console.log('  Simulate sending messages with a specified interval.');
  console.log('\nExamples:');
  console.log('  ssspeed.js -v        Display the version');
  console.log('  ssspeed.js --help    Display this help message');
  console.log('  ssspeed           Start sending messages with the configured interval');
}

function displayVersion() {
  console.log(`Version: ${packageJson.version}`);
}

function askForOptions(editMessage, runScript, exitScript) {
  const options = ['Edit message', 'Run', 'Exit'];
  const index = readlineSync.keyInSelect(options, 'Choose an option: ', { cancel: false });

  switch (index) {
    case 0:
      editMessage();
      break;
    case 1:
      runScript();
      break;
    case 2:
      exitScript();
      break;
    default:
      exitScript();
  }
}

module.exports = { handleOptions, displayHelp, displayVersion, askForOptions };