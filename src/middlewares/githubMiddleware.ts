import passport from "passport";

const githubMiddleware = passport.authenticate("github", {
  scope: ["user:email"],
});

export { githubMiddleware };
