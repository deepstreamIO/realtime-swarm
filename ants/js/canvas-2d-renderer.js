const E = require( './enums' );
const COLORS = [];
COLORS[ E.EMPTY ] = '#CCCCCC';
COLORS[ E.ANT ] = '#000000';
COLORS[ E.FOOD ] = '#FF00FF';
COLORS[ E.OBSTACLE ] = '#00FF00';
COLORS[ E.ANT_HILL ] = '#FF3388';

module.exports = class Canvas2dRenderer{
	constructor( width, height, pixelsPerCell ) {
		this._width = width;
		this._height = height;
		this._pixelsPerCell = pixelsPerCell;
		this.element = document.createElement( 'canvas' );
		this.element.width = this._width * pixelsPerCell;
		this.element.height = this._height * pixelsPerCell;
		this._ctx = this.element.getContext( '2d' );
		this._ctx.scale( pixelsPerCell, pixelsPerCell );
	}

	render( data ) {
		var x, y;
		// console.log( imageData.data.slice( 0, 10 ) );debugger;
		// var x = (i / 4) % this.el.width;
		// var y = Math.floor((i / 4) / this.el.width);
		this._ctx.clearRect( 0, 0, this._width, this._height );
		for( x = 0; x < data.length; x++ ) {
			for( y = 0; y < data[ x ].length; y++ ) {
				if( data[ x ][ y ] !== E.EMPTY ) {
					this._ctx.fillStyle = COLORS[ data[ x ][ y ] ];
					this._ctx.fillRect( x, y, 1, 1 );
				}
			}
		}
	}
}