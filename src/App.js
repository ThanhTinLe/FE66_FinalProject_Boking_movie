// import logo from './logo.svg';
// import './App.css';

import { Router, Switch } from "react-router-dom";
// import FooterComponent from "./components/FooterComponent/FooterComponent";
// import HeaderComponent from "./components/Header/HeaderComponent";
// import HeaderComponent from "./components/Header/HeaderComponent";
import Home from "./page/Home/Home";
import { createBrowserHistory } from "history";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import ModalComponent from "./HOC/Modal/ModalComponent";
import Profile from "./page/Profile/Profile";
import Loader from "./components/Loader/Loader";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import FilmComponent from "./components/Film/FilmComponent";
import AppComponent from "./components/AppComponent/AppComponent";
import CumRapComponent from "./components/CumRap/CumRapComponent";
import Detail from "./page/Detail/Detail";
import DatVe from "./page/DatVe/DatVe";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import UserManager from "./page/Admin/UserManager/UserManager";
import FilmManager from "./page/Admin/FilmManager/FilmManager";
import AddFilm from "./page/Admin/FilmManager/AddFilm";
import AddShowTime from "./page/Admin/ShowTime/AddShowTime";
import EditFilm from "./page/Admin/FilmManager/EditFilm";
import EditUser from "./page/Admin/UserManager/EditUser";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      {/* <HeaderComponent /> */}
      <Loader />
      <ModalComponent />
      <Switch>
        <HomeTemplate exact path="/home" component={Home} />
        <UserTemplate exact path="/profile" component={Profile} />
        <HomeTemplate exact path='/phim' component={FilmComponent} />
        <HomeTemplate exact path='/cumrap' component={CumRapComponent} />
        <HomeTemplate exact path='/app' component={AppComponent} />
        <HomeTemplate exact path='/detail/:id-:name' component={Detail} />
        <UserTemplate exact path='/datve/:id' component={DatVe} />
        <HomeTemplate exact path="/" component={Home} />

        <AdminTemplate exact path='/admin' component={UserManager}/>
        <AdminTemplate exact path='/admin/addfilms' component={AddFilm}/>
        <AdminTemplate exact path='/admin/editfilm/:id' component={EditFilm}/>
        <AdminTemplate exact path='/admin/users' component={UserManager}/>
        <AdminTemplate exact path='/admin/films' component={FilmManager}/>
        <AdminTemplate exact path='/admin/edituser/:id' component={EditUser}/>
        <AdminTemplate exact path='/admin/addshowtimes/:id' component={AddShowTime}/>

        <HomeTemplate path="*" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
