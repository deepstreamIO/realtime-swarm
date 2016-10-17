var BeeSwarm = require( '../../bees/js/' );

window.onload = function() {
	var slides = document.querySelectorAll( '.slide' );
	for( var i = 0; i < slides.length; i++ ) {
		slides[ i ].setAttribute( 'data-y', 2000 * i );
	}

	impress().init();
	var beeSwarmContainer = document.querySelector( '.swarm-b' );
	var beeSwarm = new BeeSwarm( beeSwarmContainer, 1000, 600 );
//	beeSwarm.start();
	var rootElement = document.getElementById( "impress" );
	rootElement.addEventListener( "impress:stepenter", function() {
		var currentStep = document.querySelector( ".present" );
		if( currentStep.id === 'swarm-a' ) {
			document.querySelector( '.swarm-a' ).style.display = 'block';
		}
	});
}
