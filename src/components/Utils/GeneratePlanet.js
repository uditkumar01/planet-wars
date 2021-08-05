import { MdSignalCellularNull } from "react-icons/md";

const Planet = require("@stefftek/planet.js");

const generateRandomHex = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
}

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

export function generatePlanet() {
    let colors = {
        land_color: `#${generateRandomHex()}`,
        beach_color: `#${generateRandomHex()}`,
        shore_color: `#${generateRandomHex()}`,
        ocean_color: `#${generateRandomHex()}`,
        mountain_color: `#${generateRandomHex()}`,
        mountain_top_color: `#${generateRandomHex()}`,
        crater_color: `#${generateRandomHex()}`,
        pole_color: `#${generateRandomHex()}`,
        cloud_color: `#${generateRandomHex()}`,
        cloud_opacity: 70,
        atmosphere_color: `#${generateRandomHex()}`,
        atmosphere_opacity: 70,
        shading_level: 0.9,
        add_detail: true,
    }

    let planetOptions = {
        planet_radius: 80,
        atmosphere_radius: 95,
        sea_level: getRandomArbitrary(0, 1),
        shore_level: getRandomArbitrary(0, 1),
        beach_level: getRandomArbitrary(0, 1),
        mountain_level: getRandomArbitrary(0, 1),
        mountain_top_level: getRandomArbitrary(0, 1),
        cloud_level: getRandomArbitrary(0, 1),
        cloud_radius: 85,
        pole_level: getRandomArbitrary(0, 1),
        craters: false,
        clouds: true,
        atmosphere: true,
        poles: true,
        hard_pole_lines: true,
    }

    let generatorOptions = {
        octaveCount: 9,
        amplitude: 5,
        persistence: getRandomArbitrary(0, 1)
    }

    let cloud_generator = {
        octaveCount: 6,
        amplitude: 6,
        persistence: getRandomArbitrary(0, 1)
    }
    
    let image = Planet.generatePlanet(200, planetOptions, colors, null, generatorOptions);
    Planet.save(image, "Planet.png")
}