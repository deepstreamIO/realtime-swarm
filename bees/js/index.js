const Swarm = require( './swarm' );
const LeaderBoids = require( './leader-boids' );
const Renderer = require( './renderer/canvas-2d-renderer' );


module.exports = class BeeSwarm{
	constructor( ds, element, x, y ) {
		this.element = element;
		this.isRunning = false;
		this.animationFrame = null;
		var width = this.element.offsetWidth;
		var height = this.element.offsetHeight;
		this.leaders = new LeaderBoids( ds, width, height );
		this.swarm = new Swarm( x, y, this.leaders );
		this.renderer = new Renderer( width, height );
		this.element.appendChild( this.renderer.element );
	}

	start() {
		this.isRunning = true;
		this.tick();
	}

	stop() {
		this.isRunning = false;
		cancelAnimationFrame( this.animationFrame );
	}

	tick() {
		this.leaders.update();
		this.swarm.update();
		this.renderer.clear();
		this.renderer.renderBoids( this.swarm.boids );
		this.renderer.renderLeaderBoids( this.leaders.boids );
		if( this.isRunning ) {
			this.animationFrame = requestAnimationFrame( this.tick.bind( this ) );
		}
	}
}