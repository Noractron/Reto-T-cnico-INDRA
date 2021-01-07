const fetch = require('node-fetch');

async function getPeople(id) {
    try {
        var personas = {};
        let people;
        if (!id) {
            people = 'https://swapi.py4e.com/api/people'
        } else {
            people = `https://swapi.py4e.com/api/people/${id}`
        }
        const response = await fetch(people, {
            method: 'get'
        })

        const person = await response.json();
        
        personas["nombre"]= person.name
        personas["talla"]= person.height
        personas["peso"]= person.mass
        personas["color_pelo"]= person.hair_color
        personas["color_piel"]= person.skin_color
        personas["color_ojo"]= person.eye_color
        personas["cumpleano"]= person.birth_year
        personas["genero"]= person.gender
        personas["mundo_hogar"]= person.homeworld
        personas["pelicula"]= person.films
        personas["especie"]= person.species
        personas["vehiculo"] =person.vehicles
        personas["nave_estelar"] =person.starships
        
        return personas;
    } catch (error) {
        console.log(error);
    }

};
async function getPlanet(id) {
    try {
        var planetas = {};
        let planet;
        if (!id) {
            planet = 'https://swapi.py4e.com/api/planets/'
        } else {
            planet = `https://swapi.py4e.com/api/planets/${id}`
        }
        const response = await fetch(planet, {
            method: 'get'
        })

        const planets = await response.json();
        
        planetas["clima"]= planets.climate
        planetas["diametro"]= planets.diameter
        planetas["gravedad"]= planets.gravity
        planetas["nombre"]= planets.name
        planetas["periodo_orbital"]= planets.orbital_period
        planetas["poblacion"]= planets.population
        planetas["residente"]= planets.residents
        planetas["periodo_rotacion"]= planets.rotation_period
        planetas["superficie_acuatica"]= planets.surface_water
        planetas["terreno"]= planets.terrain
 
        // for(data in person){
        //     console.log(person[data])
        //     }
        return planetas;
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    getPeople,
    getPlanet
}