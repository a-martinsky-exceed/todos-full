import React from 'react';
import { Item } from './Item.jsx'

class ToDoList extends React.Component {
  filteredList = (list, mode, buttons) => {
    return buttons[mode](list)
  }

  // prepare to delete item (called on item)
  addId = (id) => {
    this.props.deleteFromList(id)
  }

  renderList = (selectAll, addId, setMode, onCheck) => {
    const {list, mode, buttons, rename, renameNotify} = this.props
    const data = this.filteredList(list, mode, buttons)

    const items = data.map((item, key) => {
      return <Item
              key={key}
              id={item._id}
              text={item.text}
              checked={item.isChecked}
              addId={addId}
              setMode={setMode}
              onCheck={onCheck}
              rename={rename}
              renameNotify={renameNotify}
              textDecoration={item.textDecoration}
            />
      })
    return items
  }

  render() {
    const {selectAll, setMode, onCheck} = this.props;
    return (
      <React.Fragment>
        {this.renderList(selectAll, this.addId, setMode, onCheck)}
      </React.Fragment>
    )
  }
}

export { ToDoList }
