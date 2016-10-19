const BeeSwarm = require( '../../bees/js/' );
const AntSwarm = require( '../../ants/js/ant-swarm' );
const deepstream = require( 'deepstream.io-client-js' );
const ds = deepstream( 'localhost:6020' ).login();

window.onload = function() {
	var slides = document.querySelectorAll( '.slide' );
	for( var i = 0; i < slides.length; i++ ) {
		slides[ i ].setAttribute( 'data-y', 2000 * i );
	}

	impress().init();
	var antSwarmContainer = document.querySelector( '.swarm-a' );
	var antSwarm = new AntSwarm( ds, antSwarmContainer );
//	antSwarm.start();
	var beeSwarmContainer = document.querySelector( '.swarm-b' );
	var beeSwarm = new BeeSwarm( ds, beeSwarmContainer, 1000, 600 );

//	beeSwarm.start();
//	
//	
	var rootElement = document.getElementById( "impress" );
	rootElement.addEventListener( "impress:stepenter", function() {
		var currentStep = document.querySelector( ".present" );
		if( currentStep.id === 'swarm-a' ) {
			document.querySelector( '.swarm-a' ).style.display = 'block';
			antSwarm.start();
		}
	});
}
