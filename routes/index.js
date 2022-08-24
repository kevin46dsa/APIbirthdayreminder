const usersRoutes = require('./users');
//const publicRoutes = require('./public')
const userAuth = require('./auth')


const constructorMethod = (app) => {
	
	app.use('/users', usersRoutes); // user data
	app.use('/auth', userAuth); // Login/Signup (API)Routes
	//app.use('/public', publicRoutes); // No Middle Ware route should display all public Data

	app.use('/', (req, res) => {
		res.status(200).json({ Home: "Welcome to Birthday-Reminder API Home Page" });
	});
};

module.exports = constructorMethod;
