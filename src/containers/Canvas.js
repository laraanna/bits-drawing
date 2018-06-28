import React, { PureComponent } from 'react'
// import CanvasDraw from "react-canvas-draw";
import classNames from "../App.css";
import SaveButton from "../components/SaveButton"
import fetchStatues from "../actions/statues/fetch";
import './Canvas.css'
import Gallary from "./Gallary"
import cursor from'../pencil.png';
import MediaQuery from 'react-responsive';

import CanvasDraw from "./Type"

import { connect } from "react-redux";



const data1 = [
  { name: 'one' },
  { name: 'two' },
  { name: 'three' },
  { name: 'four' },
	{ name: 'five' }
];


const colors = ["#EFE9ED", "#E8AF9F", "#C34537", "#A0985F", "#718A9A"]

const breakpoints = {
		desktop: 1040,
		tablet: 840,
		mobile: 540
	};


class Canvas extends PureComponent {
	constructor(props){
    super(props);

    this.state = {
       color : "#C34537",
			 brushSize : 1.5,
			 width: 550,
			 height: 500,
			 url: '',
    };
  }

	componentDidMount = () => {


	}




	// handleChange = (event) => {
	// 	  this.setState({brushSize: event.target.value});
	// }

	handleUrl = (event) =>  {
		let userStatue = document.querySelectorAll('canvas')[0].toDataURL();

		this.setState({url: userStatue});
		// console.log(this.state.url);
	}


	drawBackground = () => {
		// console.log('hi');
		// let canvas = document.querySelectorAll('canvas')[0]
		//
		//
		// const ctx = canvas.getContext('2d');
		//
		// 	var imageObj1 = new Image();
		// 	imageObj1.src = "https://res.cloudinary.com/laraanna/image/upload/v1529250888/mix/figure.png"
		// 	imageObj1.crossOrigin = "Anonymous";
		// 	imageObj1.onload = function() {
		// 			ctx.drawImage(imageObj1,0,0, 500, 400);
		// }
	}

  render() {
		const {statues} = this.props
    return (
      <div className="Canvas" >
			<MediaQuery query='(max-device-width: 600px)'>
				<CanvasDraw
					style = {{cursor: cursor}}
					ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
					brushColor={this.state.color}
					canvasWidth= "300"
					canvasHeight="250"
					brushSize={this.state.brushSize}
					onChange={this.handleUrl}
				/>
      </MediaQuery>

<MediaQuery query='(min-device-width: 600px)'>
			<CanvasDraw
				style = {{cursor: cursor}}
				ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
				brushColor={this.state.color}
				canvasWidth={this.state.width}
				canvasHeight={this.state.height}
				brushSize={this.state.brushSize}
				onChange={this.handleUrl}
			/>

			</MediaQuery>


			<div className="Colors">
			{data1.map((a, i) =>
				<div
					style={{ backgroundColor: colors[i] }}
					value={colors[i]}
					onClick={()=> {this.setState({ color: colors[i] })}}
					key={i}>
				</div>
			)}
			</div>

			<div className="Toolbox">

			<p>Use your cursor to <b>draw</b> your perfect pair of undies.</p>





			<div className="Actions">
				<div
					onClick={() => {
						this.saveableCanvas.clear();
						this.drawBackground();

					}}
				>
					CLEAR
				</div>
				<div
					onClick={() => {
						this.saveableCanvas.undo();

					}}
				>
					UNDO
				</div>

				<SaveButton url={this.state.url}/>


			</div>

			</div>


			<Gallary />

			</div>
    )
  }
}


const mapStateToProps = ({ statues }) => ({ statues });



const mapDispatchToProps = { fetchStatues: fetchStatues };

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
