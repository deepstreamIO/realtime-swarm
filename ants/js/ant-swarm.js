const World = require( './world' );
const Renderer = require( './canvas-2d-renderer' );

module.exports = class AntSwarm{
	constructor( ds, parentElement )  {
		this.width = 200;
		this.height = 150;
		this.parentElement = parentElement;
		this.world = new World({
			width: this.width,
			height: this.height,
			ds: ds,
			maxAnts: 150,
			antHill: { x: 60, y: 60 }
		});
		this.animationFrame = null;
		this.boundTick = this.tick.bind( this );
		this.renderer = new Renderer( this.width, this.height, 4 );
		this.parentElement.appendChild( this.renderer.element );
	}

	tick() {
		this.world.update();
		this.renderer.render( this.world.data, this.world.dataLayer );
		this.animationFrame = requestAnimationFrame( this.boundTick );
	}	

	start() {
		this.tick();
	}

	stop() {
		cancelAnimationFrame( this.animationFrame );
	}
}
