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
	var currentSwarm = null;

	var controlRec = ds.record.getRecord( 'control-state' );
	rootElement.addEventListener( "impress:stepenter", function() {
		var currentStep = document.querySelector( ".present" );
		if( currentStep.dataset.swarm !== currentSwarm ) {
			currentSwarm = currentStep.dataset.swarm;

			if( currentSwarm === 'bees' ) {
				document.querySelector( '.bees' ).style.display = 'block';
				document.querySelector( '.ants' ).style.display = 'none';
				antSwarm.stop();
				beeSwarm.start();
				controlRec.set( 'current-swarm', 'bees' );
			}


			else if( currentSwarm === 'ants' ) {
				document.querySelector( '.bees' ).style.display = 'none';
				document.querySelector( '.ants' ).style.display = 'block';
				antSwarm.start();
				beeSwarm.stop();

				controlRec.set( 'current-swarm', 'ants' );
			}

			else if( !currentSwarm ) {
				document.querySelector( '.bees' ).style.display = 'none';
				document.querySelector( '.ants' ).style.display = 'none';
				antSwarm.stop();
				beeSwarm.stop();

				controlRec.set( 'current-swarm', 'none' );
			}
		}
	});
}
