import React, { Component, Fragment } from "react";
import { get,put,delet} from "../services/Axios1";

import Busqueda from "./Busqueda";




// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button, 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label
} from "reactstrap";




class Escuela extends React.Component {
    constructor(props)
  {
    super(props)
    this.setModalEditar=this.setModalEditar.bind(this);
    this.setAbono=this.setAbono.bind(this);
    this.setIdDelete=this.setIdDelete.bind(this);
    this.valorSearchEmpresa=this.valorSearchEmpresa.bind(this);
    this.setModalCrear=this.setModalCrear.bind(this);
     //this.setEmpresa=this.setEmpresa.bind(this);
   
    this.escuela=[];

    this.state = {
      selectedOption: null,
          
          listBusquedaEscuela:[],
          listEscuela:[],
          idEscuela:"",
          nombre: "",
          diegep: "",
          suvencion: "",
         
          modalEditar:false,
          modalEliminar:false,
          editarModal:true,
          modalCrear:false
    }
    
  }


    setAbono(elemento,caso){
           if (caso === 'Editar'){
                this.setState({editarModal:false})
            }else{
                this.setState({editarModal:true})
            }
    this.setState((state) => ({
          
          idEscuela:elemento.idEscuela,
          nombre:elemento.nombre,
          diegep: elemento.diegep,
          suvencion: elemento.suvencion,
         
          ie:'',
          ide:'',
          busqueda:'',
          modalEditar:true
    }))
     
        
 }

 setModalCrear(){
     this.setState({
        idEscuela:"",
        nombre: "",
        diegep: "",
        suvencion: "",
        busqueda:"",
        modalCrear:!this.state.modalCrear,
    });

   }

  setModalEliminar(){
    this.setState({modalEliminar:!this.state.modalEliminar})
  }
  
  setIdDelete(i,id){
      this.setState({
        ie:i,
        ide:id,
        modalEliminar:true
      })
  }

  async resetLista(){

    const res = await get('https://secretaria-educacion.herokuapp.com/api/escuela/all')
    console.log('res');
    console.log(res);
    if (res.success) {
       this.setState({listEscuela:res.list})
       this.filtrarElementos();
    }
    else {
      alert("Error server ==>"+JSON.stringify(res))
    }

  }

  async onClickSave()
  {
    const urlUpdate='https://secretaria-educacion.herokuapp.com/api/escuela/create/';
    let paramUpdate;
      if(this.state.escuelas === null){
        paramUpdate={
          idEscuela:0,
          nombre: this.state.nombre,
          diegep: this.state.diegep,
          suvencion: this.state.suvencion,
          
         
        }
      }else{
        
         paramUpdate={
            idEscuela:0,
            nombre: this.state.nombre,
            diegep: this.state.diegep,
            suvencion: this.state.suvencion,
         
        }
      }
    await put(urlUpdate,paramUpdate);
    this.setState({modalCrear:false});
    this.resetLista();
    this.filtrarElementos();
  }


  async onClickDelete()
  {
  
   const id=this.state.ide;
    const i=this.state.ie;
    var yes = true;
    console.log(id,i);
    const urlDelete='https://secretaria-educacion.herokuapp.com/api/escuela/delete/'+id;
    if (yes === true){ 
      
      await delet(urlDelete)
      
      
        
        const list =this.state.listBusquedaEscuela
        list.splice(i,1)
         this.setState((state)=>({listBusquedaEscuela:list,
                      modalEliminar:false
        }))
        this.resetLista();
        this.filtrarElementos();
    }
  }

  setModalEditar(){

    this.setState({
        modalEditar:!this.state.modalEditar
    })
  };

