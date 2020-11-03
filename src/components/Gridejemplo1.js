import React, { useState,useEffect } from 'react';
import * as PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {
    RowDetailState, 
    SortingState,
    IntegratedSorting ,
    FilteringState,
    DataTypeProvider,
    IntegratedFiltering
        } from '@devexpress/dx-react-grid';
        
import {
    Grid,
    Table,
    TableHeaderRow,
    TableGroupRow,
    GroupingPanel,
    TableSummaryRow,
    TableSelection,
    DragDropProvider,
    TableFilterRow,
    Toolbar,
    ExportPanel,
    TableRowDetail,
   
  } from '@devexpress/dx-react-grid-material-ui';
  import Input from '@material-ui/core/Input';
  import { withStyles } from '@material-ui/core/styles';
  import DateRange from '@material-ui/icons/DateRange';

import {useGetProfe} from '../services/Consulta';

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
  <div>
    Detalles 
    {' '}
    {row.nombre}
    {' '}
    para
    {' '}
    {row.apellido}
    {' '}
    {row.idEscuela.nombre}
  </div>
);
    
    const Tabla2 =  () => {
    const escuela=({ row }) => (
        row.idEscuela.nombre
    )
          
    
    const [rows,setRows] = useState([useGetProfe]);
    const [expandedRowIds, setExpandedRowIds] = useState([]);
    console.log("data")
    console.log(useGetProfe())
    console.log(rows)
    
    const [columns] = useState([
    { name: 'nombre', title: 'Nombre' },
    { name: 'apellido', title: 'Apellido' },
    { name: 'especialidad', title: 'Especialidad' },
    { name: 'nombres', title: 'Escuela' , getCellValue: row =>row.idEscuela.nombre }
   ]);
    const [sorting, setSorting] = useState([{ columnName: 'nombre', direction: 'asc' }]);
    const [dateColumns] = useState(['saleDate']);
    const [dateFilterOperations] = useState(['month', 'contains', 'startsWith', 'endsWith']);
    const [currencyColumns] = useState(['amount']);
    const [currencyFilterOperations] = useState([
        'equal',
        'notEqual',
        'greaterThan',
        'greaterThanOrEqual',
        'lessThan',
        'lessThanOrEqual',
    ]);
    const [filteringColumnExtensions] = useState([
    {
      columnName: 'saleDate',
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        if (filter && filter.operation === 'month') {
          const month = parseInt(value.split('-')[1], 10);
          return month === parseInt(filter.value, 10);
        }
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ]);

  return (
    <Paper>
      <Grid
        rows={useGetProfe()}
        columns={columns}
        
      >
        
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

        <Table />
        
        <TableHeaderRow showSortingControls />
        <TableFilterRow
          showFilterSelector
          iconComponent={FilterIcon}
          messages={{ month: 'Month equals' }}
        />
        <TableRowDetail
          contentComponent={RowDetail}
        />
         <Toolbar />
        
        <ExportPanel/>
      </Grid>
    </Paper>
  );
};
export default Tabla2

