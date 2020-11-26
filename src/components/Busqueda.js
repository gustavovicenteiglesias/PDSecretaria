import React from 'react';

class Busqueda extends React.Component{
    constructor(props) {
        super(props);
        this.handleChangeEmpresa=this.handleChangeEmpresa.bind(this);
        this.state = {
            
        };
    }
   

     handleChangeEmpresa(e){
    this.props.searchBusqueda(e.target.value);
   
   
  }
    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-light bg-black">
  
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" 
      placeholder="Buscar" aria-label="Search"
      onChange={this.handleChangeEmpresa}
      />
      
    </form>
  
</nav>
        );
    }
}
export default Busqueda