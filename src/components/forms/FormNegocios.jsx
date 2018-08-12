import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import green from 'material-ui/colors/green';
import { FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    checked: {
        color: green[500],
    },
    input: {
        margin: theme.spacing.unit,
    },
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit
    }),
    button: {
        margin: theme.spacing.unit,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,
    },
});

class FormNegocios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            pais: '',
            direccion: '',
            postal: '',
            ciudad: '',
            provincia: '',
            tlf: '',
            web: '',
            categoria: '',
            pagado: '',
            horario: '',
            oportunidades: '',
            descripcion: '',
            redes: '',
            fotos: [],
            frases: '',
            activa: false,
            estado: '',
            pagada: false,
            producto: '',
            renovacion: '',
            agente: props.user,
            dialogOpen: false,
        }
    }

    componentWillMount() {
        let { cliente, action, item } = this.props;
        if (!cliente) {
            return null
        } else if (action === 'editarNegocio') {
            console.log('montando formnegocios con item', item);
            this.setState({ ...cliente.negocios[item] })
        }
    }

    handleChange(evt, item) {
        if (item === 'activa') {
            this.setState({ activa: !this.state.activa })
        } else if (item === 'pagada') {
            this.setState({ pagada: !this.state.pagada })
        } else {
            this.setState({ [item]: evt.target.value})
        }
    }

    confirmForm() {
        this.setState({ dialogOpen: true });
    }

    handleRequestClose(accepted) {
        if (!accepted) {
            this.setState({ dialogOpen: accepted })
        } else {
            this.setState({ dialogOpen: false , sendDisabled: true });
            this.sendForm()
        }
    }

    sendForm() {
        let { action, cliente, user, clientActions, item } = this.props;
        let datos = this.state;
        datos['cliente'] = cliente._id;
        datos['agente'] = user || this.state.agente;
        let url = action === 'nuevoNegocio' ? '/api/negocios/nuevo' : `/api/negocios/${cliente.negocios[item]._id}`;
        let method = action === 'nuevoNegocio' ? 'POST' : 'PUT';
        let myHeaders = {
            'Content-Type': 'application/json; charset=UTF-8',
        };
        fetch(url, {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(datos)
        })
            // .then(res => res.json())
            .then(result => {
                console.log('RESULT', result);
                clientActions(action, result)
            })
    }

    render() {
        const { classes, action } = this.props;
        return (
            <Paper className={classes.root} elevation={4}>

                <Dialog open={this.state.dialogOpen} onRequestClose={this.handleRequestClose.bind(this, false)}>
                    <DialogTitle>{"Confirmación de seguridad"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Estas a punto de modificar la base de datos, confirma por favor.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose.bind(this, false)} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleRequestClose.bind(this, true)} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
                <form className={classes.container} noValidate autoComplete="off">
                    <Paper className={classes.root} elevation={3}>
                        <Typography type="title" gutterBottom>
                            Información Ficha de Negocio
                        </Typography>
                        <TextField
                            id="nombre"
                            label="Nombre"
                            className={classes.textField}
                            value={this.state.nombre}
                            onChange={(e) => this.handleChange(e, 'nombre')}
                            margin="normal"
                            autoFocus={true}
                        />
                        <TextField
                            id="pais"
                            label="País"
                            className={classes.textField}
                            value={this.state.pais}
                            onChange={(e) => this.handleChange(e, 'pais')}
                            margin="normal"
                        />
                        <TextField
                            id="direccion"
                            label="Direccion"
                            className={classes.textField}
                            value={this.state.direccion}
                            onChange={(e) => this.handleChange(e, 'direccion')}
                            margin="normal"
                        />
                        <TextField
                            id="postal"
                            label="Postal"
                            className={classes.textField}
                            value={this.state.postal}
                            onChange={(e) => this.handleChange(e, 'postal')}
                            margin="normal"
                        />
                        <TextField
                            id="ciudad"
                            label="Ciudad"
                            className={classes.textField}
                            value={this.state.ciudad}
                            onChange={(e) => this.handleChange(e, 'ciudad')}
                            margin="normal"
                        />
                        <TextField
                            id="provincia"
                            label="Provincia"
                            className={classes.textField}
                            value={this.state.provincia}
                            onChange={(e) => this.handleChange(e, 'provincia')}
                            margin="normal"
                        />
                        <TextField
                            id="tlf"
                            label="Teléfono"
                            className={classes.textField}
                            value={this.state.tlf}
                            onChange={(e) => this.handleChange(e, 'tlf')}
                            margin="normal"
                        />
                        <TextField
                            id="categoria"
                            label="categoria"
                            className={classes.textField}
                            value={this.state.categoria}
                            onChange={(e) => this.handleChange(e, 'categoria')}
                            margin="normal"
                        />
                        <TextField
                            id="web"
                            label="Web"
                            className={classes.textField}
                            value={this.state.web}
                            onChange={(e) => this.handleChange(e, 'web')}
                            margin="normal"
                        />
                        {/*<TextField*/}
                            {/*id="horario"*/}
                            {/*label="Horario"*/}
                            {/*className={classes.textField}*/}
                            {/*value={this.state.horario}*/}
                            {/*onChange={(e) => this.handleChange(e, 'horario')}*/}
                            {/*margin="normal"*/}
                        {/*/>*/}

                        <FormControlLabel
                            control={<Input
                                id="fotos"
                                type="file"
                                placeholder="Fotos"
                                className={classes.input}
                                inputProps={{
                                    'aria-label': 'Fotos del negocio',
                                }}
                            />
                            }
                            label="Fotos"
                        />

                        {/*<TextField*/}
                            {/*id="frases"*/}
                            {/*label="Frases clave"*/}
                            {/*className={classes.textField}*/}
                            {/*value={this.state.frases}*/}
                            {/*onChange={(e) => this.handleChange(e, 'frases')}*/}
                            {/*margin="normal"*/}
                        {/*/>*/}
                        {/*<TextField*/}
                            {/*id="redes"*/}
                            {/*label="Redes"*/}
                            {/*multiline={true}*/}
                            {/*className={classes.textField}*/}
                            {/*value={this.state.redes}*/}
                            {/*onChange={(e) => this.handleChange(e, 'redes')}*/}
                            {/*margin="normal"*/}
                        {/*/>*/}
                    </Paper>
                    <Paper className={classes.root} elevation={3}>
                        {/*<Typography type="title" gutterBottom>*/}
                            {/*Detalles del Negocio*/}
                        {/*</Typography>*/}
                        <FormControlLabel
                            control={<Checkbox
                                checked={this.state.pagada}
                                onChange={(e) => this.handleChange(e, 'pagada')}
                                value={`${this.state.pagada}`}
                            />
                            }
                            label="Factura Pagada"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={this.state.activa}
                                onChange={(e) => this.handleChange(e, 'activa')}
                                value={`${this.state.activa}`}
                            />
                            }
                            label="Ficha Activa"
                        />
                        <TextField
                            id="producto"
                            label="Producto"
                            className={classes.textField}
                            value={this.state.producto}
                            onChange={(e) => this.handleChange(e, 'producto')}
                            margin="normal"
                        />
                        <TextField
                            id="descripcion"
                            label="Descripcion"
                            className={classes.textField}
                            value={this.state.descripcion}
                            onChange={(e) => this.handleChange(e, 'descripcion')}
                            margin="normal"
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="renovacion">Renovación</InputLabel>
                            <Select
                                value={this.state.renovacion}
                                onChange={(e) => this.handleChange(e, 'renovacion')}
                                input={<Input id="renovacion" />}
                            >
                                <MenuItem value={1}>Mensual</MenuItem>
                                <MenuItem value={3}>Trimestral</MenuItem>
                                <MenuItem value={6}>Semestral</MenuItem>
                                <MenuItem value={12}>Anual</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="estado">Estado</InputLabel>
                            <Select
                                value={this.state.estado}
                                onChange={(e) => this.handleChange(e, 'estado')}
                                input={<Input id="estado" />}
                            >
                                <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                                <MenuItem value={'En Proceso'}>En Proceso</MenuItem>
                                <MenuItem value={'Completada'}>Completada</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </form>
                <Button raised color="primary" className={classes.button} onClick={this.confirmForm.bind(this)} disabled={this.state.sendDisabled}>
                    { action === 'editarNegocio' ? 'Editar Negocio' : 'Añadir nuevo Negocio'}
                </Button>
            </Paper>
        )
    }
}

FormNegocios.PropTypes = {
    classes: PropTypes.object.isRequired,
    cliente: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    clientActions: PropTypes.func.isRequired,
};


export default withStyles(styles)(FormNegocios);