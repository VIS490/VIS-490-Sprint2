import * as SocketIO from 'socket.io-client'

const Socket = SocketIO.connect('http://localhost:5000')
export default Socket
