describe("Contact Form E2E Test", () => {
    it("submits the contact form successfully", () => {
        cy.visit("http://localhost:5173/contact");

        // Fill out the contact form
        cy.get('input[type="text"]').eq(0).type("John");
        cy.get('input[type="text"]').eq(1).type("Smith");
        cy.get('input[type="tel"]').type("4165551234");
        cy.get('input[type="email"]').type("john@example.com");
        cy.get("textarea").type("Testing the contact form with Cypress");

        // Submit the form
        cy.contains("button", "Submit").click();

        // Check the confirmation message
        cy.contains("Your message was sent successfully!").should("be.visible");
    });
});
