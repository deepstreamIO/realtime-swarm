const deepstream = require( 'deepstream.io-client-js' );
const ds = deepstream( 'localhost:6020' ).login();
const colors = [
	'#393939',
	'#515151',
	'#747369',
	'#a09f93',
	'#d3d0c8',
	'#e8e6df',
	'#f2f0ec',
	'#f2777a',
	'#f99157',
	'#ffcc66',
	'#99cc99',
	'#66cccc',
	'#6699cc',
	'#cc99cc',
	'#d27b53'
];

module.exports = class LeaderBoids{
	constructor( width, height ) {
		this._width = width;
		this._height = height;
		this._users = {};

		this.boids = [];
		ds.record.listen( 'user/*', this._onUser.bind( this ) );
	}

	update() {

	}

	_onUser( user, isSubscribed, response ) {
		if( isSubscribed ) {
			response.accept();
			var record = ds.record.getRecord( user );
			var color = this._getColor();
			this._users[ user ] = {
				record: record,
				boid:[
					Math.random() * this._width,
					Math.random() * this._height,
					50, //attraction radius
					0.1
				]
			};

			record.set( 'color', color );
		}
	}

	_getColor() {
		var index = Math.floor( Math.random() * colors );
		return colors.splice( index, 1 )[ 0 ];
	}
}