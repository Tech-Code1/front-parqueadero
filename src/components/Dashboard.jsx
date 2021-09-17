import React from "react";
import  {Apiurl}  from "../services/apirest";
import axios from 'axios';

class Dashboard extends React.Component {

    state= {
        carros: []
    }

    clickCarro(id){
        let url = Apiurl + "IS/V1/carros/" + id;
        axios.put(url , {
            estado:true
        })
        .then(response => {
            this.setState({
                /* carros : response.data.mensaje.estado = true  */
            })
            console.log(response);
        })
    }

    componentDidMount(){
        let url = Apiurl + "IS/V1/carros";
        axios.get(url)
        .then(response => {
            this.setState({
                carros : response.data.mensaje
            })
            console.log(response);
        })
    }

    render() {
        return(
            <table className="table w-50 mt-5 ms-5">
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
                <td>{value.pago}</td>
                <td>
                    <button className="btn btn-danger me-4" onClick={() => this.clickCarro(value.id)}>Sacar carro</button>
                </td>
            </tr>
          )
      })}
    
  </tbody>
</table>
        )
    }
}

export default Dashboard;