// This series of tests evaluates the app's main functionailty.
describe("Main functionality tests (CRUD operations):", () => {
  // Register an account before running the tests.
  before(() => {
    cy.visit("/register");

    cy.get('input[name="email"]').type("demo@user.com");
    cy.get('input[name="confirm-email"]').type("demo@user.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="confirm-password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/home");
  });

  // Delete the account after the tests have run.
  after(() => {
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

  // Before every test we need to login the user.
  beforeEach(() => {
    cy.visit("/login");

    cy.get('input[name="email"]').type("demo@user.com");
    cy.get('input[name="password"]').type("123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/home");
  });

  // Tests the CRUD operations for a workout.
  it("should create, edit, and delete a workout", () => {
    // Create a workout.
    cy.visit("/home");
    cy.get('button[name="create-workout"]').should("be.visible").click();
    cy.get('input[name="workout-name"]').should("be.visible").type("Leg Day");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.contains("Leg Day").should("exist");

    // Edit the workout.
    cy.contains("Leg Day").should("be.visible").click();
    cy.get('button[name="edit-workout"]').should("be.visible").click();
    cy.get('input[name="workout-name"]')
      .should("be.visible")
      .clear()
      .type("Lower Body Day");
    cy.get('button[name="update-workout"]').should("be.visible").click();
    cy.contains("Lower Body Day").should("exist");

    // Delete the workout.
    cy.contains("Lower Body Day").should("be.visible").click();
    cy.get('button[name="edit-workout"]').should("be.visible").click();
    cy.get('button[name="delete-workout"]').should("be.visible").click();
    cy.contains("Lower Body Day").should("not.exist");
  });

  // Tests the CRUD operations for a exercise of a workout.
  it("should add, edit, and delete an exercise in a workout", () => {
    // Create a workout
    cy.visit("/home");
    cy.get('button[name="create-workout"]').should("be.visible").click();
    cy.get('input[name="workout-name"]').should("be.visible").type("Leg Day");
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.contains("Leg Day").should("exist");

    // Create an exercise.
    cy.contains("Leg Day").should("be.visible").click();
    cy.get('button[name="create-exercise"]').should("be.visible").click();
    cy.get('input[name="exercise-name"]').should("be.visible").type("Squats");
    cy.get('input[name="sets"]').should("be.visible").type(3);
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.contains("Squats").should("exist");

    // Edit the exercise.
    cy.contains("Squats").should("be.visible").click();
    cy.get('button[name="edit-exercise"]').should("be.visible").click();
    cy.get('input[name="exercise-name"]')
      .should("be.visible")
      .clear()
      .type("Front squats");
    cy.get('input[name="sets"]').should("be.visible").clear().type(4);
    cy.get('button[name="update-exercise"]').should("be.visible").click();
    cy.contains("Front squats").should("exist");

    // Delete the exercise.
    cy.contains("Front squats").should("be.visible").click();
    cy.get('button[name="edit-exercise"]').should("be.visible").click();
    cy.get('button[name="delete-exercise"]').should("be.visible").click();
    cy.contains("Front squats").should("not.exist");

    // Delete the workout.
    cy.contains("Leg Day").should("be.visible").click();
    cy.get('button[name="edit-workout"]').should("be.visible").click();
    cy.get('button[name="delete-workout"]').should("be.visible").click();
    cy.contains("Leg Day").should("not.exist");
  });
});
