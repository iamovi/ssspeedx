#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const robot = require('robotjs');
const readlineSync = require('readline-sync');

const packageJson = require('./package.json');

async function checkForUpdate() {
  try {
    const { stdout } = await exec(`npm show ssspeedx version`);
    const latestVersion = stdout.trim();
    if (packageJson.version !== latestVersion) {
      console.log(`Yo! ⚡ 'ssspeedx' v${latestVersion} is available. \nConsider updating the package using 'npm update -g ssspeedx'`);
      console.log('');
    }
  } catch (error) {
    console.error('Error checking for updates:', error.message);
  }
}

function handleOptions(args) {
  if (args.includes('--help')) {
    displayHelp();
    process.exit(0);
  }

  if (args.includes('-v') || args.includes('--version')) {
    checkForUpdate().then(() => {
      displayVersion();
      process.exit(0);
    });
  }
}

function displayHelp() {
  console.log('Usage:');
  console.log('  ssspeedx [options]');
  console.log('\nOptions:');
  console.log('  -v, --version    Display the current version');
  console.log('  --help           Display this help message');
  console.log('\nDescription:');
  console.log('  Simulate sending messages with a specified interval.');
  console.log('\nExamples:');
  console.log('  ssspeedx -v        Display the version');
  console.log('  ssspeedx --help    Display this help message');
  console.log('  ssspeedx           Start sending messages with the configured interval');
}

function displayVersion() {
  console.log(`Version: ${packageJson.version}`);
}

let messageToSend = '';

function typeAndEnter() {
  robot.typeString(messageToSend);
  robot.keyTap('enter');
}

function editMessage() {
  messageToSend = readlineSync.question('Type your new message to send => ');
  askForOptions();
}

function runScript() {
  console.log('Script running... \nPress Ctrl + C to stop.');
  const intervalId = setInterval(typeAndEnter, 1000);

  // Handle Ctrl + C to stop the script
  process.on('SIGINT', () => {
    clearInterval(intervalId);
    console.log('\nScript stopped.');
    exitScript();
  });
}

function exitScript() {
  console.log('Exiting...');
  process.exit(0);
}

function askForOptions() {
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

async function startScript() {
  await checkForUpdate();
  messageToSend = readlineSync.question('Type your message to send => ');
  askForOptions();
}

handleOptions(process.argv.slice(2));
startScript();
