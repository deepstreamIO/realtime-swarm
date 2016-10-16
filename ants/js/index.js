const World = require( './world' );
const Renderer = require( './canvas-2d-renderer' );

const WIDTH = 200;
const HEIGHT = 150;
const world = new World({
    width: WIDTH,
    height: HEIGHT,
    maxAnts: 150,
    antHill: { x: 60, y: 60 }
});
const renderer = new Renderer( WIDTH, HEIGHT, 4 );

function tick() {
    world.update();
    renderer.render( world.data );
    requestAnimationFrame( tick );
}

window.onload = function() {
    document.body.appendChild( renderer.element );
    tick();
}