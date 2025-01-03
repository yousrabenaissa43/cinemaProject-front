import { Component } from 'react'
import { add, getAll, remove } from '../services/operationsDepart'
import FormAjout from './FormAjout'
class  ListDeparts extends Component {
    state = {
        titre: "Qui sommes nous ?",
        contact: {
            nom: "Ma Société",
            email: "contact@cinema.com",
            logo: <img src="images/informatique.jpg" alt="PhotoSociete"></img>
        },
        departs: [],
   }

    getDepartement=()=>{
        getAll((res)=> { 
            this.setState({ departs: res.data }) })
    }
    componentDidMount(){ 
        //getAll((res)=>console.log(res)) 
        this.getDepartement();
    }

    addDepart=(d)=>{
        let tc = this.state.departs
        let size = this.state.departs.length;
        let nouveauDepart = {
            code :  size > 0 ? parseInt(tc[size-1].code)+ 1 : 1 ,
            nom : d
        }
        
        add(nouveauDepart, ()=> this.getDepartement())
    }

    deleteDepart = (id) => {
        remove(id, ()=>this.getDepartement())
        
    }

    render() {
        return (
            <div>
                <h1>Liste des départements </h1>
                
                {/*<form onSubmit={this.addDepart}>
                    <input type="text" onChange={this.changeHandler}/>
                    <button>Ajouter département</button>
                </form>*/}
                <FormAjout ajoutDepart={this.addDepart}/>
                
                <table>
                    <tbody>

                        {this.state.departs.map((d, i) =>
                            <tr key={i}>
                                <td>{d.code}</td>
                                <td>{d.nom}</td>
                                <td><button onClick={()=>this.deleteDepart(d.code)}>X</button></td>
                            </tr>)

                        }
                    </tbody>
                </table>


            </div>);
    }

}
 
export default ListDeparts ;