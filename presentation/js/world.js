const E = require( './enums' );
const Ant = require( './ant' );

module.exports = class World{

	constructor( settings ) {
		this.settings = settings;
		this.ants = [];
	}

	update() {
		if( this.ants.length < this.settings.maxAnts ) {
			this.ants.push( new Ant( this ) );
		}

		this.data = this._generateData();
		this.data[ this.settings.antHill.x ][ this.settings.antHill.y ] = E.ANT_HILL;

		for( var i = 0; i < this.ants.length; i++ ) {
			this.ants[ i ].update();
			this.data[ this.ants[ i ].x ][ this.ants[ i ].y ] = E.ANT;
		}


	}

	_generateData() {
		var data = [];
		var column, row;

		for( column = 0; column < this.settings.width; column++ ) {
			data[ column ] = [];

			for( row = 0; row < this.settings.height; row++ ) {
				data[ column ][ row ]= E.EMPTY;
			}
		}

		return data;
	}
}