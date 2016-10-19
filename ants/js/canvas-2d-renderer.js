const E = require( './enums' );
const MAX_FOOD = 5;
const COLORS = [];
COLORS[ E.EMPTY ] = '#CCCCCC';
COLORS[ E.ANT ] = '#FFF';
COLORS[ E.FOOD ] = '#bd2b96';
COLORS[ E.ANT_WITH_FOOD ] = '#bd2b96';
COLORS[ E.OBSTACLE ] = '#bbbbbb';
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

	render( data, dataLayer ) {
		var x, y;

		this._ctx.clearRect( 0, 0, this._width, this._height );

		for( x = 0; x < data.length; x++ ) {
			for( y = 0; y < data[ x ].length; y++ ) {
				if( data[ x ][ y ] !== E.EMPTY ) {
					if( data[ x ][ y ] === E.FOOD ) {
						this._ctx.fillStyle = 'rgba( 255, 0, 255,' + dataLayer[ x ][ y ].strength / E.MAX_FOOD + ')';
					} else if( data[ x ][ y ] === E.PHEROMONE ) {
						this._ctx.fillStyle = 'rgba( 0, 0, 255,' + ( dataLayer[ x ][ y ].strength / E.MAX_PHEROMONE ) * 0.5 + ')';
					} else {
						this._ctx.fillStyle = COLORS[ data[ x ][ y ] ];
					}
					this._ctx.fillRect( x, y, 1, 1 );
				}
			}
		}
	}
}