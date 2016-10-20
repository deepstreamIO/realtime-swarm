const $ = require( 'jquery' );
const deepstream = require( 'deepstream.io-client-js' );
const ds = deepstream( 'localhost:6020');
const user = 'user/' + ds.getUid();
$(function(){
	function resize() {
		var width = $(window).width();
		$( '.mask' ).width( width );
		$( '.inner' ).width( width * 3 );
		var dpadSize = $( '.d-pad' ).width();
		$( '.d-pad' ).height( dpadSize );
		$( '.d-pad i' ).css( 'font-size', (dpadSize/3) + 'px' );
		$( '.canvas-container' ).width( width * 0.8 ).height( width * 0.6 );
	}

	resize();
	$(window).resize( resize );


	ds.on( 'connectionStateChanged', connectionState => {
		$( '.connection-state' ).text( 'connection-state: ' + connectionState.toLowerCase() );
	});


	ds.record.getRecord( 'control-state' ).whenReady( rec => {
		rec.subscribe( 'current-swarm', swarm => {
			var left;
			if( swarm === 'none' ) {
				left = 0;
			}

			if( swarm === 'ants' ) {
				left = '-100%';
			}

			if( swarm === 'bees' ) {
				left = '-200%';
			}
			$( '.inner' ).css( 'left', left );
		}, true );
	});

	window.ds = ds;


	function bindKey( rec, selector, path ) {
		$( selector ).on( 'mousedown, touchstart', () => {
			rec.set( path, true );
		}).on( 'mouseup, touchend', () => {
			rec.set( path, false );
		});
	}

	ds.login( null, success => {
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


	//type select
	var drawType = $( '.select-type li.selected' ).data( 'type' );
	$( '.select-type li' ).on( 'click touchstart', ( e ) => {
		e.preventDefault();
		$( '.select-type li.selected' ).removeClass( 'selected' );
		$( e.target ).addClass( 'selected' );
		drawType = $( e.target ).data( 'type' );
	});

	//drawing canvas
	var touching = false;
	var canvasContainer = $('.canvas-container');
	var canvasWidth = null;
	var canvasHeight = null;
	var canvasLeft = null;
	var canvasTop = null;

	$('.canvas-container').on( 'mousedown touchstart', ( e ) => {
		e.preventDefault();
		canvasWidth = canvasContainer.width();
		canvasHeight = canvasContainer.height();
		canvasLeft = canvasContainer.offset().left;
		canvasTop = canvasContainer.offset().top;
		touching = true;
	}).on( 'mouseup touchend', ( e ) => {
		e.preventDefault();
		touching = false;
	}).on( 'mousemove touchmove', ( e ) => {
		e.preventDefault();
		var x,y;

		if( touching ) {
			if( e.touches && e.touches[ 0 ] ) {
				x = Math.floor( 200 * ( ( e.touches[ 0 ].clientX - canvasLeft) / canvasWidth) );
				y = Math.floor( 150 * ( ( e.touches[ 0 ].clientY - canvasTop) / canvasHeight) );
			}
			
			ds.event.emit( 'ant-draw', {
				x: x,
				y: y,
				user: user,
				type: drawType
			});
		}
	})

});