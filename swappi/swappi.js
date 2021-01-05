const fetch = require('node-fetch');

async function getPeople(id) {
    try {
        let petition;
        if (!id){
            petition = 'https://swapi.py4e.com/api/people'
        }else{
            petition = `https://swapi.py4e.com/api/people/${id}`
        }
            

        const response = await fetch(petition, {
            method: 'get'
        })
        const person = await response.json();
        return person;
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    getPeople
}