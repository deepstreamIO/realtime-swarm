const EventEmitter = require( 'events' ).EventEmitter;

module.exports = class World extends EventEmitter{
	constructor() {
		super();
		this.agents = [];
	}

	addAgent( agent ) {
		agent.setWorld( this );
		this.agents.push( agent );
	}

	update() {
		var avgPos = this.getAvgPosition();
		for( var i = 0; i < this.agents.length; i++ ) {
			this.agents[ i ].update( avgPos );
		}
	}

	getAvgPosOfClosestAgents( srcAgent, num ) {
		var closestAgents = [];
		var a, b, i;
		var minDistance = Infinity;
		var minAgent;
		var xSum = 0;
		var ySum = 0;

		for( i = 0; i < this.agents.length; i++ ) {
			a = Math.max( srcAgent.x, this.agents[ i ].x ) - Math.min( srcAgent.x, this.agents[ i ].x );
			b = Math.max( srcAgent.y, this.agents[ i ].y ) - Math.min( srcAgent.y, this.agents[ i ].y );
			this.agents[ i ].distance = Math.sqrt( a * a + b * b );
		}

		while( closestAgents.length < num ) {
			minDistance = Infinity;
			minAgent = null;
			for( i = 0; i < this.agents.length; i++ ) {
				if( this.agents[ i ].distance < minDistance && closestAgents.indexOf( this.agents[ i ] ) === -1 ) {
					minAgent = this.agents[ i ];
					minDistance = this.agents[ i ].distance;
				}
			}
			closestAgents.push( minAgent );
		}

		for( i = 0; i < closestAgents.length; i++ ) {
			xSum += closestAgents[ i ].x;
			ySum += closestAgents[ i ].y;
		}

		return {
			x: xSum / closestAgents.length,
			y: ySum / closestAgents.length
		}
	}

	getAvgPosition() {
		var xSum = 0;
		var ySum = 0;
		var i = 0;

		for( i; i < this.agents.length; i++ ) {
			xSum += this.agents[ i ].x;
			ySum += this.agents[ i ].y;
		}

		return {
			x: xSum / this.agents.length,
			y: ySum / this.agents.length
		}
	}
}