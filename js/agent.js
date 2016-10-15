module.exports = class Agent{
	constructor( x, y ) {
		this._world = null;
		this.x = x;
		this.y = y;
		this.speed = 2; //Pixels per tick
		this._randomOffset = 1;
	}

	setWorld( world ) {
		this._world = world;
	}

	update( avgPos ) {
		var avgPos = this._world.getAvgPosOfClosestAgents( this, 3 );
		this.x = avgPos.x > this.x ? this.x + this.speed : this.x - this.speed;
		this.y = avgPos.y > this.y ? this.y + this.speed : this.y - this.speed;
		this.x += ( this._randomOffset * -1 ) + ( this._randomOffset * Math.random() * 2 );
		this.y += ( this._randomOffset * -1 ) + ( this._randomOffset * Math.random() * 2 );
	}
}