import React, { Component } from 'react';
import "../App.css";

class Tester extends Component {
	constructor(props) {
		super(props);

		this.projects = props.projects;
	}

	render() {
		return (
			<section className="flashcard-section p-3 p-lg-5 d-flex justify-content-center" id="projects">
				<div className="w-100">
					<h2 className="mb-5">Projects</h2>
					{this.projects.map((project, index) => (
						<div
							key={index}
							className="flashcard-item d-flex flex-column flex-md-row justify-content-between mb-5"
						>
							<div className="flashcard-content">
								<a href={project.link}>
									<h3 className="mb-0">{project.title}</h3>
								</a>
								<img
									className="images"
									src={project.image}
									alt={project.title}
								/>
								<p>{project.point1}</p>
								<p>{project.point2}</p>
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}
}

export default Tester;
