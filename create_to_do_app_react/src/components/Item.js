import React from 'react'

class Item extends React.Component {
  state = {
    toDoName: this.props.text,
    disableEdit: true,
    hiddenButton: 'non-visible',
    isChecked: this.props.checked
  }

  changeValue = (e, id) => {
    const text = e.currentTarget.value
    this.setState({toDoName: text})
  }

  handleChecked = (e) => {
    this.props.onCheck(this.props.id, e.currentTarget.checked)
    this.setState({isChecked: e.currentTarget.checked})
  }

  startRename = (e) => {
    this.setState({disableEdit: false})
    this.props.renameNotify("Press Enter to save changes")
  }

  processRename = (e, id) => {
    if(e.key === 'Enter') {
      this.props.rename(id, this.state.toDoName)
    }
  }

  endRename = (e) => {
    this.setState({disableEdit: true})
  }

  // show delete button
  hover = () => {
    this.setState({hiddenButton: 'visible'})
  }

  //hide delete button
  revertHover = () => {
    this.setState({hiddenButton: 'non-visible'})
  }

  getIdToDestroy = () => {
    this.props.addId(this.props.id)
  }

  render() {
    const { toDoName, disableEdit, hiddenButton } = this.state
    const { id, checked } = this.props
    const textDecoration = checked ? 'line ' : ''
    const border = disableEdit ? '' : 'active_border '
    const classesDiv = border + 'item'
    const classesInput = textDecoration + 'name'

    return (

      <div className={classesDiv} onMouseMove={this.hover} onMouseOut={this.revertHover}>
        <div className="checkboxWrapper">
          <input id="item_checkbox" className="checkbox" onChange={this.handleChecked} checked={checked} type="checkbox"/>
          <label htmlFor="item_checkbox"
          />
        </div>

        <input id={id} className={classesInput}
          onChange={(e)=>this.changeValue(e, id)}
          onKeyPress={(e)=>this.processRename(e, id)}
          readOnly={disableEdit}
          onDoubleClick={this.startRename}
          onBlur={this.endRename}
          value={toDoName}
          />

        <button id="deleteItem"
                name="getIdToDestroy"
                className={hiddenButton}
                onMouseMove={this.hover}
                onMouseOut={this.revertHover}
                onClick={this.getIdToDestroy}>×</button>
      </div>
    )
  }
}

export { Item }
