/**
 * @vitest-environment jsdom
 */

import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import Contact from "../components/Contact";

afterEach(() => {
    vi.unstubAllGlobals();
});

test("contact form submits information successfully", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
        ok: true
    });

    vi.stubGlobal("fetch", mockFetch);

    const { container } = render(
        <MemoryRouter>
            <Contact />
        </MemoryRouter>
    );

    const inputs = container.querySelectorAll("input");
    const message = container.querySelector("textarea");

    fireEvent.change(inputs[0], {
        target: { value: "John" }
    });

    fireEvent.change(inputs[1], {
        target: { value: "Smith" }
    });

    fireEvent.change(inputs[3], {
        target: { value: "john@example.com" }
    });

    fireEvent.change(message, {
        target: { value: "Testing contact form" }
    });

    fireEvent.click(screen.getByRole("button", {
        name: "Submit"
    }));

    expect(
        await screen.findByText("Your message was sent successfully!")
    ).toBeInTheDocument();

    expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/contacts",
        expect.objectContaining({
            method: "POST",
            body: expect.stringContaining("john@example.com")
        })
    );
});
