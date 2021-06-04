import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import { routes } from "./config/route";
import "./App.css";
import { Button } from "antd-mobile";
function App() {
  return (
    <Router>
      <div className="box">
        <Button type="primary" className="btn">
          登录
        </Button>
      </div>
      <Switch>
        {routes.map((route) => {
          return <Route {...route}></Route>;
        })}
        <Redirect to="/phoneLogin"></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
