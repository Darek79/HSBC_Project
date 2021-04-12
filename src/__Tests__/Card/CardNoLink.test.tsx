import {
  render,
  screen,
} from "@testing-library/react";
import {
  Router,
  Link,
  Route,
} from "react-router-dom";
import {
  createMemoryHistory,
  createLocation,
} from "history";
import {CardNoLink} from "./../../components/Card/CardNoLink";

const mockState = {
  state: {
    referrer: "/content/test",
    userId: "Tomek",
    title: "lorem ipsum Title",
    body: "lorem ipsum Body",
  },
};

test("renders CardNoLink Comp", () => {
  const history = createMemoryHistory();
  const route = "/post/1/Tomek";
  history.push(route, mockState.state);
  render(
    <Router history={history}>
      <CardNoLink
        // userId="Tomek"
        // id={1}
        // title="lorem ipsum title"
        // body="lorem ipsum body"
        clItem="class1"
        cardSolo="cardSolo"
        clTitle="cardTitle"
        clBody="cardTitle"
        clUser="cardUser"
      />
    </Router>
  );

  const userId = screen.getByText("Tomek");
  expect(userId).toBeInTheDocument();
  const title = screen.getByText(
    "lorem ipsum Title"
  );
  expect(title).toBeInTheDocument();
  const body = screen.getByText(
    "lorem ipsum Body"
  );
  expect(body).toBeInTheDocument();
});
