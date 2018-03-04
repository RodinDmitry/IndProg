import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], addText: '' , deleteText: ''};
    this.getInitialState();
    this.handleChangeAdd = this.handleChangeAdd.bind(this);
    this.handleChangeDelete = this.handleChangeDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  getInitialState()
  {
    fetch('http://localhost:8000/tasks/',
        {
          method:"GET",
            content:'application/json',
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
            this.setState({

                items : json
            });
        })
        .catch(error => {
            return console.log(error);
        })
    //var data = JSON.parse(localStorage.getItem('todo-app')) || [];
    //this.state.items = data;
  }

  render() {
    return (
      <div>
        <TodoList items={this.state.items} />

        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChangeAdd}
            value={this.state.addText}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
          <form onSubmit={this.deleteTask}>
          <input
            onChange={this.handleChangeDelete}
            value={this.state.deleteText}
          />
          <button>
            Delete task by id
          </button>
        </form>


      </div>
    );
  }

  deleteTask(e)
  {
      var form = new FormData();
      form.append("id", this.state.deleteText);
      fetch("http://localhost:8000/tasks/" + this.state.deleteText + '/', {
            method: "DELETE",
            body: form
      }).catch(error => console.log(error));


  }

  handleChangeAdd(e) {
    this.setState({ addText: e.target.value });
  }

  handleChangeDelete(e) {
    this.setState({ deleteText: e.target.value });
  }

  handleSubmit(e) {
    if (!this.state.addText.length) {
      return;
    }
    const newItem = {
        id : 0,
        text: this.state.addText,
        creation_date: Date.now(),
        completed: false,

    };
    console.log(newItem);
    var form = new FormData();
    form.append("text", newItem.text);
    form.append("creation_date", newItem.creation_date);
    form.append("completed", newItem.completed);
    fetch('http://localhost:8000/tasks/',
        {
            method:"POST",
            content:'application/json',
            body: form
        }).catch(error => console.log(error))

    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));

  }
}



class TodoList extends React.Component {

    render() {
        return (
            <ul>
                {this.props.items.map(item => {
                    return (
                        <li key={item.id}>{"text:" + item.text + " id: " + item.id}</li>
                    );
                })}

            </ul>
        );
      }
}


ReactDOM.render(<App/>, document.getElementById("root"));


export default App;