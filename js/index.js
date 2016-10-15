var World = require( './world' );
var Renderer = require( './renderer/canvas-2d-renderer' );
var Agent = require( './agent' );

var width = 800;
var height = 600;
var numberOfAgents = 30;

var world = new World( width, height );
var renderer = new Renderer( world, width, height );
var mouseX, mouseY;
renderer.element.onmousemove = function( e ) {
	mouseX = e.layerX;
	mouseY = e.layerY;
}

var boids = require('./boids');
var attractorsA = [400, 300, 50, 0.1];
var flock = boids({
  boids: 300,              // The amount of boids to use
  speedLimit: 1,          // Max steps to take per tick
  accelerationLimit: 0.1,   // Max acceleration per tick
  separationDistance: 10, // Radius at which boids avoid others
  alignmentDistance: 180, // Radius at which boids align with others
  choesionDistance: 180,  // Radius at which boids approach others
  separationForce: 0.2,  // Speed to avoid at
  alignmentForce: 0.2,   // Speed to align with other boids
  choesionForce: 0.1,     // Speed to move towards other boids
  width: width,
  height: height,
  attractors: [ attractorsA ]
})

function tick() {
	//world.update();
	flock.tick();

	attractorsA[ 0 ] = mouseX;
	attractorsA[ 1 ] = mouseY;
	renderer.renderBoids( flock.boids );
	requestAnimationFrame( tick );
}

window.onload = function() {
	for( var i = 0; i < numberOfAgents; i++ ) {
		world.addAgent( new Agent( width * Math.random(), height * Math.random() ) );
	}

	document.body.appendChild( renderer.element );
	tick();
}




// raf(window).on('data', function() {
//   ctx.fillStyle = 'black'
//   ctx.fillRect(0, 0, canvas.width, canvas.height)
//   ctx.fillStyle = 'white'
//   ctx.save()
//   ctx.translate(-canvas.width/2, -canvas.height/2)
//   flock.tick()
//   flock.boids.forEach(function(boid) {
//     ctx.fillRect(boid[0], boid[1], 1, 1)
//   })
//   ctx.restore()
// })