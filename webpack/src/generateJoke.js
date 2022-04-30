import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime"; 
const generateJoke = async () => {
    const jokeEl = document.getElementById('joke');
    try {
        const { data: { joke} } = await axios.get('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json'
            },
        })
        if(joke) jokeEl.innerHTML = joke;
        else jokeEl.innerHTML = "Joke's on you!";
    }
    catch(error) {
        console.log(error.message);
    }
}

export default generateJoke;