import React from "react";
import  {Apiurl}  from "../services/apirest";
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

class Dashboard extends React.Component {

    state= {
        carros: [],
        modalInsertar: false,
        form: {
            id: "",
            conductor: "",
            entrada: "",
            salida: "",
            estado: "",
        }
    }

    modalInsertar=() => {
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    handleChange= async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    peticionPost=async()=>{
        let url = Apiurl + "IS/V1/carros";
       await axios.post(url, this.state.form)
        .then(response => {
            this.modalInsertar();
            this.componentDidMount();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    componentDidMount(){
        let url = Apiurl + "IS/V1/carros";
        axios.get(url)
        .then(response => {
            this.setState({
                carros : response.data.mensaje
            })
        })
    }

    clickCarro(id){
        let url = Apiurl + "IS/V1/carros/" + id;
        axios.put(url , {
               estado: false
        })
        .then(response => {
            this.setState({
                estado: false
            })
            console.log(response);
        })
    }

    render() {
        const {form} = this.state;
        return(

            <>
            <div className="d-flex flex-column align-items-center container-fluid"> 
            <button className="btn btn-success mt-5 w-50" onClick={() => this.modalInsertar()}>Ingresar Vehiculo</button>
            <table className="table w-100 mt-5 ms-5">
  <thead>
    <tr>
      <th scope="col">Placa</th>
      <th scope="col">Conductor</th>
      <th scope="col">Entrada</th>
      <th scope="col">Salida</th>
      <th scope="col">Estado</th>
      <th scope="col">Pago</th>
      <th scope="col">Funciones</th>
    </tr>
  </thead>
  <tbody>
      {this.state.carros.map((value, index) => {
          return (
            <tr key={index}>
                <td>{value.id}</td>
                <td>{value.conductor}</td>
                <td>{value.entrada}</td>
                <td>{value.salida}</td>
                <td>{value.estado ? "parqueado" : "salio"}</td>
                <td>{new Intl.NumberFormat("en-EN").format(value.pago)}</td>
                <td>
                    <button className="btn btn-danger me-4" onClick={() => this.clickCarro(value.id)}>Sacar carro</button>
                </td>
            </tr>
          )
      })}
    
  </tbody>
</table>

<Modal isOpen={this.state.modalInsertar}>
    <ModalHeader style={{display: "block"}}>
        <span style={{float: "right"}}>x</span>
    </ModalHeader>
    <ModalBody>
        <div className="form-group">
            <label html for="id">Placa</label>
            <input className= "form-control" type="text" name="id" onChange={this.handleChange} value={form.id}/>
            <br/>
            <label html for="conductor">Conductor</label>
            <input className= "form-control" type="text" name="conductor" onChange={this.handleChange} value={form.conductor}/>
            <br/>
            <label html for="entrada">Entrada</label>
            <input className= "form-control" type="text" name="entrada" readOnly onChange={this.handleChange} value={form.entrada}/>
            <br/>
            <label html for="salida">Salida</label>
            <input className= "form-control" type="text" name="salida" readOnly onChange={this.handleChange} value={form.salida}/>
            <br/>
            <label html for="estado">Estado</label>
            <input className= "form-control" type="text" name="estado" readOnly onChange={this.handleChange} value={form.estado}/>
            <br/>
        </div>
    </ModalBody>

    <ModalFooter>
        <button className= "btn btn-success" onClick={() => this.peticionPost()}>
            Insertar
        </button>
        <button className= "btn btn-danger" onClick={() => this.modalInsertar()}>
            Cancelar
        </button>
    </ModalFooter>
</Modal>
</div>
</>
        )
    }
}

export default Dashboard;