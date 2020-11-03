import {
    AggregateFunctions,
    ColumnDataType,
    ColumnSortDirection,
    createColumn
  } from "tubular-common";
  
  const columns = [
    createColumn("legajo", {
      dataType: ColumnDataType.String,
      filterable: true,
      isKey: true,
      label: "Legajo",
      sortDirection: ColumnSortDirection.Ascending,
      sortOrder: 1,
      sortable: true
    }),
    createColumn("nombre", {
      aggregate: AggregateFunctions.Count,
      filterable: true,
      searchable: true,
      sortable: true
    }),
    createColumn("apellido", {
      dataType: ColumnDataType.String,
      filterable: true,
      sortable: true
    })
  ];
  export default columns;