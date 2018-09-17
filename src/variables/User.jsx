var user= {
 		id:"",
        firstName:"Mario",
        lastName:"",
        email:"",
        dateOfBirth:"",
        city:"",
        country:"",
        postalCode:"",
        bottles:[],
      }

function setUser (data) {
	user.id = data.id
	user.firstName = data.first_name
	user.lastName = data.last_name
	user.email = data.email
	user.dateOfBirth = data.date_of_birth
	user.city = data.city
	user.country = data.country
	user.postalCode = data.postal_code
	user.bottles = data.bottles

	return user
};

function logoutUser () {
	user.id = ""
	user.firstName = ""
	user.lastName = ""
	user.email = ""
	user.dateOfBirth = ""
	user.city = ""
	user.country = ""
	user.postalCode = ""
	user.bottles = []
}
module.exports = {
  user,
  setUser,
  logoutUser
};