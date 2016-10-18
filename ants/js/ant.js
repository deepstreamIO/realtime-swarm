const E = require( './enums' );
const ALLOWED_FIELDS = {};

ALLOWED_FIELDS[ E.EMPTY ] = true;
ALLOWED_FIELDS[ E.FOOD ] = true;
ALLOWED_FIELDS[ E.ANT_HILL ] = true;
ALLOWED_FIELDS[ E.PHEROMONE ] = true;

module.exports = class Ant{
	constructor( world ) {
		this.world = world;
		this.x = world.settings.antHill.x;
		this.y = world.settings.antHill.y;
		this.hasFood = false;
	}

	update() {
		if( this.world.dataLayer[ this.x ][ this.y ].type === E.FOOD && this.hasFood === false ) {
			this._takeFood();
		}

		var possibleMoves = [
			{ x: this.x, y: this.y - 1 },
			{ x: this.x, y: this.y + 1 },
			{ x: this.x - 1, y: this.y },
			{ x: this.x + 1, y: this.y }
		];

		var antHill = this.world.settings.antHill;

		// Ants that reach the anthill drop their food
		if( this.hasFood && this.x === antHill.x && this.y === antHill.y ) {
			this.hasFood = false;
		}

		if( this.hasFood ) {

			// Ants that carry food are more likely to move towards the ant hill
			var moveTowardsAntHill = {
				x: antHill.x > this.x ? this.x + 1 : this.x - 1,
				y: antHill.y > this.y ? this.y + 1 : this.y - 1,
			}
			possibleMoves.push( moveTowardsAntHill );
			possibleMoves.push( moveTowardsAntHill );

			this.world.dataLayer[ this.x ][ this.y ] = { type: E.PHEROMONE, strength: E.MAX_PHEROMONE };
			this.world.data[ this.x ][ this.y ] = E.PHEROMONE;
		}



		var allowedMoves = [], i, move;

		for( i = 0; i < possibleMoves.length; i++ ) {
			move = possibleMoves[ i ];
			if(
				this.world.data[ move.x ] !== undefined &&
				this.world.data[ move.x ][ move.y ] !== undefined &&
				ALLOWED_FIELDS[ this.world.data[ move.x ][ move.y ] ] !== undefined
			) {
				allowedMoves.push( move );

				// ants that do not carry food are likely to follow pheromone trails
				if( !this.hasFood && this.world.data[ move.x ][ move.y ] === E.PHEROMONE ) {
					allowedMoves.push( move );
					allowedMoves.push( move );
				}
			}
		}

		move = allowedMoves[ Math.floor( Math.random() * allowedMoves.length ) ];

		if( !move ) {
			return;
		}
		this.x = move.x;
		this.y = move.y;
	}

	_takeFood() {
		this.world.dataLayer[ this.x ][ this.y ].strength--;

		if( this.world.dataLayer[ this.x ][ this.y ].strength === 0 ) {
			this.world.dataLayer[ this.x ][ this.y ] = E.EMPTY;
			this.world.data[ this.x ][ this.y ] = E.EMPTY;
		}

		this.hasFood = true;
	}
}