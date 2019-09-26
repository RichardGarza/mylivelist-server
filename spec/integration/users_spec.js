const request = require("request");
const base = "http://localhost:4000/users";
const sequelize = require("../../models/index").sequelize;
const server = require("../../bin/www");
const User = require("../../models").User;
const Store = require("../../models").Store;

describe("routes : users", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {})
      .catch(err => {
        console.log("ERR1");
        done();
      });

    this.user;
    this.store;
    User.create({
      email: "whatever@totally.com",
      password: "123456789"
    })
      .then(user => {
        this.user = user;
      })
      .catch(err => {
        console.log("ERR3");
        done();
      });
  });

  describe("POST /users", () => {
    it("should create a new user with valid values and redirect", done => {
      const options = {
        url: base,
        form: {
          email: "user@example.com",
          password: "123456789"
        }
      };
      // Send Post Request
      request.post(options, (err, res, body) => {
        const response = JSON.parse(res.body);
        expect(response.authenticated).toBe(true);
        expect(response.err).toBeNull();
        expect(response.userId).not.toBeNull();
        done();
      });
    });

    it("should not create a new user with invalid email and redirect", done => {
      request.post(
        {
          url: base,
          form: {
            email: "no",
            password: "123456789"
          }
        },
        (err, res, body) => {
          const response = JSON.parse(res.body);
          expect(response.authenticated).toBe(false);
          expect(response.err).toContain("Validation error");
          expect(response.userId).toBe(undefined);
        }
      );
      done();
    });

    it("should not create a new user with invalid password and redirect", done => {
      request.post(
        {
          url: base,
          form: {
            email: "norman@bates.motel",
            password: "123"
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: "norman@bates.motel" } })
            .then(user => {
              expect(user).toBeNull();
              done();
            })
            .catch(err => {
              console.log("ERR6");
              done();
            });
        }
      );
    });
  });
});
