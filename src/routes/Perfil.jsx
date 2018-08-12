import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    container: {
        marginLeft: theme.spacing.unit * 2
    }
});

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            prospectos: '',
            clientes: ''
        }
    }

    componentWillMount() {
        let clientes = JSON.parse(localStorage.getItem('clientes'));
        if (!clientes) return;
        this.setState({ clientes: clientes.filter(cliente => cliente.fuente === this.props.user)});
    }

    componentDidMount() {
        fetch('/api/prospectos')
            .then(res => res.json())
            .then(datos => {
                if (!datos) return;
                this.setState({ prospectos: datos.filter(prospecto => prospecto.agente === this.props.user )})
            })
    }

    render() {
        let { classes } = this.props;
        return (
            <div className={classes.container}>
                <h1>Mi perfil</h1>
                <Typography type="title">
                    Prospectos enviados: {this.state.prospectos.length}
                </Typography>
                <Typography type="title">
                    Clientes activos: {this.state.clientes.length}
                </Typography>
            </div>
        )
    }
}

Perfil.PropTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Perfil);