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

import {
  user
} from "variables/User";

import avatar from "assets/img/faces/profilePicturePlaceholder.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
  	 bottleId:""
    };
  }

  registerBottle = (data) => {
    fetch('http://localhost:3100/registerBottle',{
        credentials: "same-origin",
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          bottle_id:this.state.bottleId,
          user_id:user.id
        })
      })
        .then(response => {
          console.log(response)
          return response.json()
        })
          .then(bottle => {
            console.log(bottle)
            if(bottle.bottle_id){
                console.log(user.bottles)
                user.bottles.push(bottle.bottle_id);
                this.props.addNewBottle();
                console.log(user.bottles)
             }
        })
          .catch((error) => {
          console.log(error)
        })
    }
  onBottleIdChange = (event) => {
    this.setState({bottleId: event.target.value})
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
                      labelText={`Email : ${user.email}`}
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`First-name : ${user.firstName}`}
                      id="first-name"
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Last-name : ${user.lastName}`}
                      id="last-name"
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
              </div>
            }
            footer={
              <div>
              <Button onClick={this.registerBottle} color="primary" >Link Bottle</Button>
                <input 
                className="pa2 ml3 input-reset ba bg-transparent hover-bg-white hover-black w-75"
                type="bottleId" 
                name="bottleId"  
                id="bottleId"
                onChange = {this.onBottleIdChange}
                />
              </div>
            }
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <ProfileCard
            avatar={avatar}
            title={`${user.firstName} ${user.lastName}`}
            description={`Date of Birth: ${(user.dateOfBirth.split('T')[0])}`}
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}
}
UserProfile.propTypes = {
  
};

export default UserProfile;
