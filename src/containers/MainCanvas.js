import React, { Component } from 'react';
import {fabric} from 'fabric'
import PropTypes from 'prop-types'
import SaveButton from "../components/SaveButton"
import createStatue from "../actions/statues/create";
import { connect } from "react-redux";
import MediaQuery from 'react-responsive';
import { push } from 'react-router-redux'
import './Canvas.css'


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

class MainCanvas extends Component {
	constructor(props){
    super(props);

    this.state = {
			 url: '',
			 color : "#C34537",
    };
  }
	static propTypes = {

  }

	componentDidMount = () =>{
		console.log(this.props.avatarImage);

			let image = new Image()
			image.crossOrigin = "Anonymous";

			 // Make a New Canvas
			 let canvas = this.the_canvas = new fabric.Canvas('main-canvas', {
					 // width:550,
					 // height:500,
			 });

			canvas.isDrawingMode = true;
			canvas.freeDrawingCursor = this.state.color

			canvas.freeDrawingBrush.color = this.state.color


			 image.src = "https://res.cloudinary.com/laraanna/image/upload/v1529250888/mix/figure.png"


			 let center = canvas.getCenter();
			 let mq = window.matchMedia("screen and (min-width: 600px)");

			 if (mq.matches) {
				 image.onload = function(){
				 	canvas.setBackgroundImage(new fabric.Image(image,{
		        scaleX:0.2,
		        scaleY:0.2,
						top: center.top,
			 			left: center.left,
		        originX: 'center',
		        originY: 'center'
					}),canvas.renderAll.bind(canvas));
				}
			} else {
				image.onload = function(){
				 canvas.setBackgroundImage(new fabric.Image(image,{
					 scaleX:0.15,
					 scaleY:0.15,
					 top: center.top,
					 left: center.left,
					 originX: 'center',
					 originY: 'center'
				 }),canvas.renderAll.bind(canvas));
			 }
			}



			canvas.on('object:added',this.handleUrl)

	 }


	 handleUrl = () =>  {

		let userStatue = document.getElementById('main-canvas').toDataURL();

 		this.setState({url: userStatue});
		// console.log(this.state.url);
		console.log('hi');

		// this.the_canvas.freeDrawingBrush.color = this.state.color

 	}

		undo = () =>{
			let h = []
						if(this.the_canvas._objects.length>0){
			 h.push(this.the_canvas._objects.pop());
			 this.the_canvas.requestRenderAll();
			}

		}

		clear = () => {
			this.the_canvas.remove(...this.the_canvas.getObjects().concat())
		}

		changeColor = (a) => {
			this.the_canvas.freeDrawingBrush.color = this.value;
		}

		save = () => {
			let statueImage = document.getElementById('main-canvas').toDataURL();
			this.props.createStatue({url: statueImage});
			console.log('save');
			this.props.push('/thankyou')

		}


		render() {
		    return(
		      <div className="Canvas">
					<div className="Header"></div>

					<MediaQuery query='(min-device-width: 600px)'>
						<canvas width="400" height="350" id= 'main-canvas'> </canvas>
					</MediaQuery>

					<MediaQuery query='(max-device-width: 600px)'>
						<canvas width="280" height="300" id= 'main-canvas'> </canvas>
					</MediaQuery>

					<div className="Colors">
					{data1.map((a, i) =>
						<div
							style={{ backgroundColor: colors[i] }}
							value={colors[i]}
							onClick={()=> this.the_canvas.freeDrawingBrush.color = colors[i] }
							key={i}>
						</div>
					)}
					</div>


					<div className="Toolbox">

					<p>Use your cursor to <b>draw</b> your perfect pair of undies.</p>

					<div className="Actions">
						<div onClick={this.clear}>CLEAR</div>
						<div onClick={this.undo}>UNDO</div>
						<div onClick={this.save}>SAVE</div>
					</div>

					</div>







		      </div>
		    )
		 }
}

const mapDispatchToProps = { createStatue: createStatue, push };

export default connect(null, mapDispatchToProps)(MainCanvas);
