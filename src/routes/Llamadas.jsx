import React, { Component } from 'react';
import Header from '../components/Header';
import Crear from '../components/Crear';
import Table from '../components/material/Table';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';

class Llamadas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            llamadas: [],
            tabla: [],
            editando: false,
            selected: ''
        }
    }

    componentWillMount() {
        let newArray = [], datos;
        let columnData = [
            { id: 'agente', numeric: false, disablePadding: true, label: 'Agente' },
            { id: 'tlf', numeric: false, disablePadding: false, label: 'Teléfono' },
            { id: 'objetivo', numeric: false, disablePadding: false, label: 'Objetivo' },
            { id: 'estado', numeric: false, disablePadding: false, label: 'Estado de Llamada' },
            { id: 'descripcion', numeric: false, disablePadding: false, label: 'Descripción' },
        ];
        fetch('/llamadas')
            .then(res => res.json())
            .then(llamadas => {
                datos = llamadas.map((llamadas, index) => {
                    let data = {
                        id: index,
                        agente: llamadas.agente,
                        tlf: llamadas.tlf,
                        objetivo: llamadas.objetivo,
                        estado: llamadas.estado,
                        descripcion: llamadas.descripcion
                    };
                    newArray.push(data);
                    return newArray
                });
                this.setState({ llamadas, tabla: datos, columnData })
            });
    }


    // addAction(action) {
    //     console.log('action:',action);
    //     this.setState({ editando: action })
    // }

    itemSelected(client) {
        this.setState({ selected: client, editando: true })
    }

    render() {
        let { llamadas, selected, columnData, tabla } = this.state;
        let llamada;
        if (!llamadas) { return } else {
            llamada = llamadas[selected];
        }

        return (
            <div>
                <Header title="Llamadas"/>
                {
                    this.state.llamadas.length > 0 && columnData
                        ? <div style={{margin: 10}} >
                            <Table
                                data={tabla}
                                columnData={columnData}
                                title="Llamada"
                                itemSelected={this.itemSelected.bind(this)}
                            />
                        </div>
                        : ''
                }
                {
                    !this.state.editando ? (
                        <Crear
                            // onclick={this.addAction.bind(this)}
                            route="Llamada"
                        />
                    ) : (
                        <Button
                            style={{float: 'right'}}
                            raised color="accent"
                            // onClick={this.addAction.bind(this, false)}
                        >
                            <CloseIcon />
                        </Button>
                    )
                }
            </div>
        )
    }
}

export default Llamadas;