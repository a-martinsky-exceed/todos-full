import React from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateToDo } from './components/CreateToDo.jsx'
import { ToDoList } from './components/ToDoList.jsx'
import { Buttons } from './components/Buttons.jsx'
import './App.css';

toast.configure({
  autoClose: 8000,
  draggable: true,
  closeOnClick: false
})

class App extends React.Component {
  state = {
    list: [],
    selectAll: false,
    mode: "showAll"
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/todos`)
          .then(res => {
            const all = res.data;
            this.setState({list: all})
          })
  }

  query = {
    create()     { return 'http://localhost:3001/todos/create'} ,
    update(id)   { return `http://localhost:3001/todos/${id}/update`},
    delete(id)   { return `http://localhost:3001/todos/${id}/delete`},
    checkedAll() { return 'http://localhost:3001/todos/selectAll'}
  }

  successNotify = (message) => {
    toast.success(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    draggable: true,
    });
  };

  errorNotify = (message) => {
    toast.warn(message, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    draggable: true,
    });
  }

  infoTopNotify = message => {
    toast.info(message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    draggable: true,
    });
  }

  infoBottomNotify = message => {
    toast.info(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    });
  }

  addItem = data => {
    axios.post(this.query.create(), data)
          .then(res => {
            const nextItem  = [...this.state.list,res.data]
            this.setState((state,props) => ({ list: nextItem, disableSelectAll: false }))
            this.successNotify(`Added "${res.data.text}"`)
          })
          .catch(e => {
            console.error('addItem error: ', e)
            this.errorNotify('Something was wrong. Try it later')
          })
  }

  deleteFromList = (id) => {
    axios.delete(this.query.delete(id), id)
          .then(res => {
            const {list} = this.state
            const newList = list.filter(item => item._id !== id)
            this.setState({list: newList})
            this.infoTopNotify("Item deleted")
          })
          .catch(e => {
            console.error('deleteFromList error: ',e)
            this.errorNotify('Something was wrong. Try it later')
          })
  }

  checkedAll = (bool) => {
    axios.put(this.query.checkedAll(), {isChecked: bool})
        .then(res => {
          const {list} = this.state
          const updatedList = list.map(item => {
              return {...item, isChecked: res.data.isChecked}
          })
          this.setState({list: updatedList})
        })
        .catch(e => {
          console.error('checkedAll error: ',e)
          this.errorNotify('Something was wrong. Try it later')
        })
  }

  setFilterMode = (e) => {
    this.setState({mode: e.currentTarget.name})
  }

  onCheck = (id, bool) => {
    axios.put(this.query.update(id), {isChecked: bool})
          .then(res => {
            const {list} = this.state
            const updatedList = list.map(item => {
              if(item._id === id) {
                return {...item, isChecked: res.data.isChecked}
              }
              else {
                return {...item}
              }
            })
            this.setState({list: updatedList})
            this.infoTopNotify(`Item ${bool ? "completed!" : "still in progress"}`)
          })
          .catch(e => {
            console.error('onCheck error: ',e)
            this.infoTopNotify('Something was wrong. Try it later')
          })
  }

  rename = (id, text) => {
    axios.put(this.query.update(id), {text: text})
          .then(res => {
            const {list} = this.state
            const updatedList = list.map(item => {
              if(item._id === id) {
                return {...item, text: res.data.text}
              }
              else {
                return {...item}
              }
            })
            this.setState({list: updatedList})
            this.successNotify('Item successfully renamed')
          })
          .catch(e => {
            console.error('rename error: ',e)
            this.errorNotify('Something was wrong. Try it later')
          })
  }

  // footer buttons
  buttons = {
    showAll(items) {
      return items
    },

    showActive(items) {
      return items.filter(item => item.isChecked === false)
    },

    showCompleted(items) {
      return items.filter(item => item.isChecked === true)
    },

    clearCompleted(items) {
      return items.filter(item => item.isChecked === false)
    }
  }

  render() {
    const {list, selectAll, mode} = this.state
    const boldClass = list.every(item => item.isChecked) ? 'bold' : ''
    return(
      <div className = "container">
        <h1>todos</h1>
        <div className="item">
          <CreateToDo
            addToDo={this.addItem}
            checkedAll={this.checkedAll}
            list={list}
            disableSelectAll={list.length ? false : true}
            boldClass={boldClass}
            infoMessage={this.infoBottomNotify}
          />
        </div>
        <ToDoList
          list={list}
          buttons={this.buttons}
          mode={mode}
          setMode={this.setFilterMode}
          deleteFromList={this.deleteFromList}
          selectAll={selectAll}
          onCheck={this.onCheck}
          rename={this.rename}
          renameNotify={this.infoBottomNotify}
        />
        {list.length ? <Buttons list={list} setMode={this.setFilterMode} /> : null}
      </div>
    )
  }
}

export default App;
