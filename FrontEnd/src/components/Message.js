import React, {Component} from 'react';

class Message extends Component {

    render() {
        return (
            <div className="row justify-content-md-center">
                <div>
                    {this.props.message1 && ( //Just a change here
                        <div className="alert alert-danger" role="alert">
                            {this.props.message1}
                        </div>
                    )}
                    {this.props.message2 && ( //Just a change here
                        <div className="alert alert-success" role="alert">
                            {this.props.message2}
                        </div>
                    )}
                    <div className="block">
                    {this.props.message3 && ( //Just a change here
                        <div className=" w-100 alert alert-primary" role="alert">
                          <a href="https://www.dropbox.com/lp/b6/projects">{this.props.message3}</a>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;
