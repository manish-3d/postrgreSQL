const {
  body,
  validationResult,
  matchedData,
} = require("express-validator");

const db = require("../db/queries");

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage("First name must contain letters only"),

  body("lastName")
    .trim()
    .isAlpha()
    .withMessage("Last name must contain letters only"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email"),

  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be between 18 and 120"),

  body("bio")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Bio must be less than 200 characters"),
];

exports.usersListGet = async (req, res) => {
  const users = await db.getUsers();

  res.render("index", {
    title: "Users List",
    users,
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create User",
  });
};

exports.usersCreatePost = [
  validateUser,

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }

    const data = matchedData(req);

    await db.addUser(
      data.firstName,
      data.lastName,
      data.email,
      data.age,
      data.bio
    );

    res.redirect("/");
  },
];

exports.searchUserGet = async (req, res) => {
  const query = (req.query.query || "").toLowerCase();

  const users = await db.getUsers();

  const results = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );

  res.render("search", {
    title: "Search Results",
    users: results,
  });
};