import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pickUp } from '../actions/index'
import './Man.css'
const R = require('ramda')

const mapDispatchToProps = dispatch => {
  return {
    pickUp: data => dispatch(pickUp(data))
  }
}

class Men extends Component {
  handleClick = event => {
    event.stopPropagation()
    this.props.pickUp(`${event.target.parentElement.dataset.key}`)
  }

  render() {
    const className = (this.props.selected)
      ? 'man selected'
      : 'man'

    return (
      <section className={className}
        data-directions={JSON.stringify(this.props.directions)}
        data-color={this.props.color}
        style={{ backgroundColor: this.props.color }}
        onClick={this.handleClick}>
          {this.props.isKing ? '♔' : ''}
      </section>
    )
  }
}

export default connect(null, mapDispatchToProps)(Men)
