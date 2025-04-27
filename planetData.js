const planetData = {
    sun: {
        radius: 20,
        texture: 'https://threejs.org/examples/textures/planets/sun.jpg',
        orbitRadius: 0,
        orbitSpeed: 0,
        tilt: 0,
        rotationSpeed: 0.005,
        description: "Our Sun - A G-type main-sequence star"
    },
    mercury: {
        radius: 3.2,
        texture: 'https://threejs.org/examples/textures/planets/mercury.jpg',
        orbitRadius: 40,
        orbitSpeed: 0.04,
        tilt: 0.1,
        rotationSpeed: 0.004,
        description: "Mercury - The smallest and innermost planet"
    },
    venus: {
        radius: 6.0,
        texture: 'https://threejs.org/examples/textures/planets/venus.jpg',
        orbitRadius: 60,
        orbitSpeed: 0.015,
        tilt: 0.05,
        rotationSpeed: 0.002,
        description: "Venus - Hottest planet with a toxic atmosphere"
    },
    earth: {
        radius: 6.3,
        texture: 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
        orbitRadius: 80,
        orbitSpeed: 0.01,
        tilt: 0.41,
        rotationSpeed: 0.02,
        description: "Earth - Our home, the blue planet"
    },
    mars: {
        radius: 3.3,
        texture: 'https://threejs.org/examples/textures/planets/mars.jpg',
        orbitRadius: 100,
        orbitSpeed: 0.008,
        tilt: 0.44,
        rotationSpeed: 0.018,
        description: "Mars - The red planet, target for colonization"
    },
    jupiter: {
        radius: 11.2,
        texture: 'https://threejs.org/examples/textures/planets/jupiter.jpg',
        orbitRadius: 140,
        orbitSpeed: 0.002,
        tilt: 0.05,
        rotationSpeed: 0.04,
        description: "Jupiter - Largest planet, gas giant"
    },
    saturn: {
        radius: 9.5,
        texture: 'https://threejs.org/examples/textures/planets/saturn.jpg',
        orbitRadius: 170,
        orbitSpeed: 0.0009,
        tilt: 0.47,
        rotationSpeed: 0.038,
        description: "Saturn - Famous for its ring system"
    },
    uranus: {
        radius: 8.5,
        texture: 'https://threejs.org/examples/textures/planets/uranus.jpg',
        orbitRadius: 200,
        orbitSpeed: 0.0004,
        tilt: 1.43,
        rotationSpeed: 0.03,
        description: "Uranus - Ice giant with extreme axial tilt"
    },
    neptune: {
        radius: 8.3,
        texture: 'https://threejs.org/examples/textures/planets/neptune.jpg',
        orbitRadius: 230,
        orbitSpeed: 0.0001,
        tilt: 0.72,
        rotationSpeed: 0.032,
        description: "Neptune - Coldest planet with supersonic winds"
    }
};
