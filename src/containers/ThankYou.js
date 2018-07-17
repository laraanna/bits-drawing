import React, { Component } from 'react';
import './ThankYou.css'
import { push } from 'react-router-redux'
import { connect } from "react-redux";


class ThankYou extends Component {
	goBack = () => {

		this.props.push('/')

	}

  render() {
    return (
      <div className="ThankYou">
				<div className="wrapper">
					<img src="https://res.cloudinary.com/laraanna/image/upload/v1530458969/JakeCat2.gif" alt="cat" />
					<p>Thank you!</p>
					<div onClick={this.goBack}><p>Try Again!</p></div>
				</div>
      </div>
    );
  }
}

const mapDispatchToProps = {  push };

export default connect(null, mapDispatchToProps)(ThankYou);
