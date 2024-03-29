import React, { PureComponent } from 'react'
import fetchStatues from "../actions/statues/fetch";
import './Canvas.css'


import { connect } from "react-redux";



class Canvas extends PureComponent {


	componentDidMount = () => {

		this.props.fetchStatues()


	}


	renderStatues = (statue, index) => {

    return (
			<div>
				<img className="Generated-Statue" key={index} src= {statue.url}/>
				<p>{statue._id}</p>
			</div>

		)
  }


  render() {
		const {statues} = this.props
    return (
      <div className="Gallary">


			{statues.map(this.renderStatues)}

			</div>
    )
  }
}


const mapStateToProps = ({ statues }) => ({ statues });

const mapDispatchToProps = { fetchStatues: fetchStatues };

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
