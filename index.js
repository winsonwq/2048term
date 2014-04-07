#!/usr/bin/env node

var Game = require('./lib/game');
var game = new Game(process.stdin, process.stdout);
game.start();

process.stdin.setRawMode(true);
process.stdin.on('keypress', function(ch, key) {
  if (key.ctrl && key.name == 'c') {
    process.exit(0);
  }
});
