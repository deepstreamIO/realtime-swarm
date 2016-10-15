var World = require( './world' );
var Renderer = require( './renderer/canvas-2d-renderer' );
var Agent = require( './agent' );

var width = 800;
var height = 600;
var numberOfAgents = 30;
var world = new World( width, height );
var renderer = new Renderer( world, width, height );

function tick() {
	world.update();
	renderer.render();
	requestAnimationFrame( tick );
}

window.onload = function() {
	for( var i = 0; i < numberOfAgents; i++ ) {
		world.addAgent( new Agent( width * Math.random(), height * Math.random() ) );
	}

	document.body.appendChild( renderer.element );
	tick();
}