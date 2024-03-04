#!/usr/bin/env node

const robot = require("robotjs");
const readlineSync = require('readline-sync');
const features = require('./files/features'); // Adjust the path if necessary

const args = process.argv.slice(2);

features.handleOptions(args);

let messageToSend = '';

function typeAndEnter() {
  robot.typeString(messageToSend);
  robot.keyTap("enter");
}

function editMessage() {
  messageToSend = readlineSync.question('Type your new message to send: ');
  features.askForOptions();
}

function runScript() {
  const intervalId = setInterval(typeAndEnter, 1000);
  console.log('Script running...');
}

function exitScript() {
  console.log('Exiting...');
  process.exit(0);
}

messageToSend = readlineSync.question('Type your message to send: ');
features.askForOptions(editMessage, runScript, exitScript);