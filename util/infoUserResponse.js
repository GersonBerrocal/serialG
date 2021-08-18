function getInfoUser(user) {
  return {
    _id: user._id,
    user_name: user.user_name,
    name: user.name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    plan: user.plan
  }
}

module.exports = getInfoUser
