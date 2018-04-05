import React, { Component } from 'react'
import { connect } from 'react-redux'
import Square from './Square'
const R = require('ramda')

const mapStateToProps = state => {
  const list = Object.keys(state.board).map(k => state.board[k]),
    squares = R.sortWith([
      R.ascend(R.prop('row')),
      R.ascend(R.prop('column'))
    ], list)
  return { squares }
}

class Board extends React.Component {
  render() {
    return (
      <section className="board">
        {this.props.squares.map((sq, i) => (
          <Square key={i}
            size={Math.sqrt(this.props.squares.length)}
            column={sq.column}
            row={sq.row}
            color={sq.color}
            id={sq.id}
            selected={sq.selected}
            highlighted={sq.highlighted}
            man={sq.man}
          />
        ))}
      </section>
    )
  }
}

export default connect(mapStateToProps)(Board)