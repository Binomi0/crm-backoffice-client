import React from 'react'
import PropTypes from  'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';

const styles = theme => ({
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    container: {
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pasw: '',
        };
    }

    login = () => {
        let accesos = { admin: '12345', adolfo: '12345', lidia: '12345', juliana: '12345' };
        let { name, pasw } = this.state;
        if (accesos[name].toLowerCase() === pasw) {
            sessionStorage.setItem('user', name);
            this.props.setUser(name);
            this.props.setRoute('Home')
        } else {
            alert('Acceso denegado')
        }
    };

    render () {
        console.log(this.state);
        let { classes } = this.props;
        return (
            <div>
                <div className={classes.container}>
                    <Typography type="title">Formulario de Acceso</Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="name"
                            label="Nombre"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => this.setState({ pasw: e.target.value })}
                            margin="normal"
                        />
                        <Button raised color="accent" className={classes.button} onClick={this.login.bind(this)}>
                            entrar
                            <Send className={classes.rightIcon} />
                        </Button>
                    </form>
                    {/*<input type="text" onChange={(e) => this.setState({ name: e.target.value })} placeholder="Usuario"/>*/}
                    {/*<br/>*/}
                    {/*<input type="password" onChange={(e) => this.setState({ pasw: e.target.value })} placeholder="Contraseña"/>*/}

                    {/*<button onClick={this.login.bind(this)}>Acceder</button>*/}
                </div>
            </div>
        )
    }
}

Login.PropTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.users,
        route: state.routes
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({
                type: 'SET_USER',
                payload: user
            })
        },
        setRoute: (route) => {
            dispatch({
                type: 'SET_ROUTE',
                payload: route
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));