    async onClickUpdate(){
      const urlUpdate='https://secretaria-educacion.herokuapp.com/api/escuela/create/';
      let paramUpdate;
      if(this.state.escuelas === null){
        paramUpdate={
            idEscuela:this.state.idEscuela,
            nombre: this.state.nombre,
            diegep: this.state.diegep,
            suvencion: this.state.suvencion,
         
        }
      }else{
        
         paramUpdate={
            idEscuela:this.state.idEscuela,
            nombre: this.state.nombre,
            diegep: this.state.diegep,
            suvencion: this.state.suvencion,
        }
      }
     
      await put(urlUpdate,paramUpdate);
     this.setState({modalEditar:false});
       this.resetLista();
        this.filtrarElementos();
   }
    
  

  
  
 async valorSearchEmpresa(emp){
  console.log('emp')
  console.log(emp)
   await this.setState({busqueda:emp})
  // this.setState((state) => ({busqueda:state.busqueda}));
  this.filtrarElementos();
 }

 filtrarElementos=()=>{
   
  const lista=this.state.listEscuela;
  var search=lista.filter(item=>{
    if(item.idEscuela.toString().includes(this.state.busqueda)//||
      // item.nombre.includes(this.state.busqueda)//||
       //item.idEmpresa.nombre.includes(this.state.busqueda)||
       //item.idTecnico.nombre.toLowerCase().includes(this.state.busqueda)||
       //item.idTecnico.nombre.includes(this.state.busqueda)
       )
  
            {
              return item
            }
  })
  console.log('busqueda')
    console.log(search)
    this.setState({listBusquedaEscuela:search})
 }
  
  async componentDidMount(){

    this.setState({listBusquedaProfesor:this.state.listProfesor});
    console.log("Mounted List");
    const res = await get('https://secretaria-educacion.herokuapp.com/api/escuela/all')
    console.log(res);
    if (res.success) {
      this.setState({listEscuela:res.list})
    }
    else {
      alert("Error server ==>"+JSON.stringify(res))
    }


  /*  console.log("Mounted listTecnico");
    const rest = await tecnicoServices.list()
    console.log(rest);
    if (rest.success) {
      this.setState({listTecnico:rest.list})
    }
    else {
      alert("Error server ==>"+JSON.stringify(rest))
    }*/
 this.setState({listBusquedaEscuela:this.state.listEscuela});
 
  
  }

  


