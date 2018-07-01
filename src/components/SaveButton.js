// import React, { PureComponent } from "react";
// import PropTypes from 'prop-types'
// import createStatue from "../actions/statues/create";
// import { connect } from "react-redux";
// import './SaveButton.css'
//
//
//
// class SaveButton extends PureComponent {
//   constructor(props) {
//     super(props);
//
//     this.state = {
// 			url: ' ',
//     };
//
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
// 	static propTypes = {
// 		url: PropTypes.string,
//   }
//
//
//   handleUrl = () => {
// 		// let userStatue = document.querySelectorAll('canvas')[0].toDataURL();
// 		let userStatue = document.getElementById('main-canvas').toDataURL();
// 		// this.setState({ url: userStatue  });
//
// 		// console.log(userStatue);
//
//
//   }
//
//   handleSubmit(event) {
//
// 		event.preventDefault();
//
// 		//
// 		this.setState({ url: this.props.url });
//
// 		// console.log(this.state);
// 		//
// 		const statue = {
// 		...this.state
// 		};
//
// 		console.log(this.props.url);
//
//
// 		//
// 		// console.log(this.state);
// 		//
//     // console.table(statue);
//     this.props.createStatue({url: this.props.url});
//
//   }
//
//   render() {
//     return (
//       <div className="SaveButton">
// 				<div onClick={this.handleSubmit.bind(this)}>SAVE</div>
//
//
//       </div>
//     );
//   }
// }
//
//
//
//
// const mapDispatchToProps = { createStatue: createStatue };
//
// export default connect(null, mapDispatchToProps)(SaveButton);
