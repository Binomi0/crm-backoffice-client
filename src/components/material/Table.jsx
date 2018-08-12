/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import ViewIcon from 'material-ui-icons/RemoveRedEye';
import SearchIcon from 'material-ui-icons/Search';
import YoutubeSearched from 'material-ui-icons/YoutubeSearchedFor';

class EnhancedTableHead extends React.Component {
    static PropTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        columnData: PropTypes.array.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, columnData } = this.props;
        // console.log(columnData);

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        {/*<Checkbox*/}
                            {/*indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                            {/*checked={numSelected === rowCount}*/}
                            {/*onChange={onSelectAllClick}*/}
                        {/*/>*/}
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                <Tooltip title="Ordenar" placement="bottom-start" enterDelay={300}>
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
            color: theme.palette.secondary.A700,
            backgroundColor: theme.palette.secondary.A100,
        }
            : {
            color: theme.palette.secondary.A100,
            backgroundColor: theme.palette.secondary.A700,
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    }
});

let EnhancedTableToolbar = props => {
    // console.log(props);
    const { numSelected, classes, itemClicked, text, handleTextChange, showSearch, search, select, changeSelect, filters } = props;

    function selectItemClicked(item, action) {
        itemClicked(item, action)
        // view(e)
    }

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > -1,
            })}
        >
            <div className={classes.title}>
                {numSelected > -1 ? (
                    <Typography type="subheading">{props.title} seleccionado</Typography>
                ) : (
                    <Typography type="title">Lista de {props.title}s</Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > -1 ? (
                    <div style={{display: 'flex'}}>
                        <Tooltip title="Ver">
                            <IconButton aria-label="Ver" onClick={() => selectItemClicked(numSelected, 'ver')}>
                                <ViewIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                            <IconButton aria-label="Editar" onClick={() => selectItemClicked(numSelected, 'editar')}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Borrar">
                            <IconButton aria-label="Borrar" onClick={() => alert('¡Aquí no se toca!')}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : (
                    <div style={{display: 'flex'}}>
                        {
                            search ? <div style={{display: 'flex'}}>
                                {/*<form className={classes.container} autoComplete="off">*/}
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="columns">Filtrar por</InputLabel>
                                        <Select
                                            value={select}
                                            onChange={(e) => changeSelect(e)}
                                            input={<Input id="columns" />}
                                        >
                                            {
                                                filters.map((item, index) => {
                                                    if (index > 0) {
                                                        return <MenuItem key={index} value={item} >{item}</MenuItem>
                                                    } else return null

                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        id="text"
                                        label="Escribir aquí..."
                                        className={classes.textField}
                                        value={text}
                                        onChange={(e) => handleTextChange(e)}
                                        // helperText={`Se filtrarán los resultados por ${select.toUpperCase()}`}
                                        // margin="normal"
                                    />
                                {/*</form>*/}
                                <Tooltip title="Ocultar">
                                    <IconButton aria-label="Ocultar" onClick={() => showSearch()}>
                                        <YoutubeSearched />
                                </IconButton>
                            </Tooltip>
                            </div>
                            : <div style={{display: 'flex'}}>
                                <Tooltip title="Realizar Búsqueda" placement="left" enterDelay={200}>
                                    <IconButton aria-label="Buscar" onClick={() => showSearch()}>
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        }
                    </div>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,

};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});


class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: props.columnData[0].id,
            selected: -1,
            data: [],
            page: 0,
            rowsPerPage: 5,
            text: '',
            search: false,
            select: 'nombre'
        };
        this.itemSelected = this.itemSelected.bind(this)
    }

    componentWillMount() {
        let { data, columnData } = this.props;
        // console.log('Montando tabla con: ', data);
        let newArray = [];
        for (let i = 0; i < data.length; i++) {
            // console.log(typeof data[0][i][columnData[2]['id']], data[0][i][columnData[2]['id']]);
            let datos = {
                id: data[i]['id'],
                [columnData[0]['id']]: data[i][columnData[0]['id']],
                [columnData[1]['id']]: data[i][columnData[1]['id']],
                // [columnData[2]['id']]: data[i][columnData[2]['id']],
                [columnData[2]['id']]: typeof data[i][columnData[2]['id']] === 'string' ? data[i][columnData[2]['id']] : typeof data[i][columnData[2]['id']] === 'object' ? data[i][columnData[2]['id']].length : '',
                [columnData[3]['id']]: typeof data[i][columnData[3]['id']] === 'string' ? data[i][columnData[3]['id']] : typeof data[i][columnData[3]['id']] === 'object' ? data[i][columnData[3]['id']].length : '',
                [columnData[4]['id']]: typeof data[i][columnData[4]['id']] === 'string' ? data[i][columnData[4]['id']] : typeof data[i][columnData[4]['id']] === 'object' ? data[i][columnData[4]['id']].length : ''
            };
            newArray.push(datos);
        }
        this.setState({ data: newArray })
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        // if (checked) {
        //     this.setState({ selected: this.state.data.map(n => n.id) });
        //     return;
        // }
        // this.setState({ selected: [] });
    };

    handleKeyDown = (event, id, i) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id, i);
        }
    };

    handleClick = (event, id) => {

        if (event.target.checked === false) {
            this.setState({ selected: -1 })
        } else {
            this.setState({ selected: id });
        }
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    // isSelected = id => this.state.selected.indexOf(id) !== -1;
    isSelected = id => this.state.selected === id ;

    // viewData(e) {
    //     this.props.itemSelected(e)
    // }

    itemSelected(item, action) {
        this.props.itemSelected(item, action)
    }

    handleTextChange = (evt) => {
        this.setState({ text: evt.target.value })
    };

    showSearch = () => this.setState({ search: !this.state.search });

    changeSelect = (evt) => { this.setState({ select: evt.target.value }) };

    render() {
        // console.log(this.state.data[this.state.selected]);
        const { classes, title, columnData} = this.props;
        const { data,  order, orderBy, selected, rowsPerPage, page, select } = this.state;
        if (this.state.data.length <= 0) { return <div> </div> } else {
            return (
                <Paper className={classes.root}>
                    <EnhancedTableToolbar
                        numSelected={selected}
                        title={title}
                        data={data}
                        itemClicked={this.itemSelected}
                        text={this.state.text}
                        handleTextChange={this.handleTextChange.bind(this)}
                        search={ this.state.search }
                        showSearch={this.showSearch.bind(this)}
                        select={this.state.select}
                        changeSelect={this.changeSelect.bind(this)}hola adolfisss
                        filters={ Object.keys(data[0]) }
                    />
                    <div className={classes.tableWrapper}>
                        <Table>
                            <EnhancedTableHead
                                numSelected={selected}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data ? data.length : []}
                                columnData={columnData}
                            />
                            <TableBody>
                                {data.filter((t) => {
                                    return t[select].toLowerCase().indexOf(this.state.text.toLowerCase()) > -1
                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            onKeyDown={event => this.handleKeyDown(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell padding="none">{n[columnData[0].id]} </TableCell>
                                            <TableCell padding="none">{n[columnData[1].id]}</TableCell>
                                            <TableCell padding="none">{n[columnData[2].id]}</TableCell>
                                            <TableCell padding="none">{n[columnData[3].id]}</TableCell>
                                            <TableCell padding="none">{n[columnData[4].id]}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    labelRowsPerPage="Filas por página"
                                />
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
            );
        }
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    columnData: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default withStyles(styles)(EnhancedTable);