const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');  
const session = require('express-session');
const ConnectUser = require('./Connection/Connect.js')
const registerRoutes = require('./routes/postRoute/RegisterRoutes.js')
const LoginRoutes = require('./routes/postRoute/LoginRoutes.js')
const protectedRoute = require('./routes/getRoute/ProtectedRoutes.js')
const createGroup = require('./routes/postRoute/CreateGroup.js');
const getGroup = require('./routes/getRoute/GetGroupRoute.js');
const addMemberRoute = require('./routes/postRoute/AddMemberRoute.js')
const searchGroup = require('./routes/postRoute/SearchGroup.js');
const joinGroup = require('./routes/postRoute/JoinGroup.js');
const getMemeber = require('./routes/getRoute/GetMemberRoute.js');
const logDestroy = require('./routes/postRoute/LogoutRoute.js');
const getSingleGroup = require('./routes/getRoute/GetSingleGroup.js');
const sendMessage = require('./routes/postRoute/SendMessageRoute.js');
const getMessage = require('./routes/getRoute/GetMessages.js');
const getUser = require('./routes/getRoute/GetUser.js')
const getCodes = require('./routes/getRoute/GetCodes.js');
const uploadCode = require('./routes/postRoute/UploadCodeRoute.js');
const getSourceCode = require('./routes/getRoute/GetSourceCode.js');
const deleteFile = require('./routes/postRoute/Deletefiles.js');
const removeMember = require('./routes/postRoute/RemoveMember.js')
const updateName = require('./routes/postRoute/updateName.js');
const updateUsername = require('./routes/postRoute/updateUsername.js')
const updatePassword = require('./routes/postRoute/updatePassword.js')

const app = express();



app.use(
    cors({
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(session({
    secret: '@a$2148126231!!?!3',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
    },
}))
app.use(express.json());



app.post('/signup', registerRoutes);
app.post('/signin', LoginRoutes);
app.get('/protected', protectedRoute)
app.post('/createGroup', createGroup);
app.get('/getGroups/:userID', getGroup);
app.post('/addMember', addMemberRoute);
app.post('/searchGroup', searchGroup);
app.post('/joinGroup', joinGroup);
app.get('/getMember/:groupName', getMemeber);
app.post('/destroy', logDestroy);
app.get('/singleGroup/:groupName', getSingleGroup);
app.post('/sendMessage', sendMessage);
app.get('/getMessage/:groupID', getMessage);
app.get('/getUser/:userName', getUser);
app.post('/uploadCode', uploadCode);
app.get('/getCodes/:groupID', getCodes);
app.get('/getSourceCode/:codeID', getSourceCode);
app.post('/deleteFile', deleteFile);
app.post('/deleteMember', removeMember);
app.post('/updateName', updateName);
app.post('/updateUsername', updateUsername);
app.post('/updatePassword', updatePassword)

ConnectUser();
app.listen(5000, () => {
    console.log("Server is listening~~~~~");
})
