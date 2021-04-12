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
import {Content} from "./components/Content/Content";
import {Path404} from "./components/404/404";
import {CardNoLink} from "./components/Card/CardNoLink";
import {ContentConnection} from "./components/ConnectionCheck/Connection";
export const App = (): JSX.Element => {
  return (
    <div className="App">
      <ContentConnection />
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
                {...p}
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
                {...p}
              />
            )}></Route>
          <Route
            exact
            path="/content/:name"
            render={(p) => (
              <Content
                {...p}
                clSection="main_content"
                imagesCount={12}
              />
            )}></Route>
          <Route
            path="/post/:id/:name"
            render={(p) => (
              <CardNoLink
                {...p}
                clItem="card_item"
                cardSolo="card_solo"
                clUser="card_user"
                clTitle="card_title"
                clBody="card_body"
              />
            )}></Route>
          <Route
            exact
            path="*"
            render={(p) => <Path404 />}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
