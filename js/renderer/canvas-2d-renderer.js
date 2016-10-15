module.exports = class Canvas2DRenderer{
	constructor( world, width, height ) {
		this._world = world;
		this._width = width;
		this._height = height;
		this.element = document.createElement( 'canvas' );
		this.element.width = width;
		this.element.height = height;
		this.ctx = this.element.getContext( '2d' );
		this.ctx.fillStyle = '#fff';
	}

	clear() {
		this.ctx.clearRect( 0, 0, this._width, this._height );
	}

	render() {
		this.clear();
		this._world.agents.forEach( this._renderAgent.bind( this ) );
	}

	renderBoids( boids ) {
		this.clear();
		for( var i = 0; i < boids.length; i++ ) {
			if( boids[ i ][ 6 ] === true ) {
				this.ctx.fillStyle = '#F00';
			} else {
				this.ctx.fillStyle = '#FFF';
			}
			this.ctx.fillRect( boids[ i ][ 0 ] - 1, boids[ i ][ 1 ] - 1, 2, 2 );
		}
	}

	_renderAgent( agent ) {
		this.ctx.fillRect( agent.x - 1, agent.y - 1, 2, 2 );
	}
}