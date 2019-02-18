import './style.scss';
import './components/navigation';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {

  const element = document.createElement('div');
  const preElement = document.createElement('pre');

  element.classList.add('red');
  preElement.innerHTML = "We are live!";

  element.appendChild(preElement);

  return element;
}

document.body.appendChild(component());
