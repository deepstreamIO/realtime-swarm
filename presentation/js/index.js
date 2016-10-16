
window.onload = function() {
	impress().init();

	var rootElement = document.getElementById( "impress" );
	rootElement.addEventListener( "impress:stepenter", function() {
		var currentStep = document.querySelector( ".present" );
		if( currentStep.id === 'swarm-a' ) {
			document.querySelector( '.swarm-a' ).style.display = 'block';
		}
	});
}
