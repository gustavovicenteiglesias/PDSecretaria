import * as React from "react";
import { DataGrid, ToolbarOptions } from "tubular-react";
import columns from "../services/ColumProfe";
import { LocalStorage } from "tubular-common";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import {useGetProfe} from "../services/Consulta";

const LocalDataGrid: React.FunctionComponent = () => {
  const [getErrorMessage, setErrorMessage] = React.useState(null as unknown as string);
  const mobileBreakpointWidth = 800;
  const datos= useGetProfe();
  const [data, setData] = React.useState();
  console.log(datos)
  
  const rowClick = (row: {}) => {
    console.log("You clicked on a row: ", row);
  };

  const handleAddRow = () => {
   
  };

  const toolbarOptions = new ToolbarOptions({
    customItems: <Button onClick={handleAddRow}>Add new row</Button>
  });

  return (
    <div className="root">
      {getErrorMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          style={{ paddingTop: "10px" }}
          open={true}
          ContentProps={{ "aria-describedby": "message-id" }}
          message={<span id="message-id">{getErrorMessage}</span>}
        />
      )}
      <DataGrid
        columns={columns}
        dataSource={datos}
        gridName="LocalDataGrid"
        storage={new LocalStorage()}
        onError={setErrorMessage}
        toolbarOptions={toolbarOptions}
        onRowClick={rowClick}
        mobileBreakpointWidth={mobileBreakpointWidth}
      />
    </div>
  );
};

export default LocalDataGrid;
