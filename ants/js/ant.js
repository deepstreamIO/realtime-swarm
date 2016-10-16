const E = require( './enums' );
const ALLOWED_FIELDS = {};

ALLOWED_FIELDS[ E.EMPTY ] = true;
ALLOWED_FIELDS[ E.FOOD ] = true;
ALLOWED_FIELDS[ E.ANT_HILL ] = true;

module.exports = class Ant{
	constructor( world ) {
		this.world = world;
		this.x = world.settings.antHill.x;
		this.y = world.settings.antHill.y;
	}

	update() {
		var possibleMoves = [
			{ x: this.x, y: this.y - 1 },
			{ x: this.x, y: this.y + 1 },
			{ x: this.x - 1, y: this.y },
			{ x: this.x + 1, y: this.y }
		];

		var allowedMoves = [], i, move;

		for( i = 0; i < possibleMoves.length; i++ ) {
			move = possibleMoves[ i ];
			if(
				this.world.data[ move.x ] !== undefined &&
				this.world.data[ move.x ][ move.y ] !== undefined &&
				ALLOWED_FIELDS[ this.world.data[ move.x ][ move.y ] ] !== undefined
			) {
				allowedMoves.push( move );
			}
		}

		move = allowedMoves[ Math.floor( Math.random() * allowedMoves.length ) ];
		if( !move ) {
			return;
		}
		this.x = move.x;
		this.y = move.y;
	}
}