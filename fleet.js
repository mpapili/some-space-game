class Fleet {
    constructor(scene) {
        this.scene = scene;
        this.ships = [];
        this.targetPosition = null;
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
    }

    setPosition(x, y, z) {
        this.fleetMesh.position.set(x, y, z);
    }

    update() {
        if (!this.targetPosition) return;

        // Calculate direction to target
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

        this.fleetMesh.geometry.attributes.position.needsUpdate = true;

        // Check if reached target
        if (this.fleetMesh.position.distanceTo(this.targetPosition) < 1.0) {
            this.targetPosition = null;
        }
    }
}
