const { User, Room } = require('./models/models')
const rooms = {}

function authControllers(session) {
    function loginToRoomView(req, res) {
        res.render('login')
    }

    function loginToRoom(req, res) {
        if (!req.body.password || !req.body.name) {
            res.status("400");
            res.send("Invalid details!");
        } else {

            Users.filter(function (user) {
                if (user.id === req.body.id) {
                    res.render('signup', {
                        message: "User Already Exists! Login or choose another user id"
                    });
                }
            });
            var newUser = { id: req.body.id, password: req.body.password };
            Users.push(newUser);
            req.session.user = newUser;
            res.redirect('/protected_page');
        }
    }

    function createRoom(req, res) {
        if (!req.body.name) {
            res.status("400");
            res.send("Invalid details!");
        } else {

            Room.query.where('name', req.body.name).then(row => {
                if(!row) {
                    throw Error('Post not found')
                }
            })
            Users.filter(function (user) {
                if (user.id === req.body.id) {
                    res.render('signup', {
                        message: "User Already Exists! Login or choose another user id"
                    });
                }
            });
            var newUser = { id: req.body.id, password: req.body.password };
            Users.push(newUser);
            req.session.user = newUser;
            res.redirect('/protected_page');
        }
    }

    return {
        loginToRoomView,
        loginToRoom
    }
}

function httpControllers(io) {

    function index(req, res) {
        res.render('index', { rooms: rooms })
    }

    function createRoom(req, res) {
        if (rooms[req.body.room] != null) {
            return res.redirect('/')
        }
        rooms[req.body.room] = { users: {} }
        res.redirect(req.body.room)
        // Send message that new room was created
        io.emit('room-created', req.body.room)
    }

    function getRoom(req, res) {
        if (rooms[req.params.room] == null) {
            return res.redirect('/')
        }
        res.render('room', { roomName: req.params.room })
    }

    return {
        index,
        createRoom,
        getRoom
    }
}

function webSocketControllers() {
    function connection(socket) {
        socket.on('new-user', (room, name) => {
            socket.join(room)
            rooms[room].users[socket.id] = name
            socket.to(room).broadcast.emit('user-connected', name)
        })
        socket.on('send-chat-message', (room, message) => {
            socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
        })
        socket.on('disconnect', () => {
            getUserRooms(socket).forEach(room => {
                socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
                delete rooms[room].users[socket.id]
            })
        })
    }

    function getUserRooms(socket) {
        return Object.entries(rooms).reduce((names, [name, room]) => {
            if (room.users[socket.id] != null) names.push(name)
            return names
        }, [])
    }

    return {
        connection
    }
}



module.exports = function (io, session) {
    return {
        httpControllers: httpControllers(io),
        wsControllers: webSocketControllers(),
        authControllers: authControllers(session)
    }
}