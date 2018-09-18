var user= {
 		id:"",
        firstName:"Mario",
        lastName:"",
        email:"",
        dateOfBirth:"",
        bottles:[],
      }

function setUser (data) {
	user.id = data.id
	user.firstName = data.first_name
	user.lastName = data.last_name
	user.email = data.email
	user.dateOfBirth = data.date_of_birth
	user.bottles = data.bottles
	return user
};

function logoutUser () {
	user.id = ""
	user.firstName = ""
	user.lastName = ""
	user.email = ""
	user.dateOfBirth = ""
	user.bottles = []
}
module.exports = {
  user,
  setUser,
  logoutUser
};