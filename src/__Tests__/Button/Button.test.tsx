import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import {Button} from "./../../components/Button/Button";

test("renders Button Comp", () => {
  const handleClick = jest.fn();
  render(
    <Button
      txt="Test"
      cn="btn"
      disabled={false}
      fnClick={handleClick}
    />
  );
  const linkElement = screen.getByText("Test");
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(screen.getByText("Test"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
