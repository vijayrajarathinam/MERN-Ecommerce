const router = require("express").Router();

const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUser,
  changePassword,
  updateUser,
  getAllUsers,
  getUserDetails,
  updateProfile,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authentication");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUser);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/change").post(isAuthenticatedUser, changePassword);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
