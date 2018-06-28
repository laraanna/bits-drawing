import React, { Component } from 'react';
import {fabric} from 'fabric'
import PropTypes from 'prop-types'
import SaveButton from "../components/SaveButton"
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
					 height:500,
					 width:550,
			 });

			canvas.isDrawingMode = true;
			canvas.freeDrawingCursor = this.state.color

			canvas.freeDrawingBrush.color = this.state.color


			 image.src = "https://res.cloudinary.com/laraanna/image/upload/v1529250888/mix/figure.png"


			 let center = canvas.getCenter();
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


			canvas.on('object:added',this.handleUrl)

	 }



	 handleUrl = () =>  {

		let userStatue = document.getElementById('main-canvas').toDataURL();

 		this.setState({url: userStatue});

		this.the_canvas.freeDrawingBrush.color = this.state.color
		this.the_canvas.requestRenderAll();

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


		render() {
		    return(
		      <div className="Canvas">
					<canvas id= 'main-canvas'> </canvas>

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
						<SaveButton url={this.state.url}/>
					</div>

					</div>





		      </div>
		    )
		 }
}
export default MainCanvas
