const name = document.querySelector('#First-name');
const sign = document.querySelector('.signature-main');
const uppercase = document.querySelectorAll('.letter-bank .up');
const lowercase = document.querySelectorAll('.letter-bank .lo');
const signedBy = document.querySelector('.signed-by');
const modal = document.querySelector('.modal');

name.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || /^Key[A-Za-z]$/.test(event.code)) {
    draw(event.key, true);
  } else if (event.code === 'Backspace') {
    setTimeout(() => {
      rebuildSignature();
    }, 50);
  }
  setTimeout(() => {
    modal.classList.toggle('active', !!name.value);
  }, 50);
});

function draw(key, animate) {
  if (key === ' ') {
    appendSpace();
  } else {
    appendLetter(key, animate);
  }
}

function appendSpace() {
  const space = document.createElement('div');
  space.style.minWidth = '12px';
  sign.appendChild(space);
}

function appendLetter(key, animate) {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
  const index = alphabet.indexOf(key.toLowerCase());

  if (index !== -1) {
    const letter = document.createElement('div');
    const isUppercase = key === key.toUpperCase();
    letter.innerHTML = isUppercase ? uppercase[index].innerHTML : lowercase[index].innerHTML;
    letter.classList.add(isUppercase ? 'up' : 'lo', alphabet[index]);

    const path = letter.querySelector('svg path');
    if (animate) {
      setTimeout(() => {
        path.style.strokeDashoffset = '0';
      }, 50);
    } else {
      path.style.strokeDashoffset = '0';
    }

    sign.appendChild(letter);
  }
}

function rebuildSignature() {
  sign.innerHTML = '';
  const letters = name.value.split('');
  letters.forEach((letter) => {
    draw(letter, false);
  });
}