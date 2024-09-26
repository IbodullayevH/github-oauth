import passport from "passport";

const googleMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
  accessType: "offline", 
  prompt: "consent" 
});

export { googleMiddleware };
