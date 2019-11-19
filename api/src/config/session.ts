import uuidv4 from 'uuid/v4';

export default {
  name: "session_id",
  genid: function() {
    return uuidv4(); // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  cookie: {
    httpOnly: true,
    sameSite: true,
    // secure: true
  },
  saveUninitialized: true,
  resave: false,
};
