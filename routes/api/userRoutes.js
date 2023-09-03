const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addNewFriend,
  removeFriend
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addNewFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
