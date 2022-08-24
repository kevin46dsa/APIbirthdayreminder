
//const mongoCollections = require('../mongoconfig/mongoCollections');
//const Users = mongoCollections.users;

async function checkbirthday (){
    // code to get data from database

  //  let UserCollection = await Users();
	//const userFound = await UserCollection.findOne({ Email: 1 });

    let birthdaytoday = [] 
    let birthdaytommrow = []
   // let datafromDB = userFound.Birthday;

    let datafromDB = [{
    name:'Kevin', day: 1, month:6, year: 1997
    },{name:'Kevin', day: 23, month:8, year: 1999}]
    
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

    const logicFunction = {
        getCurrentAge,
        checkbirthday
    };
    
    export default logicFunction;