import axios from 'axios';
const generateJoke = () => {
    try {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json'
            },
        }).then(({data: { joke }}) => document.getElementById('joke').innerHTML = joke);
    }
    catch(error) {
        console.log(error);
    }
}

export default generateJoke;