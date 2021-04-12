import {
  render,
  screen,
} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {Card} from "./../../components/Card/Card";

test("renders Card Comp", () => {
  const history = createMemoryHistory();
  const route = "/post/1/Tomek";
  history.push(route);

  render(
    <Router history={history}>
      <Card
        userId="Tomek"
        id={1}
        title="lorem ipsum title"
        body="lorem ipsum body"
        clItem="class1"
        cardLink="linkclass1"
        clTitle="cardTitle"
        clBody="cardTitle"
        clUser="cardUser"
        userName="Tomek"
      />
    </Router>
  );

  const userId = screen.getByText("Tomek");
  expect(userId).toBeInTheDocument();
  const title = screen.getByText(
    "lorem ipsum title"
  );
  expect(title).toBeInTheDocument();
  const body = screen.getByText(
    "lorem ipsum body"
  );
  expect(body).toBeInTheDocument();
});
