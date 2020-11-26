/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  PagingState,
  SortingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';


import { Loading } from '../theme-sources/material-ui/components/loading';
import { CurrencyTypeProvider } from '../theme-sources/material-ui/components/currency-type-provider';
import authHeader from  '../services/auth-header'


const URL ='https://secretaria-educacion.herokuapp.com/api/profesor/all' ;

export default () => {
  const [columns] = useState([
    { name: 'legajo', title: 'Legajo' },
    { name: 'nombre', title: 'Nombre' },
    { name: 'apellido', title: 'Apellido' },
    { name: 'fechaIngreso', title: 'Fecha Ingreso' },
    { name: 'fecha_nacimiento', title: 'Fecha Nacimiento' },
    { name: 'especialidad', title: 'Especialidad' },
  ]);
  const [rows, setRows] = useState([]);
  const [currencyColumns] = useState(['legajo']);
  const [tableColumnExtensions] = useState([
    { columnName: 'escuelas', width: 300 }
  ]);
  const [sorting, setSorting] = useState([{ columnName: 'nombre', direction: 'asc' }]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState();

  const changePageSize = (value) => {
    const totalPages = Math.ceil(totalCount / value);
    const updatedCurrentPage = Math.min(currentPage, totalPages - 1);

    setPageSize(value);
    setCurrentPage(updatedCurrentPage);
  };

  const getQueryString = () => {
    let queryString = `${URL}`;

    if (sorting.length) {
      const sortingConfig = sorting
        .map(({ columnName, direction }) => ({
          selector: columnName,
          desc: direction === 'desc',
        }));
      const sortingStr = JSON.stringify(sortingConfig);
      queryString = `${queryString}&sort=${escape(`${sortingStr}`)}`;
    }

    return queryString;
  };

  const loadData = () => {
    const queryString = getQueryString();
    if (queryString !== lastQuery && !loading) {
      setLoading(true);
      fetch(queryString,
        { headers: authHeader() }
        )
        .then(response => response.json())
        .then(({ list, totalCount: newTotalCount }) => {
          setRows(list);
          setTotalCount(newTotalCount);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setLastQuery(queryString);
    }
  };

  useEffect(() => loadData());

  return (
    <Paper style={{ position: 'relative' }}>
      <Grid
        rows={rows}
        columns={columns}
      >
        <CurrencyTypeProvider
          for={currencyColumns}
        />
        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={changePageSize}
        />
        <CustomPaging
          totalCount={totalCount}
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow showSortingControls />
        <PagingPanel
          pageSizes={pageSizes}
        />
      </Grid>
      {loading && <Loading />}
    </Paper>
  );
};

