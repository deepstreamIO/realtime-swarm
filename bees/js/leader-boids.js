module.exports = class LeaderBoids{
	constructor( ds, width, height ) {
		this._ds = ds;
		this._width = width;
		this._height = height;
		this._users = {};

		this.boids = [];
		ds.record.listen( 'user/*', this._onUser.bind( this ) );
	}

	update() {
		var user,
			data,
			boid;

		for( user in this._users ) {
			data = this._users[ user ].record.get();
			boid = this._users[ user ].boid;

			if( data.up ) {
				boid[ 1 ]--;
			}
			if( data.down ) {
				boid[ 1 ]++;
			}
			if( data.left ) {
				boid[ 0 ]--;
			}
			if( data.right ) {
				boid[ 0 ]++;
			}

			boid[ 5 ] = data.highlight;
		}
	}

	_onUser( user, isSubscribed, response ) {
		if( isSubscribed ) {
			response.accept();
			var record = this._ds.record.getRecord( user );
			var color = this._getColor();
			this._users[ user ] = {
				record: record,
				boid:[
					Math.random() * this._width,
					Math.random() * this._height,
					50, //attraction radius
					0.1,
					color,
					false
				]
			};

			record.set( 'color', color );
			this.boids.push( this._users[ user ].boid );
		}
	}

	_getColor() {
		return 'hsl(' + Math.floor( Math.random() * 360 ) + ', 100%, 50%)';
	}
}