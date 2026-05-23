exports.usersUpdatePost = [
  validateUser,

  (req, res) => {
    const user =
      usersStorage.getUser(req.params.id);

    const errors =
      validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render(
        "updateUser",
        {
          title: "Update user",
          user: user,
          errors: errors.array(),
        }
      );
    }

    const { firstName, lastName } =
      matchedData(req);

    usersStorage.updateUser(
      req.params.id,
      { firstName, lastName }
    );

    res.redirect("/");
  }
];