/* eslint-disable flowtype/require-valid-file-annotation */

// import Divider from 'material-ui/Divider';
// import List, { ListItem, ListItemText } from 'material-ui/List';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import FormNegocios from '../forms/FormNegocios';
import FormLlamadas from '../forms/FormLlamadas';
import FormClientes from '../forms/FormClientes';
import FormTareas from '../forms/FormTareas';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {

    state = {
        open: true,
    };

    handleRequestClose = (action) => {
        this.setState({ open: false });
        this.props.toggleItems(action)
    };

    render() {
        const { classes, cliente, user, type, action,  clientActions, item } = this.props;
        return (
            <div>

                {/*<Button onClick={this.handleClickOpen}>Open full-screen dialog</Button>*/}
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={() => this.handleRequestClose(action)}
                    transition={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={() => this.handleRequestClose(action)} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                {type}
                            </Typography>
                            <Button color="contrast" onClick={clientActions}>
                                Guardar
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {
                        type === 'Nuevo Negocio' || type === 'Editar Negocio'
                            ? <FormNegocios
                                clientActions={clientActions}
                                cliente={cliente}
                                action={action}
                                user={user}
                                item={item}
                            />
                            : ''
                    }

                    {
                        type === 'Nueva Llamada' || type === 'Editar Llamada'
                            ? <FormLlamadas
                                clientActions={clientActions}
                                cliente={cliente}
                                action={action}
                                user={user}
                                item={item}
                            />
                            : ''
                    }

                    {
                        type === 'Nueva Tarea' || type === 'Editar Tarea'
                            ? <FormTareas
                                clientActions={clientActions}
                                cliente={cliente}
                                action={action}
                                user={user}
                                item={item}
                        />
                            : ''
                    }

                    {
                        type === 'Nuevo Cliente' || type === 'Editar Cliente'
                            ? <FormClientes
                                clientActions={clientActions}
                                cliente={cliente}
                                action={action}
                                user={user}
                                item={item}
                        />
                            : ''
                    }
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    cliente: PropTypes.object.isRequired,
    // user: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    clientActions: PropTypes.func.isRequired

};

export default withStyles(styles)(FullScreenDialog);