import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putDown } from '../actions/index'
import Man from './Man'
const R = require('ramda')

const mapDispatchToProps = dispatch => {
  return {
    putDown: data => dispatch(putDown(data))
  }
}

class Square extends Component {

  handleClick = ({ target }) => {
    if (target.style.backgroundColor === 'forestgreen')
      this.props.putDown(target.dataset.key)
  }

  render() {
    const man = this.props.man,
      className = (this.props.highlighted === true)
        ? 'square highlighted'
        : 'square',
      style = {
        backgroundColor: this.props.color,
        width: 100 / this.props.size + '%',
        height: 100 / this.props.size + '%'
      },
      key = `${this.props.column}:${this.props.row}`

    return (
      <section className={className}
        data-key={key}
        // data-column={this.props.column}
        // data-row={this.props.row}
        data-id={this.props.id}
        style={style}
        onClick={this.handleClick}>
          {(this.props.id)
            ? <span className="id">{this.props.id}</span>
            : ''}
          {(man)
            ? <Man selected={this.props.selected}
                    isKing={man.isKing}
                    color={man.color}
                    directions={man.directions} />
            : '' }
      </section>
    )
  }
}

export default connect(null, mapDispatchToProps)(Square)