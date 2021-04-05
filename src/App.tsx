import {
  Switch,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import "./styles/Mobile.scss";
import "./styles/Tablet.scss";
import "./styles/Desktop.scss";
import "./styles/Reset.scss";
import {FormComp} from "./components/Form/Form";
export const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(p) => (
              <FormComp
                seClass="form_main"
                clClassF="form_main_element"
                isRegister={true}
              />
            )}></Route>
          <Route
            exact
            path="/logon"
            render={(p) => (
              <FormComp
                seClass="form_main"
                clClassF="form_main_element"
                isRegister={false}
              />
            )}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
