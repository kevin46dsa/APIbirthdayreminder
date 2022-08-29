const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
const jwtkey = require("./mongoconfig/authconfig");
const static = express.static(__dirname + "/public");
const cors = require("cors");
const configRoutes = require("./routes");
let port = 8080;
var xss = require("xss");
const dataValidation = require("./data/dataValidation");
var scheduler = require('node-schedule');
const interval = require('./mongoconfig/authconfig')
const datafunctions = require('./data/data')


const whitelist = ["http://localhost:3000"]; //Refrence: https://www.codingdeft.com/posts/nodejs-react-cors-error/
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/public", static);
app.use(express.urlencoded({ extended: true }));

app.use("/auth", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// verify token
app.use("/users", (req, res, next) => {
  let token = undefined;
  let tokeninbody = undefined;
    if(req.headers)token = xss(req.headers["x-access-token"]);
    if(req.body.header) tokeninbody = xss(req.body.headers["x-access-token"])
  try{
  if (token || tokeninbody) {
  if (token) {
    jwt.verify(token, jwtkey.secret, (err, decoded) => {
      if (err) {
       throw {
          code: 401,
          message:"Unauthorized!",
        };
      }
      if (decoded) {
        let email = decoded.email;
        email = dataValidation.checkEmail(email);
        req.userId = email;
        console.log("Access Token Verified");
        
      }
      next();
    });
  } else if (tokeninbody) {
    jwt.verify(tokeninbody, jwtkey.secret, (err, decoded) => {
      if (err) {
        throw {
           code: 401,
           message:"Unauthorized!",
         };
       }
      if (decoded) {
        let email = decoded.email;
        email = dataValidation.checkEmail(email);
        req.userId = email;
        console.log("Access Token Verified");
        
      }
      next();
    });
  }
}
else throw {
    code: 403,
    message:
      'AccessToken Not Provided',
  };
  }
  catch(e){
    return res.status(e.code).send({ Message:e.message});
  }
});

// logging middle ware
app.use(async (req, res, next) => {
  let currentTime = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  if (req.userId) authenticated = true;
  else authenticated = false;
  console.log(
    `Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth: ${authenticated}`
  );
  next();
});


////Schedule Jobs

scheduler.scheduleJob(interval.everydayat0900, function(){

    datafunctions.scheduledFunction();
    
});


//this code is used to run the job to check if there is any birthday today and send a mail to the user
// Code ref: https://buildcoding.com/how-to-schedule-a-job-everyday/#:~:text=When%20you%20have%20a%20few%20jobs%20that%20needs,hour%20or%20day%20or%20once%20in%20a%20week.




configRoutes(app);

app.listen(port, () => {
  console.log(`Your routes will be running on port http://localhost/${port}`);
});
