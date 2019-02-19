import React, {Component} from 'react'

export default class MessageList extends Component{


  render() {
    return(
      <div>
        <ul className="list-group">
          {this.props.renderMessages()}
        </ul>
      </div>
    )
  }
}
