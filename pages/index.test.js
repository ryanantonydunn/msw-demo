import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from ".";
import { itemsOverride } from "../mocks/handlers";
import { server } from "../mocks/server";

describe("example test suite", () => {
  it("should show items from the API", async () => {
    const expectedTitle = "Item 1";
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByTestId("title1")).toHaveTextContent(expectedTitle);
    });
  });

  it("should show correct item titles if API changes", async () => {
    server.use(itemsOverride);
    const expectedTitle = "Override 1";
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByTestId("title1")).toHaveTextContent(expectedTitle);
    });
  });

  it("should add an item", async () => {
    const expectedTitle1 = "Item 1";
    const expectedTitle3 = "Item 3";
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByTestId("title1")).toHaveTextContent(expectedTitle1);
    });
    fireEvent.click(screen.getByTestId("addButton"));
    await waitFor(() => {
      expect(screen.getByTestId("title3")).toHaveTextContent(expectedTitle3);
    });
  });
});
