const boids = require('./boids');

module.exports = class Swarm{
	constructor( width, height, leaders ) {
		this.flock = boids({
			boids: 300,              // The amount of boids to use
			speedLimit: 1,          // Max steps to take per tick
			accelerationLimit: 0.1,   // Max acceleration per tick
			separationDistance: 10, // Radius at which boids avoid others
			alignmentDistance: 180, // Radius at which boids align with others
			choesionDistance: 180,  // Radius at which boids approach others
			separationForce: 0.2,  // Speed to avoid at
			alignmentForce: 0.2,   // Speed to align with other boids
			choesionForce: 0.1,     // Speed to move towards other boids
			width: width,
			height: height,
			attractors: leaders.boids
		});

		this.boids = this.flock.boids;
	}

	update() {
		this.flock.tick();
	}
}