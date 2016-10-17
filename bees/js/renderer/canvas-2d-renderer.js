module.exports = class Canvas2DRenderer{
	constructor( width, height ) {
		this._width = width;
		this._height = height;
		this.element = document.createElement( 'canvas' );
		this.element.width = width;
		this.element.height = height;
		this.ctx = this.element.getContext( '2d' );
		this.ctx.fillStyle = '#fff';
		this.ctx.strokeStyle = '#fff';
		this.ctx.lineWidth = 3;
		//this.ctx.scale( 1.5, 1.5 );
	}

	clear() {
		this.ctx.clearRect( 0, 0, this._width, this._height );
	}

	renderBoids( boids ) {
		this.ctx.fillStyle = '#FFF';
		for( var i = 0; i < boids.length; i++ ) {
			this.ctx.fillRect( boids[ i ][ 0 ] - 2, boids[ i ][ 1 ] - 2, 4, 4 );
		}
	}

	renderLeaderBoids( boids ) {
		for( var i = 0; i < boids.length; i++ ) {
			this.ctx.fillStyle = boids[ i ][ 4 ];
			this.ctx.fillRect( boids[ i ][ 0 ] - 3, boids[ i ][ 1 ] - 3, 6, 6 );
			if( boids[ i ][ 5 ] ) {
				this.ctx.strokeRect( boids[ i ][ 0 ] - 3, boids[ i ][ 1 ] - 3, 6, 6 );
			}
		}
	}
}