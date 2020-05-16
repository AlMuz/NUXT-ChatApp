const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const formatMessage = (name, text, id) => ({ name, text, id })

io.on('connection', (socket) => {
  // on userJoined
  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Data is not correct')
    }

    socket.join(data.room)

    // check if user exists - delete it from storage
    users.remove(socket.id)

    // adding user to the storage
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })

    cb({ userId: socket.id })

    // updating for all users - user count
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))

    // sending join message for joined user
    socket.emit('newMessage', formatMessage('admin', `Welcome ${data.name}!`))

    // for all users in this room - show new joined user
    socket.broadcast
      .to(data.room)
      .emit(
        'newMessage',
        formatMessage('admin', `User ${data.name} joined to this room`)
      )
  })

  // if from FE request of creating message
  socket.on('createMessage', (data, cb) => {
    // checking its for existing
    if (!data.text) {
      return cb('Text cant be empty')
    }

    // getting user who send it message
    const user = users.get(data.id)

    // if user exists
    if (user) {
      // send his message to the room
      io.to(user.room).emit(
        'newMessage',
        formatMessage(user.name, data.text, data.id)
      )
    }

    cb()
  })

  // if user left by himself
  socket.on('userLeft', (id, cb) => {
    // if user exists - remove it from storage
    const user = users.remove(id)
    if (user) {
      // update users count
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))

      // write to the another users what this user left the chat
      io.to(user.room).emit(
        'newMessage',
        formatMessage('admin', `User ${user.name} left.`)
      )
    }
    cb()
  })

  // if user closed his browser - the same as on userLeft
  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit(
        'newMessage',
        formatMessage('admin', `User ${user.name} left.`)
      )
    }
  })
})

module.exports = {
  app,
  server
}
