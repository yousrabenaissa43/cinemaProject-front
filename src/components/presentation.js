import { Component } from 'react'

class Presentation extends Component {
    state = {
        titre: "Qui sommes nous ?",
        contact: {
            nom: "Ma Société",
            email: "contact@masociete.com",
            logo: <img src="images/informatique.jpg" alt="PhotoSociete"></img>
        },
        departs: [
            { id: 5, nom: "Commercial" },
            { id: 6, nom: "Développement" },
            { id: 7, nom: "Maintenance" }
        ],
        newDepart : ''
    }

    changeHandler=(event)=>{
        this.setState({
            newDepart : event.target.value
        })
    }

    addDepart=(event)=>{
        event.preventDefault()
        let tc = this.state.departs
        let size = this.state.departs.length;
        let nouveauDepart = {
            id :  size > 0 ? tc[size-1].id + 1 : 1 ,
            nom : this.state.newDepart
        }
        this.setState({
            departs : [...this.state.departs, nouveauDepart]
        })
    }

    deleteDepart = (i) => {
        let tdepts = this.state.departs
        tdepts.splice(i,1)
        this.setState({
            departs : tdepts
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.titre}</h1>
                <table>
                    <tbody>

                        <tr>
                            <td>{this.state.contact.logo}</td>
                            <td>
                                <li>Société : {this.state.contact.nom}</li>
                                <li>Email : {this.state.contact.email}</li>
                            </td>

                        </tr>
                    </tbody>
                </table>
                <h1>Liste des départements </h1>
                
                <form onSubmit={this.addDepart}>
                    <input type="text" onChange={this.changeHandler}/>
                    <button>Ajouter département</button>
                </form>


                <table>
                    <tbody>

                        {this.state.departs.map((d, i) =>
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.nom}</td>
                                <td><button onClick={()=>this.deleteDepart(i)}>X</button></td>
                            </tr>)

                        }
                    </tbody>
                </table>


            </div>);
    }
}

export default Presentation;