  render() 
  {
      
      const editarModal=this.state.editarModal;
       //const nombreEmpresa=this.state.escuelas.nombre;
      //const nombreTecnico=this.state.idTecnico.nombre;
      //const URLactual ="https://radiant-beach-44502.herokuapp.com/";
     // const baseUrl =URLactual+"/api/abono/pdfReport/";
  
    return (
      <>
        
       
                    
        <div className="content">
          <Row>
            <Col md="12">
            
              <Card>
                <CardHeader>
                  
                  <div class="row ">
                  <div class="form-group col-md-4 ">
                  <CardTitle tag="h4">Escuela</CardTitle>
                  </div>
                    <div class="form-group col-md-4 ">
                    <Busqueda searchBusqueda={this.valorSearchEmpresa}/>
                            </div>
                  <div class="form-group col-md-4  ">
                    <Button  onClick={this.setModalCrear}  size="lg">
                    <i class="fas fa-plus" onClick={this.setModalCrear}></i>
                    </Button>
                    </div>
                    </div>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nombre</th>
                        <th>Diegep</th>
                        <th>Suvencion</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      {
              this.state.listBusquedaEscuela.map((data,i)=>{
                return(
                  <tr>
                    <th scope="row">{data.nombre}</th>
                    <td>{data.diegep}</td>
                    <td>{data.suvencion}</td>
                    
                    <td>
                           <Button className="btn-icon" color="info" size="sm"
                           onClick={()=>{this.setAbono(data,'Ver')}} 
                        href="#">
                          <i className="fas fa-eye" />
                          </Button>{` `}
                           
                         <Button  className="btn-icon" color="success" size="sm"
                          onClick={()=>{this.setAbono(data,'Editar')}} 
                         >
                          <i className="fas fa-pencil-alt"></i>
                         </Button>{` `}

                          <Button className="btn-icon" color="danger" size="sm" 
                        href="#" onClick={()=>this.setIdDelete(i,data.idEscuela)}>
                          <i className="fas fa-trash-alt" />
                          </Button>{'  '}

                          
                      
                    </td>
                  </tr>
                )
              })
            }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
       
          </div>
           <Modal  isOpen={this.state.modalEditar} toggle={this.setModalEditar} size="lg" >
                <div className="modal-header">
                  <h3 className="modal-title" id="exampleModalLabel">
                   Escuelas
                  </h3>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    onClick={this.setModalEditar}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </div>
                <ModalBody >
                <div class="border border-info my-2 p-2"> 
                    <div class="row ">
                    <div class="form-group col-md-4  ">
                     <label>Nombre</label>
                      <input
                        className="form-control bg-white text-dark "
                        readOnly={editarModal}
                        type="text"
                        name="nombre"
                        value={this.state.nombre}
                        onChange={(value)=>this.setState({nombre:value.target.value})}
                      /> 
                      </div> 
                    <div class="form-group col-md-4 ">
                     <label>Diegep</label>
                      <input
                        className="form-control bg-white text-dark "
                        readOnly={editarModal}
                        type="text"
                        name="diegep"
                        value={this.state.diegep}
                        onChange={(value)=>this.setState({diegep:value.target.value})}
                      /> 
                      </div>
                     <div class="form-group col-md-4 ">
                      <label>Suvencion</label>
                      <input
                        className="form-control bg-white text-dark"
                        readOnly={editarModal}
                        type="text"
                        name="suvencion"
                        value={this.state.suvencion}
                        onChange={(value)=>this.setState({suvencion:value.target.value})}
                      /> 
                      </div>

                   
                    </div> 
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.setModalEditar}>
                        Cerrar
                    </Button>
                    <Button color="warning" disabled={editarModal} 
                    onClick={()=>this.onClickUpdate()}>
                        Update
                    </Button>
                   
                </ModalFooter>
            </Modal> 
            <Modal isOpen={this.state.modalEliminar} toggle={this.setModalEliminar}>
                <ModalBody>
                  Estás Seguro que deseas eliminar Abono
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.onClickDelete()}>
                    Sí
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={()=>{this.setState({modalEliminar:false})}}
                  >
                    No
                  </button>
                </ModalFooter>
              </Modal>

              <Modal  isOpen={this.state.modalCrear} toggle={this.setModalCrear} size="lg" >
              <div className="modal-header">
                  <h3 className="modal-title" id="exampleModalLabel">
                   Escuelas
                  </h3>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    onClick={this.setModalEditar}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </div>
                <ModalBody >
                <div class="border border-info my-2 p-2"> 
                    <div class="row ">
                    <div class="form-group col-md-4  ">
                     <label>Nombre</label>
                      <input
                        className="form-control bg-white text-dark "
                        
                        type="text"
                        name="nombre"
                        value={this.state.nombre}
                        onChange={(value)=>this.setState({nombre:value.target.value})}
                      /> 
                      </div> 
                    <div class="form-group col-md-4 ">
                     <label>Diegep</label>
                      <input
                        className="form-control bg-white text-dark "
                        
                        type="text"
                        name="diegep"
                        value={this.state.diegep}
                        onChange={(value)=>this.setState({diegep:value.target.value})}
                      /> 
                      </div>
                     <div class="form-group col-md-4 ">
                      <label>Suvencion</label>
                      <input
                        className="form-control bg-white text-dark"
                        
                        type="text"
                        name="suvencion"
                        value={this.state.suvencion}
                        onChange={(value)=>this.setState({suvencion:value.target.value})}
                      /> 
                      </div>

                   
                    </div> 
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.setModalCrear}>
                        Cerrar
                    </Button>
                    <Button color="warning" 
                    onClick={()=>this.onClickSave()}>
                        Guardar
                    </Button>
                   
                </ModalFooter>
            </Modal> 
          </>
    )
  }
  }

export default Escuela;