import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Clientes from "./Clientes";
import clientActions from '../actions/clientActions';
import Prospectos from './Prospectos';
import Perfil from './Perfil';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import logo from '../images/logo-seolidera-sombra.png';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    }),
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            llamadas: [],
            tareas: [],
            cLlamadas: '',
            cTareas: ''
        }
    }

    componentDidMount() {
        clientActions.getTareas(tareas => {
            // this.setState({ tareas });
            this.tareasPendientes(tareas)
        });
        clientActions.getLlamadas(llamadas => {
            // this.setState({ llamadas });
            this.llamadasPendientes(llamadas);
        });
        clientActions.getClients(clientes => {
            this.clientesPendientes(clientes)
        })
    }

    tareasPendientes(tareas) {
        // console.log(tareas);
        let misTareas = tareas.filter(tarea => {
            return tarea.agente === this.props.user.nombre && tarea.estado === '0'
        });
        this.setState({ tareas: misTareas });
    }

    llamadasPendientes(llamadas) {
        console.log(llamadas);
        let misLlamadas = llamadas.filter(llamada => {
            return llamada.agente === this.props.user.nombre && llamada.estado === '0'
        });
        this.setState({ llamadas: misLlamadas });
    }

    clientesPendientes(clientes) {
        console.log(this.state);
        let { llamadas, tareas } = this.state;
        let cLids = llamadas.map(llamada => llamada.cliente);
        let cTids = tareas.map(tarea => tarea.cliente);
        let cLPendientes = [], cTPendientes = [];
        for (let i in cLids) {
            clientes.filter(cliente => {
                if (cliente._id === cLids[i]) {
                    cLPendientes.push(cliente)
                }
                return cliente._id === `${cLids[i]}`
            });
        }
        for (let i in cTids) {
            clientes.filter(cliente => {
                if (cliente._id === cTids[i]) {
                    cTPendientes.push(cliente)
                }
                return cliente._id === `${cTids[i]}`
            });
        }

        this.setState({ cLlamadas: cLPendientes, cTareas: cTPendientes });
        // console.log(cLPendientes)
    }

    renderPage(route, user) {

        switch (route) {
            case 'clientes':
                return <Clientes user={user} />;
            case 'prospectos':
                return <Prospectos user={user} changeRoute={() => this.props.setRoute('Home')} />;
            case 'perfil':
                return <Perfil user={user} />;
            default:
                return ''
        }
    }

    render() {
        let { classes, user, route } = this.props;
        let { llamadas, tareas, cTareas, cLlamadas } = this.state;
        console.log(this.state);
        return (
            <div>
                {
                    this.props.route.name !== 'Home'
                    ? ''
                    : <div className={classes.row}>
                        <Avatar
                            alt="Logo Seolidera"
                            src={logo}
                            className={classNames(classes.avatar, classes.bigAvatar)}
                        />
                        <Typography type="display1" gutterBottom>
                            Panel de Control SEOLIDERA CRM
                        </Typography>
                        {
                            user.nombre
                            ? <div>
                                <Typography type="headline" >
                                    Hola {this.props.user.nombre}.
                                </Typography>
                                <Paper className={classes.root} elevation={4}>
                                    <Typography type="headline" component="h3">
                                        Llamadas Pendientes: { llamadas.length > 0 ? llamadas.length : '0'}
                                    </Typography>
                                    <Typography type="body1" component="p">
                                        Próxima Llamada: { llamadas.length > 0 ? llamadas[0].descripcion : ''}
                                    </Typography><Typography type="body1" component="p">
                                        Clientes: { cLlamadas ? cLlamadas.map(cliente => {
                                            return <span key={cliente._id}>{cliente.nombre}, </span>
                                }) : 'No encuentro el nombre' }
                                    </Typography>
                                </Paper>
                                <Paper className={classes.root} elevation={4}>
                                    <Typography type="headline" component="h3">
                                        Tareas Pendientes: { tareas.length > 0 ? tareas.length : '0'}
                                    </Typography>
                                    <Typography type="body1" component="p">
                                        Próxima Tarea: { tareas.length > 0 ? tareas[0].titulo : ''}
                                    </Typography>
                                    <Typography type="body1" component="p">
                                        Clientes: { cTareas  ? cTareas.map(cliente => {
                                            return <span key={cliente._id}>{cliente.nombre}, </span>
                                    }) : 'No encuentro el nombre' }
                                    </Typography>
                                </Paper>
                                </div>
                            : ''
                        }
                    </div>
                }
                {user ? this.renderPage(route.name, user.nombre) : ''}
            </div>
        )
    }
}

Home.PropTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    setRoute: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        route: state.routes,
        user: state.users
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setRoute: (route) => {
            dispatch({
                type: 'SET_ROUTE',
                payload: route
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));