import React, { Component } from 'react'
import axios from 'axios'

export default class PlantList extends Component {
	// add state with a property called "plants" - initialize as an empty array

	// when the component mounts:
	//   - fetch data from the server endpoint - http://localhost:3333/plants
	//   - set the returned plants array to this.state.plants

	/*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/

	constructor() {
		super()
		this.state = {
			plants: [],
			search: '',
		}
	}
	handleSearch = (e) => {
		return this.setState({ search: e.target.value })
	}
	componentDidMount() {
		axios.get(`http://localhost:3333/plants`).then((res) => {
			this.setState({ plants: res.data.plantsData })
			console.log(res)
		})
	}
	render() {
		const filteredPlants = this.state.plants.filter((plant) => {
			return plant.name.toLowerCase().includes(this.state.search)
		})
		//almost done search bar
		return (
			<main className="plant-list">
				<form>
					<h2>Search</h2>
					<label>
						Plant Name:
						<input
							name="plantName"
							// value={values.firstName}
							onChange={this.handleSearch}
						/>
					</label>
				</form>
				{filteredPlants.map((plant) => (
					<div className="plant-card" key={plant.id}>
						<img className="plant-image" src={plant.img} alt={plant.name} />
						<div className="plant-details">
							<h2 className="plant-name">{plant.name}</h2>
							<p className="plant-scientific-name">{plant.scientificName}</p>
							<p>{plant.description}</p>
							<div className="plant-bottom-row">
								<p>${plant.price}</p>
								<p>☀️ {plant.light}</p>
								<p>💦 {plant.watering}x/month</p>
							</div>
							<button
								className="plant-button"
								onClick={() => this.props.addToCart(plant)}
							>
								Add to cart
							</button>
						</div>
					</div>
				))}
			</main>
		)
	}
}
