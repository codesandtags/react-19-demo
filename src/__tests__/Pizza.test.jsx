import { render, cleanup } from "@testing-library/react";
import { expect, test, describe, afterEach } from "vitest";
import Pizza from "../components/Pizza";

describe("Pizza component", () => {
  afterEach(cleanup);

  test("alt test renders on Pizza Image", () => {
    // Arrange
    const name = "My pizza";
    const src = "https://picsum.photos/200";
    const screen = render(
      <Pizza name={name} description={"my description"} image={src} />,
    );
    // Act
    const img = screen.getByRole("img");

    // Assert
    expect(img.src).toBe(src);
    expect(img.alt).toBe(name);
  });

  test("to have default image if non is provided", () => {
    const screen = render(<Pizza name="something" description="description" />);

    const img = screen.getByRole("img");

    expect(img.src).not.toBe("");
  });
});
