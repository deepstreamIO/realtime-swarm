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
		for( var i = 0; i < this.agents.length; i++ ) {
			this.agents[ i ].update();
		}
	}

	getClosestAgent( srcAgent ) {
		var minDistance = Infinity;
		var i, a, b, c, closestAgent;

		for( i = 0; i < this.agents.length; i++ ) {
			a = Math.max( srcAgent.x, this.agents[ i ].x ) - Math.min( srcAgent.x, this.agents[ i ].x );
			b = Math.max( srcAgent.y, this.agents[ i ].y ) - Math.min( srcAgent.y, this.agents[ i ].y );
			c = Math.sqrt( a * a + b * b );

			if( c < minDistance && srcAgent !== this.agents[ i ] ) {
				minDistance = c;
				closestAgent = this.agents[ i ];
			}
		}

		return closestAgent;
	}

	// getAngleOfSwarm( srcAgent ) {
	// 	var PI_2 = Math.PI * 2;
	// 	var SEGMENTS = 16;
	// 	var scores = [];
	// 	var maxDistance = 0;
	// 	var i, a, b, c, alpha, metrics = [];
	// 	for( i = 0; i < SEGMENTS; i++ ) {
	// 		scores.push( 0 );
	// 	}
	// 	for( i = 0; i < this.agents.length; i++ ) {
	// 		if( this.agents[ i ] === srcAgent ) {
	// 			continue;
	// 		}
	// 		a = Math.max( srcAgent.x, this.agents[ i ].x ) - Math.min( srcAgent.x, this.agents[ i ].x );
	// 		b = Math.max( srcAgent.y, this.agents[ i ].y ) - Math.min( srcAgent.y, this.agents[ i ].y );
	// 		c = Math.sqrt( a * a + b * b );
	// 		alpha = Math.PI / 2 + Math.atan2( this.agents[ i ].y - srcAgent.y, this.agents[ i ].x - srcAgent.x );
	// 		maxDistance = Math.max( c, maxDistance );
	// 		metrics.push({ alpha: alpha, distance: c });
	// 	}

	// 	for( i = 0; i < metrics.length; i++ ) {
	// 		scores[ Math.floor( metrics[ i ].alpha / ( PI_2 / SEGMENTS ) ) ] += 1 - ( metrics[ i ].distance / maxDistance );
	// 	}

	// 	var highScore = 0;
	// 	var highScoreIndex = null;
	// 	for( i = 0; i < scores.length; i++ ) {
	// 		if( scores[ i ]> highScore ) {
	// 			highScore = scores[ i ];
	// 			highScoreIndex = i;
	// 		}
	// 	}
	// 	return ( PI_2 / SEGMENTS ) * highScoreIndex;
	// }
	//
	//
	//x = y = 0
// foreach angle {
//     x += cos(angle)
//     y += sin(angle)
// }
// average_angle = atan2(y, x)
	getAngleOfSwarm( srcAgent ) {
		var PI_2 = Math.PI * 2;
		var SEGMENTS = 16;
		var scores = [];
		var maxDistance = 0;
		var x = 0;
		var y = 0;
		var i, a, b, c, alpha, metrics = [];
		for( i = 0; i < SEGMENTS; i++ ) {
			scores.push( 0 );
		}
		for( i = 0; i < this.agents.length; i++ ) {
			if( this.agents[ i ] === srcAgent ) {
				continue;
			}
			a = Math.max( srcAgent.x, this.agents[ i ].x ) - Math.min( srcAgent.x, this.agents[ i ].x );
			b = Math.max( srcAgent.y, this.agents[ i ].y ) - Math.min( srcAgent.y, this.agents[ i ].y );
			c = Math.sqrt( a * a + b * b );
			alpha = Math.PI / 2 + Math.atan2( this.agents[ i ].y - srcAgent.y, this.agents[ i ].x - srcAgent.x );
			x += Math.cos( alpha );
			y += Math.sin( alpha );
			maxDistance = Math.max( c, maxDistance );
			metrics.push({ alpha: alpha, distance: c });
		}

		return Math.atan2( y, x);
		for( i = 0; i < metrics.length; i++ ) {
			scores[ Math.floor( metrics[ i ].alpha / ( PI_2 / SEGMENTS ) ) ] += 1 - ( metrics[ i ].distance / maxDistance );
		}

		var highScore = 0;
		var highScoreIndex = null;
		for( i = 0; i < scores.length; i++ ) {
			if( scores[ i ]> highScore ) {
				highScore = scores[ i ];
				highScoreIndex = i;
			}
		}
		return ( PI_2 / SEGMENTS ) * highScoreIndex;
	}
}