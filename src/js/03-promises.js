import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formDelay = Number(form.querySelector('[name="delay"]').value);
  const step = Number(form.querySelector('[name="step"]').value);
  const amount = Number(form.querySelector('[name="amount"]').value);

  for (let i = 0; i < amount; i++) {
    let stepDelay = formDelay + step * i
    createPromise(i+1, stepDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);;

      })
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay })
    } else {
      reject({ position, delay })
    }
  }, delay)
})
  }

