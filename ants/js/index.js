const AntSwarm = require( './ant-swarm' );

window.onload = function() {
	var antSwarm = new AntSwarm( document.body );
	antSwarm.start();
};