import React, { useState ,useEffect,useRef,useCallback} from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { EditingState ,
  RowDetailState, 
    SortingState,
    IntegratedSorting ,
    FilteringState,
    DataTypeProvider,
    IntegratedFiltering,
    TreeDataState,
    CustomTreeData,
    SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
} from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';  
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableGroupRow,
    GroupingPanel,
    TableSummaryRow,
    TableSelection,
    DragDropProvider,
    TableFilterRow,
    Toolbar,
    ExportPanel,
    TableRowDetail,
    TableTreeColumn,
    PagingPanel,
    TableColumnVisibility,
    ColumnChooser
} from '@devexpress/dx-react-grid-material-ui';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiGrid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
//import DateFnsUtils from '@date-io/date-fns'
import { get } from "../services/Axios1";
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import DateRange from '@material-ui/icons/DateRange';
import * as PropTypes from 'prop-types';
import saveAs from 'file-saver';
/* eslint-disable no-shadow */

const FilterIcon = ({ type, ...restProps }) => {
  if (type === 'month') return <DateRange {...restProps} />;
  return <TableFilterRow.Icon type={type} {...restProps} />;
};

const styles = theme => ({
  root: {
    margin: theme.spacing(1),
  },
  numericInput: {
    fontSize: '14px',
    textAlign: 'right',
    width: '100%',
  },
});

const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
  const handleChange = (event) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange();
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type="number"
      classes={{
        input: classes.numericInput,
        root: classes.root,
      }}
      fullWidth
      value={value === undefined ? '' : value}
      inputProps={{
        min: 0,
        placeholder: 'Filter...',
      }}
      onChange={handleChange}
    />
  );
};

CurrencyEditorBase.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

CurrencyEditorBase.defaultProps = {
  value: undefined,
};

const CurrencyEditor = withStyles(styles)(CurrencyEditorBase)

const RowDetail = ({ row }) => (
row.escuelas.map((data,i)=>{
  return(
   
    <div>
     
   {data.nombre}
  </div>
  )
})

);

const Popup = ({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) => (
  <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
    <DialogContent>
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="nombre"
              label="Nombre"
              value={row.nombre || ''}
              onChange={onChange}
            />
            <TextField
            type="number"
              margin="normal"
              name="legajo"
              label="Legajo"
              value={row.legajo}
              onChange={onChange}
            />
            <TextField
              margin="normal"
              name="especialidad"
              label="Especialidad"
              value={row.especialidad || ''}
              onChange={onChange}
            />
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="apellido"
              label="Apellido"
              value={row.apellido || ''}
              onChange={onChange}
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                label="Fecha Nacimiento"
                margin="normal"
                value={row.fecha_nacimiento}
                onChange={(_, value) => onChange({
                  target: { name: 'fecha_nacimiento', value },
                })}
                format="DD/MM/YYYY"
              />
            </MuiPickersUtilsProvider>
            
          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancelChanges} color="primary">
        Cancel
      </Button>
      <Button onClick={onApplyChanges} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

const PopupEditing = React.memo(({ popupComponent: Popup }) => (
  <Plugin>
    <Template name="popupEditing">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
            stopEditRows, cancelAddedRows, cancelChangedRows,
          },
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow;
          let rowId;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
             
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
));

