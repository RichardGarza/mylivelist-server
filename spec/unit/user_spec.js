const sequelize = require("../../models/index").sequelize;
const User = require("../../models").User;
const userQueries = require("../../queries/userQueries");

describe("User", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        done();
      });
  });
  describe("Create", () => {
    describe("RDMS Testing", () => {
      it("Should create a user object with valid email and password", done => {
        User.create({
          email: "whatever@totally.com",
          password: "123456789"
        })
          .then(user => {
            expect(user.email).toBe("whatever@totally.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            done();
          });
      });

      it("Should not create a user with invalid email or password", done => {
        User.create({
          email: "It's-a me, Mario!",
          password: "1234567890"
        })
          .then(user => {
            // This code block should not run
          })
          .catch(err => {
            expect(err.message).toContain(
              "Validation error: must be a valid email"
            );
            done();
          });
      });

      it("Should not create a user with an email that's already taken.", done => {
        User.create({
          email: "recognaze@gmail.com",
          password: "1234567890"
        })
          .then(user => {
            expect(user.email).toBe("recognaze@gmail.com");
            expect(user).not.toBeNull;

            User.create({
              email: "recognaze@gmail.com",
              password: "1234567890"
            })
              .then(user => {
                // This code block should not run
              })
              .catch(err => {
                expect(err.message).toContain("Validation error");
                done();
              });
          })
          .catch(err => {
            // This code block should not run
          });
      });
    });

    describe("Query Function Testing", () => {
      it("should not create a user with an email already taken", done => {
        let newUser = {
          email: "loser@gmail.com",
          password: "123456",
          passwordConfirmation: "123456"
        };

        userQueries.createUser(newUser, (err, user) => {
          expect(user.email).toBe("loser@gmail.com");
          expect(user).not.toBeNull;
          expect(err).toBeNull;
        });

        userQueries.createUser(newUser, (err, user) => {
          expect(err).not.toBeNull();
          expect(err.message).toContain("Validation error");
          done();
        });
      });

      it("should create a user with valid credentials.", done => {
        let newUser = {
          email: "loser@gmail.com",
          password: "123456",
          passwordConfirmation: "123456"
        };

        userQueries.createUser(newUser, (err, user) => {
          if (err) {
            expect(err).toBeNull();
          } else {
            expect(user).not.toBeNull();
            expect(user.email).toBe("loser@gmail.com");
            done();
          }
        });
      });

      it("should not create a user with invalid email", done => {
        let newUser = {
          email: "It's-a me, Mario!",
          password: "1234567890",
          passwordConfirmation: "1234567890"
        };

        userQueries.createUser(newUser, (err, user) => {
          if (err) {
            expect(err.message).toContain("Validation error");
            done();
          } else {
            // This code block should not run
          }
        });
      });

      it("should not create a user with invalid password", done => {
        let newUser = {
          email: "Mario@maytag.central",
          password: "132", // Password Length Less Than 5 Characters
          passwordConfirmation: "132"
        };

        userQueries.createUser(newUser, (err, user) => {
          if (err) {
            expect(err.message).toContain("Validation error");
            done();
          } else {
            // This code block should not run
          }
        });
      });
    });
  });
});
