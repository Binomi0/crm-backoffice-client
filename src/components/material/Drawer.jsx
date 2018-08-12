/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import People from 'material-ui-icons/People';
import NaturePeople from 'material-ui-icons/NaturePeople';
import AccountBox from 'material-ui-icons/AccountBox';
import Home from 'material-ui-icons/Home';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
// import Card from 'material-ui/Card';
// import Button from 'material-ui/Button';
// import InboxIcon from 'material-ui-icons/Inbox';

const styles = theme => ({
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 3
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    list: {
        width: 250,
    },
    listFull: {
        width: 'auto',
    },
});

class MyDrawer extends React.Component {

    toggleDrawer = (open) => {
        this.props.toggleDrawer(open)
    };

    handleLinks(link) {
        console.log('LINK:',link);
        if (link === 'logout') {
            this.props.logOut();
            // this.toggleDrawer(false);
        } else {
            this.props.setRoute(link);
            this.toggleDrawer(false);
        }
    }

    render() {
        console.log(this.props);
        // console.log('DRAWER.JSX this.props: ', this.props);
        const { classes, user, open } = this.props;
        let imgs = {
            lidia: 'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-1/p160x160/22090168_346957649092794_1395500810210186461_n.jpg?oh=f181d9bd77ab69df9dc00573c035f0e1&oe=5AA39E63',
            adolfo: 'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-1/p160x160/22007674_10214026204511512_6064277368706487053_n.jpg?oh=c2f272760ee3249f3ed6196e6de1d05a&oe=5AAF4F3F',
            juliana: 'https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/22050320_10155861895456209_4510097058396416250_n.jpg?oh=6323d062dca6841b6b65de6559a9db49&oe=5A9C09B2'
        };
        let nombres = {
            lidia: 'Lidia Gómez',
            adolfo: 'Adolfo Onrubia',
            juliana: 'Juliana Montes'
        };

        const header = (
            <div className={classes.row}>
                <Avatar
                    alt={nombres[user]}
                    src={imgs[user]}
                    className={classNames(classes.avatar, classes.bigAvatar)}
                />
                <Typography type='caption' >
                        {nombres[user]}
                </Typography>
            </div>
        );

        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button onClick={this.handleLinks.bind(this, 'Home')} >
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </List>
                <Divider light/>
                <List>
                    <ListItem button onClick={this.handleLinks.bind(this, 'clientes')} >
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Clientes" />
                    </ListItem>
                </List>
                <List>
                    <ListItem button onClick={this.handleLinks.bind(this, 'prospectos')} >
                        <ListItemIcon>
                            <NaturePeople/>
                        </ListItemIcon>
                        <ListItemText primary="Prospectos" />
                    </ListItem>
                </List>
                <Divider light/>
                <List>
                    <ListItem button onClick={this.handleLinks.bind(this, 'perfil')} >
                        <ListItemIcon>
                            <AccountBox/>
                        </ListItemIcon>
                        <ListItemText primary="Mi Perfil" />
                    </ListItem>
                </List>
                <Divider light/>
                <List>
                    <ListItem button  onClick={this.handleLinks.bind(this, 'logout')} >
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <ListItemText primary="Salir" />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div>
                {
                    user
                    ? <Drawer open={open} onRequestClose={this.toggleDrawer.bind(this, false)}>
                            {header}
                            <div
                                tabIndex={0}
                                role="button"
                                // onClick={this.toggleDrawer(false)}
                                // onKeyDown={this.toggleDrawer(false)}
                            >
                                {sideList}
                            </div>
                        </Drawer>
                        : ''
                }

            </div>
        );
    }
}
MyDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    // open: PropTypes.boolean.isRequired
    // user: PropTypes.string.isRequired,
    // handleRoute: PropTypes.func.isRequired,
    // logOut: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        route: state.routes,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setRoute: (route) => {
            dispatch({
                type: 'SET_ROUTE',
                payload: route
            })
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyDrawer));