import './style.css';

import CerebrumPenetrate from './src/lib/CerebrumPenetrate';

const b = new CerebrumPenetrate();
b.setOutputElement('.output');

document.querySelector('.interprete').addEventListener('click', () => {
  b.load(document.querySelector('#input').value);
  b.run();
  b.print();
});
