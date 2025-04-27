let scene, camera, renderer, controls;
const planets = {};
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Add stars
    addStars();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 100, 200);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('solarCanvas'), antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Add controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 30;
    controls.maxDistance = 500;
    controls.enablePan = true;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 2, 500);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    
    // Create solar system
    createSolarSystem();
    
    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClick);
    
    // Start animation loop
    animate();
}

function addStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2,
        transparent: true
    });
    
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

function createSolarSystem() {
    // Create sun
    const sunGeo = new THREE.SphereGeometry(planetData.sun.radius, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({
        color: planetData.sun.color,
        emissive: planetData.sun.emissive,
        emissiveIntensity: planetData.sun.emissiveIntensity
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.name = 'sun';
    scene.add(sun);
    planets.sun = sun;

    // Create planets
    for (const [name, data] of Object.entries(planetData)) {
        if (name === 'sun') continue;
        
        const planetGeo = new THREE.SphereGeometry(data.radius, 64, 64);
        let planetMat;
        if (name === 'earth') {
            planetMat = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(data.texture),
                shininess: 1
            });
        } else {
            planetMat = new THREE.MeshPhongMaterial({
                color: data.color,
                shininess: name === 'saturn' ? 0.5 : 1
            });
            
            // Special handling for Jupiter
            if (name === 'jupiter') {
                const stripes = new THREE.MeshPhongMaterial({
                    color: data.stripeColor,
                    shininess: 1
                });
                // Create a simple banded appearance
                // We'll just rotate alternate materials to give a striped effect
                // This is a simplified version without proper UV mapping
            }
            
            // Add any special planet features here
            if (name === 'jupiter') {
                // Jupiter-specific features could go here
            }
        }
        const planet = new THREE.Mesh(planetGeo, planetMat);
        planet.name = name;
        
        // Position planet in orbit
        const orbitAngle = Math.random() * Math.PI * 2;
        planet.position.x = data.orbitRadius * Math.cos(orbitAngle);
        planet.position.z = data.orbitRadius * Math.sin(orbitAngle);
        
        // Add tilt
        planet.rotation.x = data.tilt;
        
        // Add rings for Saturn after creating the planet
        if (name === 'saturn') {
            const ringGeometry = new THREE.RingGeometry(
                data.radius * 1.5,
                data.radius * 2.5,
                32
            );
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: data.ringColor,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 2;
            planet.add(rings);
        }

        scene.add(planet);
        planets[name] = {
            mesh: planet,
            data: data,
            angle: orbitAngle
        };
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate sun
    planets.sun.rotation.y += planetData.sun.rotationSpeed;
    
    // Update planet positions
    for (const [name, planet] of Object.entries(planets)) {
        if (name === 'sun') continue;
        
        planet.angle += planet.data.orbitSpeed;
        planet.mesh.position.x = planet.data.orbitRadius * Math.cos(planet.angle);
        planet.mesh.position.z = planet.data.orbitRadius * Math.sin(planet.angle);
        planet.mesh.rotation.y += planet.data.rotationSpeed;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Check for planet hover
    checkIntersection();
}

function onClick() {
    const infoPanel = document.getElementById('infoPanel');
    infoPanel.style.display = 'block';
}

function checkIntersection() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    
    // Reset all highlights
    scene.children.forEach(obj => {
        if (obj instanceof THREE.Mesh) {
            obj.material.emissiveIntensity = 0;
            obj.material.emissive.setHex(0x000000);
        }
    });
    
    if (intersects.length > 0) {
        const planet = intersects[0].object;
        if (planetData[planet.name]) {
            // Highlight planet
            planet.material.emissiveIntensity = 0.5;
            planet.material.emissive.setHex(0x888888);
            
            // Update info panel
            const infoPanel = document.getElementById('infoPanel');
            infoPanel.textContent = planetData[planet.name].description;
        }
    }
}

// Start the application
init();
