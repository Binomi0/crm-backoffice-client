import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Drawer from './material/Drawer';
import AppBar from './material/AppBar';
// import { withStyles } from 'material-ui/styles';
// import Typograpghy from 'material-ui/Typography'
// import BlurOn from 'material-ui-icons/BlurOn';
// import IconButton from 'material-ui/IconButton';
// import TopMenu from './material/TopMenu';

class Header extends Component {
    state = {
        drawerOpen: false
    };

    toggleDrawer(){
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    render() {
        const { title, subtitle, user } = this.props;
        const { drawerOpen } = this.state;
        return (
            <div>
                <Drawer
                    open={drawerOpen}
                    user={user}
                    logOut={() => this.props.logOut()}
                    toggleDrawer={this.toggleDrawer.bind(this)}
                />
                <AppBar
                    position="absolute"
                    title={`SeoLidera CRM | ${title}`}
                    user={user}
                    logOut={() => this.props.logOut()}
                    toggleDrawer={this.toggleDrawer.bind(this)}
                />
            </div>
        )
    }
}

Header.PropTypes = {
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default Header;