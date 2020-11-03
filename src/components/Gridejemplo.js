import React from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {useGetProfe} from '../services/Consulta'


export default () => {
    const columns = [
        { name: 'legajo', title: 'Legajo' },
        { name: 'nombre', title: 'Nombre' },
        { name: 'apellido', title: 'Apellido' },
      ];
      const rows = useGetProfe();
    return(
        <div className="card">
        <Grid
          rows={rows}
          columns={columns}
        >
          <Table />
          <TableHeaderRow />
        </Grid>
      </div>

    );
}
 
