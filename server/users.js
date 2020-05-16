// users storage
class Users {
  constructor() {
    this.users = []
  }

  // just pushing to users array new user
  add(user) {
    this.users.push(user)
  }

  // finding user from users array
  get(id) {
    return this.users.find((user) => user.id === id)
  }

  // removing user from array and return his data
  remove(id) {
    const user = this.get(id)

    if (user) {
      this.users = this.users.filter((user) => user.id !== id)
    }

    return user
  }

  // getting users by room name
  getByRoom(room) {
    return this.users.filter((user) => user.room === room)
  }
}

module.exports = function() {
  return new Users()
}
