const E = require( './enums' );
const Ant = require( './ant' );

module.exports = class World{

	constructor( settings ) {
		this.settings = settings;
		this.ants = [];
		this.data = null;
		this.dataLayer = this._generateData( true );
		this.settings.ds.event.subscribe( 'ant-draw', this._onDraw.bind( this ) );
	//	this._addBlock( { type: E.OBSTACLE, strength: 1 }, 20, 20, 120, 22 );
	//	this._addBlock( { type: E.OBSTACLE, strength: 1 }, 20, 20, 22, 120 );
	//	this._addBlock( { type: E.FOOD, strength: E.MAX_FOOD }, 80, 80, 85, 85 );
	}

	update() {
		if( this.ants.length < this.settings.maxAnts ) {
			this.ants.push( new Ant( this ) );
		}

		this.data = this._generateData();
		this.data[ this.settings.antHill.x ][ this.settings.antHill.y ] = E.ANT_HILL;

		for( var i = 0; i < this.ants.length; i++ ) {
			this.ants[ i ].update();
			this.data[ this.ants[ i ].x ][ this.ants[ i ].y ] =  this.ants[ i ].hasFood ? E.ANT_WITH_FOOD : E.ANT;
		}
	}

	_onDraw( e ) {
		if( e.x < 0 || e.x > 199 || e.y < 0 || e.y > 149 ) {
			return;
		}

		this.data[ e.x ][ e.y ] = e.type;

		if( e.type === E.FOOD ) {
			this.dataLayer[ e.x ][ e.y ] = { type: E.FOOD, strength: E.MAX_FOOD };
		}

		else if( e.type === E.OBSTACLE ) {
			this.dataLayer[ e.x ][ e.y ] = { type: E.OBSTACLE, strength: 1 };
		}

		else if( e.type === E.EMPTY ) {
			this.dataLayer[ e.x ][ e.y ] = E.EMPTY;
		}
	}

	_addBlock( entry, x1, y1, x2, y2 ) {
		for( var x = x1; x < x2; x++ ) {
			for( var y = y1; y < y2; y++ ) {
				this.dataLayer[ x ][ y ] = JSON.parse( JSON.stringify( entry ) );
			}
		}
	}

	_generateData( empty ) {
		var data = [];
		var column, row;

		for( column = 0; column < this.settings.width; column++ ) {
			data[ column ] = [];

			for( row = 0; row < this.settings.height; row++ ) {
				if( empty || !this.dataLayer[ column ][ row ] ) {
					data[ column ][ row ] = E.EMPTY;
				} else {
					data[ column ][ row ] = this.dataLayer[ column ][ row ].type;

					// pheromone fades over time
					if( this.dataLayer[ column ][ row ].type === E.PHEROMONE ) {
						this.dataLayer[ column ][ row ].strength--;

						if( this.dataLayer[ column ][ row ].strength === 0 ) {
							this.dataLayer[ column ][ row ] = E.EMPTY;
							this.data[ column ][ row ] = E.EMPTY;
						}
					}
				}
			}
		}

		return data;
	}
}