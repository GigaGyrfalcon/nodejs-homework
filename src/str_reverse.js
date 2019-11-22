import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const strReverse = str =>
  str
    .split('')
    .reverse()
    .join('');

const askForInput = () => {
  rl.question('Enter string: ', value => {
    console.log('String reversed: ' + strReverse(value));
    askForInput();
  });
};

askForInput();
