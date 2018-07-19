import React, { Component }  from "react";
import PropTypes from "prop-types";
import { Grid, InputLabel } from "material-ui";

import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";

import avatar from "assets/img/faces/profilePicturePlaceholder.png";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
  	user:{
  		firstName: 'Mario',
  		lastName: 'Boban',
  		email: 'mboban@fesb.hr',
  		physician: 'Andria Dujmic',
  		condition:'Steatohepatitis',
  		city:'Split',
  		country : 'Croatia',
  		postalCode : 21000,
  		dateOfBirth: 776995200000,
  		pillBottleId: 1
  	},
    };
  }
 convertTimestampToDate = (timestamp) => {
   var dateTime = new Date(timestamp);
   var datestring = dateTime.getDate()  + "-" + (dateTime.getMonth()+1) + "-" + dateTime.getFullYear();
   return datestring
  }
render() {
  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={8}>
          <RegularCard
            cardTitle="Edit Profile"
            cardSubtitle="Complete your profile"
            content={
              <div>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Email : ${this.state.user.email}`}
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Physician : ${this.state.user.physician}`}
                      id="physician"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`First-name : ${this.state.user.firstName}`}
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Last-name : ${this.state.user.lastName}`}
                      id="last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={`City : ${this.state.user.city}`}
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={`Country : ${this.state.user.country}`}
                      id="country"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={`Postal-code : ${this.state.user.postalCode}`}
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
              </div>
            }
            footer={<Button color="primary">Update Profile</Button>}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <ProfileCard
            avatar={avatar}
            subtitle={this.state.user.condition}
            title={`${this.state.user.firstName} ${this.state.user.lastName}`}
            description={`Date of Birth: ${this.convertTimestampToDate(this.state.user.dateOfBirth)}`}
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}
}
UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default UserProfile;
