const planetData = {
    sun: {
        radius: 20,
        color: 0xffff00,
        emissive: 0xffff33,
        emissiveIntensity: 1,
        orbitRadius: 0,
        orbitSpeed: 0,
        tilt: 0,
        rotationSpeed: 0.005,
        description: "Our Sun - A G-type main-sequence star"
    },
    mercury: {
        radius: 3.2,
        color: 0xb5b5b5,
        orbitRadius: 40,
        orbitSpeed: 0.04,
        tilt: 0.1,
        rotationSpeed: 0.004,
        description: "Mercury - The smallest and innermost planet"
    },
    venus: {
        radius: 6.0,
        color: 0xe6b800,
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
        color: 0xc1440e,
        orbitRadius: 100,
        orbitSpeed: 0.008,
        tilt: 0.44,
        rotationSpeed: 0.018,
        description: "Mars - The red planet, target for colonization"
    },
    jupiter: {
        radius: 11.2,
        color: 0xc88b3a,
        stripeColor: 0xb37d35,
        orbitRadius: 140,
        orbitSpeed: 0.002,
        tilt: 0.05,
        rotationSpeed: 0.04,
        description: "Jupiter - Largest planet, gas giant"
    },
    saturn: {
        radius: 9.5,
        color: 0xe3dccb,
        ringColor: 0xc0ac8d,
        orbitRadius: 170,
        orbitSpeed: 0.0009,
        tilt: 0.47,
        rotationSpeed: 0.038,
        description: "Saturn - Famous for its ring system"
    },
    uranus: {
        radius: 8.5,
        color: 0x8fd7d6,
        orbitRadius: 200,
        orbitSpeed: 0.0004,
        tilt: 1.43,
        rotationSpeed: 0.03,
        description: "Uranus - Ice giant with extreme axial tilt"
    },
    neptune: {
        radius: 8.3,
        color: 0x3b5dcd,
        orbitRadius: 230,
        orbitSpeed: 0.0001,
        tilt: 0.72,
        rotationSpeed: 0.032,
        description: "Neptune - Coldest planet with supersonic winds"
    }
};
