import React from 'react';

class CreateToDo extends React.Component {
  state = {
    text: ''
  }

  start = () => {
    this.props.infoMessage("Press Enter to save item (max 100 chars)")
  }

  changeValue = (e) => {
    this.setState({text: e.currentTarget.value})
  }

  createItem = (e) => {
    const { text } = this.state
    if(text.length && e.key === 'Enter') {
      this.props.addToDo({text})
      this.setState({text: ''})
    }
  }

  handleChecked = (e) => {
    const bool = e.currentTarget.checked
    this.props.checkedAll(bool)
  }

  render() {
    const {text} = this.state
    const {list, disableSelectAll, boldClass} = this.props
    const classes = list.length ? 'visible ' +boldClass: 'non-visible '+boldClass
    return(
      <React.Fragment>
        <div className="checkboxWrapper">
          <input
            id="selectAll"
            onChange={this.handleChecked}
            type="checkbox"
            disabled={disableSelectAll}
          />
          <label htmlFor="selectAll" className={classes}/>
        </div>

        <input
          className="name"
          onFocus={this.start}
          onKeyPress={this.createItem}
          onChange={this.changeValue}
          value={text}
          type="text"
          placeholder="What needs to be done?"
        />
      </React.Fragment>
    )
  }
}

export { CreateToDo }
