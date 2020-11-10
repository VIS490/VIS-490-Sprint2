import * as SocketIO from 'socket.io-client'

var Socket = SocketIO.connect('http://localhost:5000')
export default Socket