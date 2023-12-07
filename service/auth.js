//const sessionIdToUserMap = new Map();

const jwt = require("jsonwebtoken")
const secret = "Vikas@123"
// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

function setUser(user) {
  return jwt.sign({
    _id: user._id, 
    email: user.email,
    role:user.role
  }, secret)
}


// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

function getUser(token) {
  if (!token) return null
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

module.exports = {
  setUser,
  getUser,
};
