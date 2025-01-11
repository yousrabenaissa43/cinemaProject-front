import React from 'react'
import AccueilClass from '../components/AccueilClass'
import  CreateFilm from '../Film Management/CreateFilm'
import  DeleteFilm from '../Film Management/DeleteFilm'
import  UpdateFilm from '../Film Management/UpdateFilm'
import  FilmDetails from '../Film Management/FilmDetails'
import  FilmList from '../Film Management/FilmList'
import  FilmSearch from '../Film Management/FilmSearch'
import  CreateUser from '../Users Management/CreateUser'
import UtilisateurLogin from '../Users Management/UtilisateurLogin ';
import AddSalle from '../Salle Management/AddSalle';
import ProgramSalle from '../Salle Management/ProgramSalle';
import SalleProgList from '../Salle Management/SalleProgList';
import SallesList from '../Salle Management/SallesList';
import CreateSeance from '../Seance Management/CreateSeance';
import DeleteSeance from '../Seance Management/DeleteSeance';
import GetAllSeances from '../Seance Management/GetAllSeances';
import ReserveSeat from '../Seance Management/ReserveSeat';
import SeanceDetails from '../Seance Management/SeanceDetails';
import UpdateSeance from '../Seance Management/UpdateSeance';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
    } from 'react-router-dom'
 import './menu.css'

function Menu() {
  return (
    <Router>
      <nav className="menu-nav">
        <ul className="menu-list">
          <li><Link to="/accueil" className="menu-link">Accueil</Link></li>
          <li className="dropdown">
            <Link to="/films" className="menu-link">Films</Link>
            <ul className="dropdown-menu">
              <li><Link to="/films/create" className="dropdown-link">Create Film</Link></li>
              <li><Link to="/films/delete" className="dropdown-link">Delete Film</Link></li>
              <li><Link to="/films/details" className="dropdown-link">Film Details</Link></li>
              <li><Link to="/films/list" className="dropdown-link">Film List</Link></li>
              <li><Link to="/films/update" className="dropdown-link">Update Film</Link></li>
              <li><Link to="/films/search" className="dropdown-link">Film Search</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/users" className="menu-link">Users</Link>
            <ul className="dropdown-menu">
              <li><Link to="/users/create" className="dropdown-link">Create User</Link></li>
              <li><Link to="/users/login" className="dropdown-link">User Login</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/salle" className="menu-link">Salle Management</Link>
            <ul className="dropdown-menu">
              <li><Link to="/salle/add" className="dropdown-link">Add Salle</Link></li>
              <li><Link to="/salle/program" className="dropdown-link">Program Salle</Link></li>
              <li><Link to="/salle/prog-list" className="dropdown-link">Salle Prog List</Link></li>
              <li><Link to="/salle/list" className="dropdown-link">Salles List</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link to="/seance" className="menu-link">Seance Management</Link>
            <ul className="dropdown-menu">
              <li><Link to="/seance/create" className="dropdown-link">Create Seance</Link></li>
              <li><Link to="/seance/delete" className="dropdown-link">Delete Seance</Link></li>
              <li><Link to="/seance/get-all" className="dropdown-link">Get All Seances</Link></li>
              <li><Link to="/seance/reserve-seat" className="dropdown-link">Reserve Seat</Link></li>
              {/* <li><Link to="/seance/details" className="dropdown-link">Seance Details</Link></li> */}
             {/* <li><Link to="/seance/update" className="dropdown-link">Update Seance</Link></li> */}
            </ul>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/accueil" element={<AccueilClass />} />
          <Route path="/films/create" element={<CreateFilm />} />
          <Route path="/films/delete" element={<DeleteFilm />} />
          <Route path="/films/details" element={<FilmDetails />} />
          <Route path="/films/list" element={<FilmList />} />
          <Route path="/films/update" element={<UpdateFilm />} />
          <Route path="/films/search" element={<FilmSearch />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/login" element={<UtilisateurLogin />} />
          <Route path="/salle/add" element={<AddSalle />} />
          <Route path="/salle/program" element={<ProgramSalle />} />
          <Route path="/salle/prog-list" element={<SalleProgList />} />
          <Route path="/salle/list" element={<SallesList />} />
          <Route path="/seance/create" element={<CreateSeance />} />
          <Route path="/seance/delete" element={<DeleteSeance />} />
          <Route path="/seance/get-all" element={<GetAllSeances />} />
          <Route path="/seance/reserve-seat" element={<ReserveSeat />} />
          <Route path="/seance/details/:id" element={<SeanceDetails />} />
          <Route path="/update-seance/:id" element={<UpdateSeance/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default Menu;
