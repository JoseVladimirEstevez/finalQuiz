import React from 'react'

function row(props) {
  return (
    <div>
        <tr>
            <td>{props.name}</td>
            <td>{props.category}</td>
            <td>{props.score}</td>
        </tr>
    </div>
  )
}

export default row