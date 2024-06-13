// This series of tests evaluates the app's authentication processes.
describe("Authentication tests:", () => {
  // Register test.
  it("Tests the register process for a user.", () => {
    cy.visit("/register");

    cy.get('input[name="email"]').type("demo@user.com");
    cy.get('input[name="confirm-email"]').type("demo@user.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="confirm-password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/home");
  });

  // Login test.
  it("Tests the login process for a user.", () => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("demo@user.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/home");
  });

  // Logout test.
  it("Tests the logout process for a user.", () => {
    // Login the user.
    cy.visit("/login");

    cy.get('input[name="email"]').type("demo@user.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/home");

    // Logout the user.
    cy.get('button[name="user-menu"]').click();
    cy.get("p").contains("Logout").click();

    cy.url().should("include", "/login");
  });

  // Delete account test.
  it("Tests the delete process of a user.", () => {
    // Login the user.
    cy.visit("/login");

    cy.get('input[name="email"]').type("demo@user.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/home");

    // Delete the user's account.
    cy.get('button[name="user-menu"]').click();
    cy.get("p").contains("Settings").click();
    cy.get('button[name="delete-account"]').click();

    cy.get('input[name="email"]').type("demo@user.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/login");
  });
});
