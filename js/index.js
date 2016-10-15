const Swarm = require( './swarm' );
const LeaderBoids = require( './leader-boids' );
const Renderer = require( './renderer/canvas-2d-renderer' );

const width = 800;
const height = 600;
const leaders = new LeaderBoids();
const swarm = new Swarm( width, height, leaders );
const renderer = new Renderer( width, height );

function tick() {
	leaders.update();
	swarm.update();
	renderer.clear();
	renderer.renderBoids( swarm.boids );
	renderer.renderLeaderBoids( leaders.boids );
	requestAnimationFrame( tick );
}

window.onload = function() {
	document.body.appendChild( renderer.element );
	tick();
}