import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import Message from './components/Message'



class App extends Component {

  state = {
    messages:[],
    composeOn: false
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    // console.log(json)
    this.setState({messages: json} )
    console.log(this.state.messages)

  }



  addNewMessage = async (message) => {
    const response = await fetch('http://localhost:8082/api/messages', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      const updatedMessage = await response.json()
      console.log(updatedMessage)
      this.setState({ messages: [...this.state.messages, updatedMessage] })
    }


  deleteMessage = async (id) => {
    await fetch(`http://localhost:8082/api/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    this.setState({ messages: this.state.messages.filter((message) => message.id !== id) })
  }


  onSubmit = (e) => {
    e.preventDefault()
    this.addNewMessage({subject: e.target.subject.value, body: e.target.body.value})
    this.composeToggle()
  }

  renderMessages = () => {
    return this.state.messages.map((m, i) => {
      return <Message {...m} key={i}
      messages={this.state.messages}
      composeOn={this.state.composeOn}
      />
    })
    this.setState({ messages: [...this.state.messages]})
  }

  composeToggle = () => {
    this.setState({ composeOn: !this.state.composeOn })
  }




  render() {
    return (
      <div className="App">
        <div className="container">
        <Toolbar
          composeToggle={this.composeToggle} />
        <h1>Hello</h1>
        { //compose form
          this.state.composeOn &&
          <form className="form-horizontal well"
          onSubmit={this.onSubmit}>
            <div className="form-group">
              <div className="col-sm-8 col-sm-offset-2">
                <h4>Compose Message</h4>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="body" className="col-sm-2 control-label">Body</label>
              <div className="col-sm-8">
                <textarea name="body" id="body" className="form-control"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-8 col-sm-offset-2">
                <input type="submit" value="Send" className="btn btn-primary" />
              </div>
            </div>
          </form>
        }
        <MessageList
          renderMessages={this.renderMessages} />
        </div>
      </div>
    );
  }
}

export default App;