const getRowId = row => row.id;
export default () => {
  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);
  const [selection, setSelection] = useState([]);
      console.log("Selection")
      console.log(selection)
      const onSave = (workbook) => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
        });
      };

  const URL='https://secretaria-educacion.herokuapp.com/api/profesor/all';
  const [rows,setRows] = useState([]);
  const getData = async () => {
    const  {list} = await get(URL);
    setRows(list)
    }
    useEffect(()=>{
      getData()
     console.log("paso por aca")
},[]);
const [columns] = useState([
  { name: 'legajo', title: 'Legajo' },
  { name: 'nombre', title: 'Nombre' },
  { name: 'apellido', title: 'Apellido' },
  { name: 'fechaIngreso', title: 'Fecha Ingreso' },
  { name: 'fecha_nacimiento', title: 'Fecha Nacimiento' },
  { name: 'especialidad', title: 'Especialidad' },
  
 ]);
 const [expandedRowIds, setExpandedRowIds] = useState([]);
 const [sorting, setSorting] = useState([{ columnName: 'nombre', direction: 'asc' }]);
 const [dateColumns] = useState(['fechaIngreso','fecha_nacimiento']);
 const [dateFilterOperations] = useState(['month', 'contains', 'startsWith', 'endsWith']);
 const [currencyColumns] = useState(['legajo']);
 const [currencyFilterOperations] = useState([
     'equal',
     'notEqual',
     'greaterThan',
     'greaterThanOrEqual',
     'lessThan',
     'lessThanOrEqual',
 ]);
 const [tableColumnExtensions] = useState([
   { columnName: 'escuelas', width: 300 },
 ]);

 const [filteringColumnExtensions] = useState([
 {
   columnName: 'fechaIngreso',
   predicate: (value, filter, row) => {
     if (!filter.value.length) return true;
     if (filter && filter.operation === 'month') {
       const month = parseInt(value.split('-')[1], 10);
       return month === parseInt(filter.value, 10);
     }
     return IntegratedFiltering.defaultPredicate(value, filter, row);
   },
 },
 {
     columnName: 'fecha_nacimiento',
     predicate: (value, filter, row) => {
       if (!filter.value.length) return true;
       if (filter && filter.operation === 'month') {
         const month = parseInt(value.split('-')[1], 10);
         return month === parseInt(filter.value, 10);
       }
       return IntegratedFiltering.defaultPredicate(value, filter, row);
     },
   }
]);
const [hiddenColumnNames, setHiddenColumnNames] = useState(['nombre', 'apellido']);

  const commitChanges = ({ added, changed }) => {
    let changedRows;
    let changedRow;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row) );
     console.log(Object.keys.length)
     changedRow=Object.keys.length
      
    }
    setRows(changedRows);
    console.log(changedRows[changedRow])
  };

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <PagingState
            defaultCurrentPage={0}
            pageSize={6}
          />
          <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          />
          <IntegratedPaging />
          <IntegratedSelection />
          
        <RowDetailState
          expandedRowIds={expandedRowIds}
          onExpandedRowIdsChange={setExpandedRowIds}
        />

        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
         <IntegratedSorting />
         <DataTypeProvider
          for={dateColumns}
          availableFilterOperations={dateFilterOperations}
        />
        <DataTypeProvider
          for={currencyColumns}
          availableFilterOperations={currencyFilterOperations}
          editorComponent={CurrencyEditor}
        />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <Table />
        <TableHeaderRow />

        <TableEditColumn
          showAddCommand
          showEditCommand
        />
 <TableFilterRow
          showFilterSelector
          iconComponent={FilterIcon}
          messages={{ month: 'Mes igual',
                    contains: 'Contiene' ,
                    notContains: 'No contiene',
                    equal:'Igual',
                    notEqual: 'No es igual' ,
                    endsWith:'Termina con',
                    startsWith: 'Empieza',
                    greaterThan: 'Mayor ',
                    lessThan:'Menor ',
                    lessThanOrEqual:'Menor o igual',
                    greaterThanOrEqual:'Mayor igual'
                     }}
        />
         <TableColumnVisibility
          hiddenColumnNames={hiddenColumnNames}
          onHiddenColumnNamesChange={setHiddenColumnNames}
        />
        <TableRowDetail
          contentComponent={RowDetail}
        />
          <TableSelection showSelectAll  />
          <PagingPanel />
      
         <Toolbar />
         <ColumnChooser />
        <ExportPanel startExport={startExport}/>

        <PopupEditing popupComponent={Popup} />
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
       
        selection={selection}
        sorting={sorting}
        onSave={onSave}
      />
    </Paper>
  );
};