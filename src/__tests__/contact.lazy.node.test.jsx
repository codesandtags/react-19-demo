import { render } from "@testing-library/react";
import { test, describe, vi, expect } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("Contact Route", () => {
  test("should submit a contact with the form ", async () => {
    fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
    const screen = render(
      <QueryClientProvider client={queryClient}>
        <Route.options.component />
      </QueryClientProvider>,
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const msgTextArea = screen.getByPlaceholderText("Message");

    const testData = {
      name: "coco",
      email: "coco@test.com",
      message: "hello there",
    };

    nameInput.value = testData.name;
    emailInput.value = testData.email;
    msgTextArea.value = testData.message;

    const button = screen.getByRole("button");
    button.click();

    const h3 = await screen.findByRole("heading", { level: 3 });

    expect(h3.innerText).toContain("Submitted");

    const requests = fetchMocker.requests();

    expect(requests.length).toBe(1);
    expect(requests[0].url).toBe("http://localhost:3000/api/contact");
    expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
      body: JSON.stringify(testData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
