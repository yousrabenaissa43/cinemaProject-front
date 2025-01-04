import React from 'react'
import AccueilClass from '../components/AccueilClass'
import Apropos from '../components/Apropos'
import ListDeparts from '../components/ListDeparts'
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
    

function Menu() {
  
    return (
      <Router>
        <nav>
          <ul>
            <li><Link to="/accueil">Accueil</Link></li>
            {/* Films */}
            <li>
              <Link to="/films">Films</Link>
              <ul>
                <li><Link to="/films/create">CreateFilm</Link></li>
                <li><Link to="/films/delete">DeleteFilm</Link></li>
                <li><Link to="/films/details">FilmDetails</Link></li>
                <li><Link to="/films/list">FilmList</Link></li>
                <li><Link to="/films/update">UpdateFilm</Link></li>
                <li><Link to="/films/search">FilmSearch</Link></li>
              </ul>
            </li>
            {/* Users */}
            <li>
              <Link to="/users">Users</Link>
              <ul>
                <li><Link to="/users/create">CreateUser</Link></li>
                <li><Link to="/users/login">UtilisateurLogin</Link></li>
              </ul>
            </li>
             {/* Salle Management */}
          <li>
            <Link to="/salle">Salle Management</Link>
            <ul>
              <li><Link to="/salle/add">AddSalle</Link></li>
              <li><Link to="/salle/program">ProgramSalle</Link></li>
              <li><Link to="/salle/prog-list">SalleProgList</Link></li>
              <li><Link to="/salle/list">SallesList</Link></li>
            </ul>
          </li>
           {/* Seance Management */}
           <li>
            <Link to="/seance">Seance Management</Link>
            <ul>
              <li><Link to="/seance/create">CreateSeance</Link></li>
              <li><Link to="/seance/delete">DeleteSeance</Link></li>
              <li><Link to="/seance/get-all">GetAllSeances</Link></li>
              <li><Link to="/seance/reserve-seat">ReserveSeat</Link></li>
              <li><Link to="/seance/details">SeanceDetails</Link></li>
              <li><Link to="/seance/update">UpdateSeance</Link></li>
            </ul>
          </li>
          </ul>
        </nav>
        <div>
          <Routes>
            <Route path="/accueil" element={<AccueilClass />} />
            <Route path="/films/create" element={<CreateFilm />} />
            <Route path="/films/delete" element={<DeleteFilm />} />
            <Route path="/films/details" element={<FilmDetails />} />
            <Route path="/films/list" element={<FilmList />} />
            <Route path="/films/update" element={<UpdateFilm />} />
            <Route path="/films/search" element={<FilmSearch />} />
            {/* Routes Utilisateurs */}
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/login" element={<UtilisateurLogin />} />
            {/* Routes Salle Management */}
          <Route path="/salle/add" element={<AddSalle />} />
          <Route path="/salle/program" element={<ProgramSalle />} />
          <Route path="/salle/prog-list" element={<SalleProgList />} />
          <Route path="/salle/list" element={<SallesList />} />
          {/* Routes Seance Management */}
          <Route path="/seance/create" element={<CreateSeance />} />
          <Route path="/seance/delete" element={<DeleteSeance />} />
          <Route path="/seance/get-all" element={<GetAllSeances />} />
          <Route path="/seance/reserve-seat" element={<ReserveSeat />} />
          <Route path="/seance/details" element={<SeanceDetails />} />
          <Route path="/seance/update" element={<UpdateSeance />} />
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default Menu 