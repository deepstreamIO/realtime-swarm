module.exports = class Canvas2DRenderer{
	constructor( width, height ) {
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

	renderBoids( boids ) {
		this.ctx.fillStyle = '#FFF';
		for( var i = 0; i < boids.length; i++ ) {
			this.ctx.fillRect( boids[ i ][ 0 ] - 1, boids[ i ][ 1 ] - 1, 2, 2 );
		}
	}

	renderLeaderBoids( boids ) {
		this.ctx.fillStyle = '#F00';
		for( var i = 0; i < boids.length; i++ ) {
			this.ctx.fillRect( boids[ i ][ 0 ] - 1, boids[ i ][ 1 ] - 1, 2, 2 );
		}
	}
}