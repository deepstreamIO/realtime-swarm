var BeeSwarm = require( '../../bees/js/' );

window.onload = function() {
	impress().init();
	var beeSwarmContainer = document.querySelector( '.swarm-b' );
	var beeSwarm = new BeeSwarm( beeSwarmContainer, 1000, 600 );
	beeSwarm.start();
	var rootElement = document.getElementById( "impress" );
	rootElement.addEventListener( "impress:stepenter", function() {
		var currentStep = document.querySelector( ".present" );
		if( currentStep.id === 'swarm-a' ) {
			document.querySelector( '.swarm-a' ).style.display = 'block';
		}
	});
}
