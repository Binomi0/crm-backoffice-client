import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
    card: {
        padding: theme.spacing.unit
    }
});

class Prospectos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            email: '',
            snackbarOpen: false,
            vertical: 'bottom',
            horizontal: 'right'
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    // TODO crear funcion para borrar prospectos y añadir a juliana a alejandro+

    enviarMail() {

        let { nombre, email } = this.state;
        let agente = this.props.user;
        this.setState({ snackbarOpen: true, nombre: '', email: '' });
        let url = '/api/clientes/nuevo-prospecto';
        let headers = { 'Content-Type': 'application/json; charset=UTF-8' };
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ nombre, email, agente })
        })
        .then(() => {
            setTimeout(() => {
                this.props.changeRoute();
                console.log('Email enviado')
            }, 2000)
        })
    }

    render() {
        let { classes } = this.props;
        let { snackbarOpen, vertical, horizontal, email, nombre} = this.state;
        return (
            <Card className={classes.card}>
                <form className={classes.container} noValidate autoComplete="off">
                    <Typography type='title' gutterBottom>
                        Enviar email a prospecto
                    </Typography>
                    <CardContent>
                        <TextField
                            id="nombre"
                            label="Nombre"
                            className={classes.textField}
                            value={nombre}
                            onChange={this.handleChange('nombre')}
                            margin="normal"
                            required
                        />
                        <TextField
                            id="email"
                            label="Correo Electrónico"
                            className={classes.textField}
                            value={email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            required
                        />
                        <Button
                            raised
                            color="accent"
                            className={classes.button}
                            disabled={ !nombre || !email }
                            onClick={this.enviarMail.bind(this)}
                        >
                            Enviar
                        </Button>
                    </CardContent>
                </form>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={snackbarOpen}
                    onRequestClose={() => this.setState({ snackbarOpen: false })}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Tu mensaje ha sido enviado</span>}
                />
            </Card>
        )
    }
}

Prospectos.PropTypes = {
    classes: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired
};

export default withStyles(styles)(Prospectos);