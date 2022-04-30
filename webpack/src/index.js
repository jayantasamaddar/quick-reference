import generateJoke from './generateJoke';
import './styles/main.scss';
import laughing from './assets/laughing.svg';

const laugh = document.getElementById('laughImg');
laugh.src = laughing;

generateJoke();

document.getElementById('jokeBtn').addEventListener('click', generateJoke);