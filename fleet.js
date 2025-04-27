class Fleet {
    constructor(scene) {
        this.scene = scene;
        this.ships = [];
        this.targetPosition = null;
        this.orbitingPlanet = null;
        this.numShips = 100;
        this.strength = 1.0;
        this.speed = 0.5;
        this.spread = 15;
        this.positions = new Float32Array(this.numShips * 3);
        this.createFleet();
    }

    createFleet() {
        // Create geometry for all ships
        const shipGeometry = new THREE.BufferGeometry();
        
        // Initialize random positions within a small sphere
        for (let i = 0; i < this.numShips; i++) {
            this.positions[i * 3] = (Math.random() - 0.5) * this.spread;
            this.positions[i * 3 + 1] = (Math.random() - 0.5) * this.spread;
            this.positions[i * 3 + 2] = (Math.random() - 0.5) * this.spread;
        }

        shipGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        shipGeometry.computeBoundingSphere();

        const shipMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.3,
            sizeAttenuation: true
        });

        this.fleetMesh = new THREE.Points(shipGeometry, shipMaterial);
        this.fleetMesh.name = 'playerFleet';
        this.scene.add(this.fleetMesh);

        // Start at random position
        this.setPosition(
            (Math.random() - 0.5) * 100,
            20,
            (Math.random() - 0.5) * 100
        );
    }

    setTarget(x, y, z) {
        this.targetPosition = new THREE.Vector3(x, y, z);
        this.orbitingPlanet = null; // Leave current orbit when new target set
    }

    setPosition(x, y, z) {
        this.fleetMesh.position.set(x, y, z);
    }

    update() {
        if (this.orbitingPlanet) {
            // If orbiting a planet, follow its position
            const planet = planets[this.orbitingPlanet];
            this.fleetMesh.position.copy(planet.mesh.position);
            
            // Add swarm motion while orbiting
            const time = Date.now() * 0.001;
            for (let i = 0; i < this.numShips; i++) {
                this.positions[i * 3] = (Math.sin(time + i) * 0.8) * this.spread;
                this.positions[i * 3 + 1] = (Math.sin(time * 0.7 + i * 1.5) * 0.6) * this.spread;
                this.positions[i * 3 + 2] = (Math.cos(time + i * 0.8) * 0.5) * this.spread;
            }
        } 
        else if (this.targetPosition) {
            // Moving toward target
            const direction = new THREE.Vector3().subVectors(
                this.targetPosition, 
                this.fleetMesh.position
            ).normalize();

            // Move fleet toward target
            this.fleetMesh.position.add(
                direction.multiplyScalar(this.speed)
            );

            // Add some random movement to make it look organic
            for (let i = 0; i < this.numShips; i++) {
                this.positions[i * 3] += (Math.random() - 0.5) * 0.3;
                this.positions[i * 3 + 1] += (Math.random() - 0.5) * 0.2;
                this.positions[i * 3 + 2] += (Math.random() - 0.5) * 0.3;
            }

            // Check for planet collisions
            for (const [name, planet] of Object.entries(planets)) {
                if (name === 'sun') continue; // Skip sun collision
                
                const distance = this.fleetMesh.position.distanceTo(planet.mesh.position);
                if (distance < planet.data.radius * 2) {
                    this.orbitingPlanet = name;
                    this.targetPosition = null;
                    break;
                }
            }
        } 
        else {
            // Idle swarm motion
            const time = Date.now() * 0.0005;
            for (let i = 0; i < this.numShips; i++) {
                this.positions[i * 3] = (Math.sin(time + i) * 0.5) * this.spread;
                this.positions[i * 3 + 1] = (Math.sin(time * 1.3 + i) * 0.5) * this.spread;
                this.positions[i * 3 + 2] = (Math.cos(time * 0.7 + i) * 0.5) * this.spread;
            }
        }

        this.fleetMesh.geometry.attributes.position.needsUpdate = true;
    }
}
