import React from 'react';

class Buttons extends React.Component {
  countLeft = (list) => {
    let i = 0
    list.forEach(item => {
      return item.isChecked ? i : i++
    })
    return i
  }

  render() {
    const {list, setMode} = this.props
    return(
      <div className="footer">
        <button disabled>{this.countLeft(list)} left</button>
        <button name="showAll" onClick={setMode}>All</button>
        <button name="showActive" onClick={setMode}>Active</button>
        <button name="showCompleted" onClick={setMode}>Completed</button>
        <button name="clearCompleted" onClick={setMode}>Clear Completed</button>
      </div>
    )
  }
}

export { Buttons }
