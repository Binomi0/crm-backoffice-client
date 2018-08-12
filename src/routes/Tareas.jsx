import React, { Component } from 'react';
import Header from '../components/Header';
import Crear from '../components/Crear';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
// pues no parece que falte na

const columnData = [
    { id: 'cliente', numeric: false, disablePadding: true, label: 'Cliente' },
    { id: 'fecha_inicio', numeric: false, disablePadding: false, label: 'Fecha Inicio' },
    { id: 'terminada', numeric: false, disablePadding: false, label: 'Terminada' },
    { id: 'agente', numeric: false, disablePadding: false, label: 'Agente' },
    { id: 'descripcion', numeric: false, disablePadding: false, label: 'Descripción' },
];

const Detalles = (tarea) =>
    <ul>
        <Button style={{float: 'right'}} raised color="accent" onClick={() => this.setState({ editando: false, selected: -1 })} >
            <CloseIcon />
        </Button>
        {/*<Button style={{marginBottom: '1em'}} raised onClick={() => this.setState({ selected: -1 })}>Cerrar</Button>*/}
        {
            columnData.map((columna, index) => {
                console.log('PROPS:',tarea);
                console.log('ID:',tarea.data[columna.id]);
                console.log('ColumnData:',columnData[index].id);
                console.log('Columna:', columna.id);
                return <li key={index}><b>{columna.id}:</b> {tarea.data[columna.id]} </li>
            })
        }

    </ul>;


class Tareas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tareas: [],
            tabla:[],
            editando: false,
            selected: '',
            columnData: [],
            cliente: []
        }
    }

    componentWillMount() {
        let newArray = [], datos;
        fetch('/tareas')
            .then(res => res.json())
            .then(tareas => {
                datos = tareas.map((tarea, index) => {
                    let data = {
                        id: index,
                        cliente: tarea.cliente,
                        fecha_inicio: tarea.fecha_inicio,
                        terminada: tarea.terminada,
                        agente: tarea.agente,
                        descripcion: tarea.descripcion
                    };
                    newArray.push(data);
                    return newArray
                });
                this.setState({ tareas, tabla: datos });

            })
    }

    addAction(action) {
        console.log('action:',action);
        this.setState({ editando: action })
    }

    itemSelected(value) {
        // console.log(value);
        // this.setState({ selected: value, editando: true });
        console.log(this.state.tareas[value]);
        fetch(`/clientes/${this.state.tareas[value].cliente}`)
            .then(res => res.json())
            .then(cliente => {
                this.setState({ cliente })
            })
    }

    render() {

        let { tareas, selected, tabla } = this.state;
        let tarea;
        if (!tareas) { return } else {
            tarea = tareas[selected];
        }

        return (
            <div>
                <Header title="Tareas"/>
                {
                    this.state.selected !== 'undefined' && tarea ?
                        <Detalles
                            onclick={this.addAction.bind(this)}
                            data={tarea}
                        />
                     :
                        ''
                }

                {
                    !this.state.editando ? (
                        <Crear
                            onclick={this.addAction.bind(this)}
                            route="Tarea"
                        />
                    ) : (
                        <Button
                            style={{float: 'right'}}
                            raised color="accent"
                            onClick={this.addAction.bind(this, false)}
                        >
                            <CloseIcon />
                        </Button>
                    )
                }

                {
                    this.state.tareas.length > 0 && columnData
                        ? <div style={{margin: 10}}>
                        <Table
                            data={tabla}
                            columnData={columnData}
                            title="Tarea"
                            itemSelected={this.itemSelected.bind(this)} // para poder elegir
                        />
                    </div>
                        : <div>Cargando tareas...</div>
                }

            </div>
        )
    }
}

export default Tareas;