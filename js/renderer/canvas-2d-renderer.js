module.exports = class Canvas2DRenderer{
	constructor( world, width, height ) {
		this._world = world;
		this._width = width;
		this._height = height;
		this.element = document.createElement( 'canvas' );
		this.element.width = width;
		this.element.height = height;
		this.ctx = this.element.getContext( '2d' );
		this.ctx.fillStyle = '#fff';
	}

	render() {
		this.ctx.clearRect( 0, 0, this._width, this._height );
		this._world.agents.forEach( this._renderAgent.bind( this ) );
	}

	_renderAgent( agent ) {
		this.ctx.fillRect( agent.x - 1, agent.y - 1, 2, 2 );
	}
}