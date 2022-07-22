import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import TodosList from './Pages/TodosList';
import EditTodo from './Pages/EditTodo';
import CreateTodo from './Pages/CreateTodo';

function App() {
  return (
    <Router>
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
          <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
        </a>
        <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Todos</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Todo</Link>
            </li>
          </ul>
        </div>
      </nav>
      <br/>
      <Routes> 
     
            <Route path="/" exact element={<TodosList/>} />
            <Route path="/edit/:id" element={<EditTodo/>} />
            <Route path="/create" element={<CreateTodo/>} />

      </Routes>
    </div>
  </Router>
  );
}

export default App;
