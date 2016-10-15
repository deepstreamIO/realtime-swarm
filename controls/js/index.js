const $ = require( 'jquery' );
const deepstream = require( 'deepstream.io-client-js' );

$(function(){
	function resize() {
		var dpadSize = $( '.d-pad' ).width();
		$( '.d-pad' ).height( dpadSize );
		$( '.d-pad i' ).css( 'font-size', (dpadSize/3) + 'px' );
	}

	resize();
	$(window).resize( resize );

	ds = deepstream( 'localhost:6020');

	ds.on( 'connectionStateChanged', connectionState => {
		$( '.connection-state' ).text( connectionState );
	});

	function bindKey( rec, selector, path ) {
		$( selector ).on( 'mousedown, touchstart', () => {
			rec.set( path, true );
		}).on( 'mouseup, touchend', () => {
			rec.set( path, false );
		});
	}

	ds.login( null, success => {
		var user = 'user/' + ds.getUid();
		var rec = ds.record.getRecord( user );

		rec.set({
			left: false,
			right: false,
			up: false,
			down: false,
			highlight: false
		});

		rec.subscribe( 'color', color => {
			$('body, html').css( 'background-color', color );
		});
		bindKey( rec, '.d-pad .up', 'up' );
		bindKey( rec, '.d-pad .down', 'down' );
		bindKey( rec, '.d-pad .left', 'left' );
		bindKey( rec, '.d-pad .right', 'right' );
		bindKey( rec, '.highlight-position', 'highlight' );
	});

});