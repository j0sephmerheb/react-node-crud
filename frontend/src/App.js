import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import HomePage from './pages/HomePage'
import MoviesList from './pages/MoviesList'
import MoviesInsert from './pages/MoviesInsert'
import MoviesUpdate from './pages/MoviesUpdate'
import MovieDetails from './pages/MovieDetails'
import Profile from "./pages/Profile";
import history from "./components/history";
import Header from './components/HeaderComponent';
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css';

const App = () => {
  const { isLoading, error, user, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <Router history={history}>
      <div id="app">
        <Header />
        <Switch>
          <Route path="/" exact
            component={() => <HomePage user={user} />}
          />
          <Route path="/profile" component={Profile} />
          <Route path="/movies/list" exact component={MoviesList} />
          <Route path="/movies/create" exact component={MoviesInsert} />
          <Route path="/movies/update/:id" exact component={MoviesUpdate} />
          <Route path="/movie/:id" exact component={() => <MovieDetails user={user} isAuthenticated={isAuthenticated} />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
