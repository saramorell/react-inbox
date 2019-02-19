import React, {Component} from 'react'

class Message extends Component {

  render(){

    return (

      <React.Fragment>
        <div className={this.props.selected? (this.props.read? "row message read selected" : "row message unread selected" ): (this.props.read? "row message read unselected" : "row message unread unselected")}>

          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">

                <input type="checkbox" />
              </div>
              <div className="col-xs-2">
                <i className="star fa fa-star-o"></i>
              </div>
            </div>
          </div>
              <div className="col-xs-11">
                <a href="#">
                {this.props.subject}
                </a>
              </div>

        </div>



      </React.Fragment>
    )
}
}


export default Message
