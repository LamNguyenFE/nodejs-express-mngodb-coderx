For Lowdb 
https://nodejs-express-lowdb-coderx.herokuapp.com/

For Login 

user : admin@coderx.com 
pass : 1234

For MongDb 
https://nodejs-express-mongodb-coderx.herokuapp.com/products?page=2&size=8

For Login 

user : admin@coderx.com 
pass : 1234

CURD mongoose users
Pagination products

https://nodejs-express-mongodb-coderx.herokuapp.com/products?page=2&size=8



Less 22 Session
 start
    |
 has cookie? (not yet)-> set cookie with sessionId -> store session data to database -> end
    |
 End

 user Signed Cookie to create sessionID
 use Midddleware to create cookie ()
 apply it to app.use
 to all url

 les 23

 I figured out what was happening for mine... the forms where the token would not work were encType="multipart/form-data". For multipart forms to work with this package, I needed to ensure that my file parser was loading before the csurf module...

// from server.js
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  abortOnLimit: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(csurf({ cookie: true }));