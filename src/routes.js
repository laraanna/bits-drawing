import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ThankYou from './containers/ThankYou'
import MainCanvas from './containers/MainCanvas'
import Gallary from './containers/Gallary'



export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={MainCanvas} />
				<Route path="/thankyou" component={ThankYou} />
      </div>
    )
  }
}
