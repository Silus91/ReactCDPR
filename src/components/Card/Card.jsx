import React, { Component } from 'react';

export class Card extends Component {

	render() {
		return (
			<div className="card">
				<div className="card-content">
					<div>
						<ul className="tabs tabs-fixed-width">
							{this.props.configs.map((config) => {
								return <li className="tab" key={config.id}><a href={`#${config.id}`}>{config.title}</a></li>
							})}
						</ul>
					</div>
					<div>
						{this.props.configs.map((config) => {
							return <div className="container" id={config.id} key={config.id}>{config.body}</div>
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default Card;
