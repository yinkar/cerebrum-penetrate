import './style.css';

import CerebrumPenetrate from './src/lib/CerebrumPenetrate';

const b = new CerebrumPenetrate();
b.setOutputElement('.output');

const interprete = () => {
  b.load(document.querySelector('.input').value);
  b.run();
  b.print();
};

document.querySelector('.interprete').addEventListener('click', interprete);

const keyCombination = [];

document.querySelector('.input').addEventListener('keydown', e => {
  keyCombination.push(e.code);

  if (keyCombination.length === 2 && keyCombination.includes('ControlLeft') && keyCombination.includes('Enter')) {
    interprete();
  }
});

document.querySelector('.input').addEventListener('keyup', e => {
  keyCombination.splice(keyCombination.indexOf(e.code), 1);
});