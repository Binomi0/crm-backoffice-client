import React from 'react';
import Button from 'material-ui/Button';

class MyButton extends React.Component {

    render() {
        return (
            <div>
                <Button raised color="primary" className={this.props.classes} onClick={() => this.props.changeRoute(this.props.route)}>
                    {this.props.route}
                </Button>
            </div>
        );
    }
}

export default MyButton