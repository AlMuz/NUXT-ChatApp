const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const formatMessage = (name, text, id) => ({ name, text, id })

io.on('connection', (socket) => {
  socket.on('createMessage', (data) => {
    setTimeout(() => {
      socket.emit(
        'newMessage',
        {
          text: `${data.text} server`
        },
        1000
      )
    })
  })

  socket.on('userJoined', (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Data is not correct')
    }

    socket.join(data.room)
    cb({ userId: socket.id })
    socket.emit('newMessage', formatMessage('admin', `Welcome ${data.name}!`))
    socket.broadcast
      .to(data.room)
      .emit(
        'newMessage',
        formatMessage('admin', `User ${data.name} joined to this room`)
      )
  })
})

module.exports = {
  app,
  server
}
