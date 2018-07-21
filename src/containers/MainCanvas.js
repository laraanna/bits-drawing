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
			 windowWidth: window.innerWidth,
    };
  }


	getInitialState() {
    return {windowWidth: window.innerWidth};
  }



	handleResize(e) {
    // this.setState({windowWidth: window.innerWidth});
		console.log('hi');
		window.location.reload();
  }

	componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

	componentDidMount = () =>{



		console.log(this.props.avatarImage);
		let width = 550;
	  let height = 450;
	  let scaleFactor = 1;
		let backgroundScale = 0.22;
		let bgScaleFactor = 1.19;







			let imageDesktop = new Image()
			imageDesktop.crossOrigin = "Anonymous";

			let imageMobile = new Image()
			imageMobile.crossOrigin = "Anonymous";

			 // Make a New Canvas
			 let canvas = this.the_canvas = new fabric.Canvas('main-canvas', {


			 });



			canvas.isDrawingMode = true;
			canvas.freeDrawingCursor = this.state.color

			canvas.freeDrawingBrush.color = this.state.color
			canvas.freeDrawingBrush.width= 2.5


			imageDesktop.src = "https://res.cloudinary.com/laraanna/image/upload/v1529250888/mix/figure.png"
			imageMobile.src = "https://res.cloudinary.com/laraanna/image/upload/v1530456127/Bits_Artwork.jpg"


			 // let center = canvas.getCenter();
			 let mq = window.matchMedia("screen and (max-width: 500px)");
			 let mqBigScreen = window.matchMedia("screen and (min-width: 1824px) and (max-width: 1920px)");
			 let mqXBigScreen = window.matchMedia("screen and (min-width: 1921px) ");
			 let mqMiddle = window.matchMedia("screen and (min-width: 1600px) and (max-width: 1824px)");
			 let mqTablet = window.matchMedia("screen and (min-width: 500px) and (max-width: 1100px)");

			 if (!mq.matches) {
				 window.addEventListener('resize', this.handleResize);
			 }

			 if(mqTablet.matches) {
	 				 scaleFactor = 1;
	 		} else if (mqBigScreen.matches) {
	 				 scaleFactor = 1.5;
					 bgScaleFactor = 1.5;
	 		} else if (mqXBigScreen.matches) {
	 				 scaleFactor = 1.95;
					 bgScaleFactor = 1.95;
			}  else if (mqMiddle.matches) {
	 				 scaleFactor = 1.2;
					 bgScaleFactor = 1.2;
			}

	 		width = width * scaleFactor;
	 	 	height = height * scaleFactor;
		 	backgroundScale = backgroundScale * bgScaleFactor




			 if (mq.matches){
				 console.log('here');

				canvas.setWidth("220")
				canvas.setHeight("850")

 				let text = document.getElementsByClassName('Toolbox')[0]
 				let header = document.getElementsByClassName('Header')[0]
 				let colors = document.getElementsByClassName('Colors')[0]
				let center = canvas.getCenter();

 				this.insertAfter(header,text)
 				this.insertAfter(text,colors)

 				imageMobile.onload = function(){
 				 canvas.setBackgroundImage(new fabric.Image(imageMobile,{
 					 scaleX:0.235,
 					 scaleY:0.235,
 					 top: center.top,
 					 left: center.left,
 					 originX: 'center',
 					 originY: 'center'
 				 }),canvas.renderAll.bind(canvas));
 			 }
 		 } else {


			 canvas.setHeight(height);
			 canvas.setWidth(width);


				let center = canvas.getCenter();


 			imageDesktop.onload = function(){
 			 canvas.setBackgroundImage(new fabric.Image(imageDesktop,{
 				 scaleX:backgroundScale,
 				 scaleY:backgroundScale,
 				 top: center.top,
 				 left: center.left,
 				 originX: 'center',
 				 originY: 'center'
 			 }),canvas.renderAll.bind(canvas));
 		 }

	 	}





			canvas.on('object:added',this.handleUrl)


	 }



	 insertAfter = (referenceNode, newNode) => {
		 referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

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
					<div className="Icon"></div>

					<div className="Header"></div>




					<canvas  id= 'main-canvas' > </canvas>




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



					<MediaQuery query='(min-device-width: 600px)'>

					<p className="instruction-text">Use your cursor to <b>draw</b> the perfect pair of undies.<br/><span>Hit save to submit.</span></p>
					</MediaQuery>

					<MediaQuery query='(max-device-width: 600px)'>
					<p className="instruction-text">Use your fingertip to <b>draw</b> the perfect pair of undies.<br/><span>Hit save to submit.</span></p>
					</MediaQuery>

					<a href="http://www.instagram.com/bitsbodywear" target="_blank"><div className="instaMain"></div></a>

					<div className="Actions">
						<div onClick={this.clear}><p>CLEAR</p></div>
						<div onClick={this.undo}><p>UNDO</p></div>
						<div onClick={this.save}><p>SAVE</p></div>
					</div>



					</div>











		      </div>

		    )
		 }
}

const mapDispatchToProps = { createStatue: createStatue, push };

export default connect(null, mapDispatchToProps)(MainCanvas);
