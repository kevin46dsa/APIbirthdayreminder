
const mongoCollections = require('../mongoconfig/mongoCollections');
const mail = require("./Mail")
const Users = mongoCollections.users;

async function checkbirthday(UserID){
    // code to get data from database

  let UserCollection = await Users();
    
    if(UserID == -1)  userFound = await UserCollection.findOne({ Email: UserID });
    else userFound = await UserCollection.findOne({ Email: UserID }); //change this to find

    let birthdaytoday = [] 
    let birthdaytommrow = []
   	let datafromDB = userFound.Birthday;
/*
    let datafromDB = [{
    name:'Kevin', day: 1, month:6, year: 1997
    },{name:'Kevin', day: 23, month:8, year: 1999}]
  */  
    let currentDate = new Date();
    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    datafromDB.forEach(index =>{
        if(index.month === cMonth & index.day === cDay){
            let age = getCurrentAge(index.year)
            birthdaytoday.push({Name:index.name,Age:age})
        }
        if(index.month === cMonth & index.day === cDay + 1){
            let age = getCurrentAge(index.year)
            birthdaytommrow.push({Name:index.name,Age:age})
        }
    });
      return [birthdaytoday,birthdaytommrow]
    }
    
    function getCurrentAge(year){
        let currentDate = new Date();
        let cYear = currentDate.getFullYear()
        let age = cYear - year
        return age
    }

    //this function need to get all users birthday and send it 
    async function scheduledFunction(){ 
      // mongodb query to find all
      // get all users email and data
      // forloop calling send mail function

      let UserCollection = await Users();
      userFound = await UserCollection.find({}).toArray();
      for (let element of userFound) {
        
        let birthday = await checkbirthday(element.Email);
        if(!(birthday[0].length === 0 && birthday[1].length === 0)) mail.scheduledMail(element.Email, birthday)
      }
    }
  

   module.exports = {
        getCurrentAge,
        checkbirthday,
        scheduledFunction
   };
    
  
