module.exports = class Agent{
	constructor( x, y ) {
		this._world = null;
		this.x = x;
		this.y = y;
		this.speed = 1; //Pixels per tick
		this._randomOffset = 10;
	}

	setWorld( world ) {
		this._world = world;
	}

	update() {
		// var cA = this._world.getClosestAgent( this );
		//var alpha = Math.PI / 2 + Math.atan2( cA.y - this.y, cA.x - this.x );
		var alpha = this._world.getAngleOfSwarm( this );
		this.x = this.x + Math.sin( alpha ) * this.speed;
		this.y = this.y + Math.cos( alpha ) * this.speed;
		//this.x += (this._randomOffset * -1 ) + ( Math.random() * ( this._randomOffset * 2 ) );
		//this.y += (this._randomOffset * -1 ) + ( Math.random() * ( this._randomOffset * 2 ) );
	}
}