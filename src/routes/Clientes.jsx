// import { Redirect } from 'react-router-dom';
// import Header from '../components/Header';
// import Tareas from "./Tareas";
// import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import Detalles from '../components/Detalles';
import Crear from '../components/Crear';
import { LinearProgress } from 'material-ui/Progress';
import FullScreenDialog from '../components/material/FullScreenDialog';
import Snackbar from 'material-ui/Snackbar';

const columnData = [
    { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre ' },
    { id: 'telf', numeric: false, disablePadding: true, label: 'Teléfono' },
    { id: 'llamadas', numeric: false, disablePadding: true, label: 'Llamadas' },
    { id: 'negocios', numeric: false, disablePadding: true, label: 'Negocios' },
    { id: 'tareas', numeric: false, disablePadding: true, label: 'Tareas' }
];

class Clientes extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
            tabla: [],
            selected: '',
            text: '',
            viewClient: false,
            newClient: false,
            editClient: false,
            dialogOpen: false,
            newCall: false,
            editCall: false,
            nuevoNegocio: false,
            editarNegocio: false,
            nuevaTarea: false,
            editarTarea: false,
            loadingData: false,
            item: '',
            snackbarOpen: false,
            snackMessage: '',
            vertical: 'bottom',
            horizontal: 'right'
        };
        this.loadResources = this.loadResources.bind(this);
    }

    componentWillMount() {
        let { tabla } = this.state;
        if (tabla.length <= 0) {
            this.loadResources()
        }
    }

    loadResources(item) {
        console.log('Cargando de la base de datos');
        let datos;
        fetch('/api/clientes')
            .then(res => res.json())
            .then(result => {
            datos = result.map((usuario,i) => {
                return {
                    id: i,
                    nombre: usuario.nombre,
                    telf: usuario.telf,
                    llamadas: usuario.llamadas,
                    negocios: usuario.negocios,
                    tareas: usuario.tareas
                };
            });
            console.log('Datos obtenidos en lectura', datos);
            // console.log(newArray);
            if (!item) {
                localStorage.setItem('clientes', JSON.stringify(result));
                this.setState({ usuarios: result, tabla: datos, loadingData: false })
            } else {
                this.setState({ usuarios: result, tabla: datos, loadingData: false, [item]: !this.state[item] })
            }
        });
    }

    itemSelected(client, action) {
        switch (action) {
            case 'ver':
                this.setState({ selected: client, viewClient: true, newClient: false, editClient: false, newCall: false, nuevoNegocio: false });
                break;
            case 'editar':
                this.setState({ selected: client, viewClient: false, newClient: false, editClient: true, newCall: false, nuevoNegocio: false })  ;
                break;
            default:
                break;
        }
    }

    filterText(text) {
        this.setState({ text })
    }

    toggleItems = (action, item) => {
        console.log('Accion seleccionada:',action);
        console.log('ITEM seleccionado:', item);
        this.setState({ [action]: !this.state[action], item: item });
    };

    clientActions(action) {
        let message = `Añadido nuevo ${action}`;
        this.loadResources(action);
        this.setState({ snackMessage: message, snackbarOpen: true })
    }

    render() {
        console.log('RENDER CLIENTE', this.state);
        let { usuarios, selected, tabla, item, vertical, horizontal, snackbarOpen } = this.state;
        let { user, classes } = this.props;
        let cliente = usuarios[selected] || null;

        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={snackbarOpen}
                    onRequestClose={() => this.setState({ snackbarOpen: false })}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackMessage}</span>}
                />
                { this.state.loadingData ? <LinearProgress/> :'' }
                {
                    this.state.editClient || this.state.viewClient || this.state.newCall || this.state.nuevoNegocio
                        ? <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ newClient: false, viewClient: false, editClient: false, newCall: false, nuevoNegocio: false })} >
                        <CloseIcon />
                    </Button>
                        :  ''
                }

                {
                    this.state.selected !== 'undefined' && cliente && this.state.viewClient
                        ?  <Detalles
                            cliente={cliente}
                            toggleItems={this.toggleItems.bind(this)}
                            // editarLlamada={this.editarLlamada.bind(this)}
                        />
                        :  ''
                }

                {
                    this.state.tabla.length > 0 && columnData
                        ? <div style={{margin: 10}}>
                            {
                                this.state.editClient || this.state.viewClient
                                    ? ''
                                    : <Table
                                        data={tabla}
                                        columnData={columnData}
                                        title="Cliente"
                                        itemSelected={this.itemSelected.bind(this)}
                                        changeText={this.filterText.bind(this)}
                                />
                            }
                    </div>
                    : <LinearProgress />
                }

                {
                    this.state.newClient
                    ? <FullScreenDialog
                            cliente={ {} }
                            classes={classes}
                            user={user}
                            type="Nuevo Cliente"
                            action='newClient'
                            clientActions={this.clientActions.bind(this)}
                            toggleItems={this.toggleItems.bind(this)}
                        />
                    : ''
                }

                {
                    this.state.editClient
                    ?   <FullScreenDialog
                            cliente={cliente}
                            classes={classes}
                            user={user}
                            type="Editar Cliente"
                            action='editClient'
                            clientActions={this.clientActions.bind(this)}
                            toggleItems={this.toggleItems.bind(this)}
                        />
                    : ''
                }

                {
                    this.state.newCall
                    ? <FullScreenDialog
                        classes={classes}
                        type="Nueva Llamada"
                        cliente={cliente}
                        user={user}
                        action='newCall'
                        clientActions={this.clientActions.bind(this)}
                        toggleItems={this.toggleItems.bind(this)}
                    />
                    : ''
                }

                {
                    this.state.editCall
                    ? <FullScreenDialog
                        type="Editar Llamada"
                        action='editCall'
                        item={item}
                        classes={classes}
                        cliente={cliente}
                        user={user}
                        clientActions={this.clientActions.bind(this)}
                        toggleItems={this.toggleItems.bind(this)}
                    />
                    : ''
                }

                {
                    this.state.nuevoNegocio
                    ? <FullScreenDialog
                        type="Nuevo Negocio"
                        action='nuevoNegocio'
                        classes={classes}
                        cliente={cliente}
                        user={user}
                        clientActions={this.clientActions.bind(this)}
                        toggleItems={this.toggleItems.bind(this)}
                    />
                    :''
                }

                {
                    this.state.editarNegocio
                    ? <FullScreenDialog
                        type="Editar Negocio"
                        action='editarNegocio'
                        item={item}
                        classes={classes}
                        cliente={cliente}
                        user={user}
                        clientActions={this.clientActions.bind(this)}
                        toggleItems={this.toggleItems.bind(this)}
                    />
                    : ''
                }

                {
                    this.state.nuevaTarea
                        ? <FullScreenDialog
                            classes={classes}
                            type="Nueva Tarea"
                            cliente={cliente}
                            user={user}
                            action='nuevaTarea'
                            clientActions={this.clientActions.bind(this)}
                            toggleItems={this.toggleItems.bind(this)}
                        />
                        :''
                }

                {
                    this.state.editarTarea
                        ?
                        <FullScreenDialog
                            type="Editar Tarea"
                            action='editarTarea'
                            item={item}
                            classes={classes}
                            cliente={cliente}
                            user={user}
                            clientActions={this.clientActions.bind(this)}
                            toggleItems={this.toggleItems.bind(this)}
                        />
                        : ''
                }
                 <Crear
                    addClient={() => this.setState({ newClient: true })}
                    route="Cliente"
                />
            </div>
        )
    }
}

Clientes.PropTypes = {
    user: PropTypes.string.isRequired
};

export default Clientes;