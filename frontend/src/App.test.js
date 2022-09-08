import { render, screen } from "@testing-library/react";
import App from "./App";
import ShortenUrlContext from "./components/Context/ShortenUrlContext";
test("renders learn react link", () => {
  render(
    <ShortenUrlContext>
      <App />
    </ShortenUrlContext>
  );
  const linkElement = screen.getByText(/Url Shortener App/i);
  expect(linkElement).toBeInTheDocument();
});
