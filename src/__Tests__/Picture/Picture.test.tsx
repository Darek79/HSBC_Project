import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import {Picture} from "./../../components/Picture/Picture";

test("renders Picture Comp", () => {
  render(
    <Picture
      mediasize="1000"
      mediasize1="300"
      clPicture="img test"
    />
  );
  const displayedImage = document.querySelector(
    "img"
  ) as HTMLImageElement;
  expect(displayedImage.src).toContain("350");
  screen.debug();
});
