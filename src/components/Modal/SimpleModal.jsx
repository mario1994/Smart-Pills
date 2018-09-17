import React from 'react';
import PropTypes from 'prop-types'
import TimeKeeper from 'react-timekeeper';
import {
  withStyles,
  Modal,
  Button,
  Typography,
  Checkbox,
  Grid
} from "material-ui";

import {
  ItemGrid
} from "components";

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}  
function formatAMPM(stringDate) {
  var date = new Date(stringDate);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function createDate(hours,minutes){
  var today = new Date();
  var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, 0);
  if(myToday.getTimezoneOffset() != 0){
    myToday.setTime( myToday.getTime() - myToday.getTimezoneOffset()*60*1000);
  }
  return myToday;
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
    constructor(props){
    super(props)
    this.state = {
      scheduleId:null,
      checkedMonday: false,
      checkedTuesday: false,
      checkedWednesday: false,
      checkedThursday: false,
      checkedFriday: false,
      checkedSaturday: false,
      checkedSunday: false,
      time: '12:30 pm',
      displayTimepicker: false,
      isDataLoaded : false,
      date:''
    }
    this.handleTimeChange = this.handleTimeChange.bind(this)
  }; 

  handleTimeChange(newTime){
        this.setState({ 
          time: newTime.formatted,
          date: createDate(newTime.hour24,newTime.minute)
        })
        console.log(this.state.date);
    }

  toggleTimekeeper(val){
        this.setState({displayTimepicker: val})
    }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  loadScheduleData(data){
    this.setState({
      scheduleId: data.scheduleId,
      checkedMonday: data.monday,
      checkedTuesday: data.tuesday,
      checkedWednesday: data.wednesday,
      checkedThursday: data.thursday,
      checkedFriday: data.friday,
      checkedSaturday: data.saturday,
      checkedSunday: data.sunday,
      time: data.scheduleTime,
      date: data.date,
      displayTimepicker: false,
      isDataLoaded : true
    })
  }

    onSubmitSchedule(hideModal,updateTime) {
      const {time,scheduleId,checkedMonday,checkedTuesday,checkedWednesday,checkedThursday,checkedFriday,checkedSaturday,checkedSunday,date} = this.state;
      console.log("Time called in onSubmitSchedule");
      console.log(time);
      fetch('http://localhost:3100/updateBottleSchedule',{
        credentials: "same-origin",
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "schedule_id": scheduleId,
          "monday": checkedMonday,
          "tuesday":checkedTuesday,
          "wednesday": checkedWednesday,
          "thursday":checkedThursday,
          "friday":checkedFriday,
          "saturday":checkedSaturday,
          "sunday":checkedSunday,
          "schedule_time":date
        })
      })
        .then(response => {
          console.log(response);
          return response.json()
        })
        .then(bottleSchedule => {
            if(bottleSchedule.schedule_id){
              updateTime();
              hideModal();
             }
           })
    }

  render() {
    const { classes,bottleId,scheduleData,show,hideModal,updateTime} = this.props;
    if(this.state.isDataLoaded == false && scheduleData.scheduleId != null && scheduleData.bottleId == bottleId){
      this.loadScheduleData(scheduleData);
      return null;
    }
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={show}
        >
          <div style={getModalStyle()} className={classes.paper}>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={6}>
              <Checkbox
                checked={this.state.checkedMonday}
                onChange={this.handleChange('checkedMonday')}
                value="checkedMonday"
              /> Monday
              <br/>
              <Checkbox
                checked={this.state.checkedTuesday}
                onChange={this.handleChange('checkedTuesday')}
                value="checkedTuesday"
              /> Tuesday
              <br/>
              <Checkbox
                checked={this.state.checkedWednesday}
                onChange={this.handleChange('checkedWednesday')}
                value="checkedWednesday"
              />  Wednesday
              <br/>
              <Checkbox
                checked={this.state.checkedThursday}
                onChange={this.handleChange('checkedThursday')}
                value="checkedThursday"
              /> Thursday
              <br/>
              <Checkbox
                checked={this.state.checkedFriday}
                onChange={this.handleChange('checkedFriday')}
                value="checkedFriday"
              /> Friday
              <br/>
              <Checkbox
                checked={this.state.checkedSaturday}
                onChange={this.handleChange('checkedSaturday')}
                value="checkedSaturday"
              /> Saturday
              <br/>
              <Checkbox
                checked={this.state.checkedSunday}
                onChange={this.handleChange('checkedSunday')}
                value="checkedSunday"
              /> Sunday
              <br/>
          </ItemGrid> 
          <ItemGrid xs={12} sm={12} md={6}>
            {this.state.displayTimepicker ?
                    <TimeKeeper
                        time={this.state.time}
                        onChange={this.handleTimeChange}
                        onDoneClick={() => {
                            this.toggleTimekeeper(false)
                        }}
                        switchToMinuteOnHourSelect={true}
                    />
                    :
                    false
                }
                <span>Pill Schedule Time: {this.state.time}</span>
                <Button color="primary" onClick={() => this.toggleTimekeeper(true)}>Change</Button>
            </ItemGrid>
           </Grid>
          <Button onClick={() => {
            this.loadScheduleData(scheduleData)
            hideModal()
          }} color="primary" >Close</Button>
          <Button onClick={() => this.onSubmitSchedule(hideModal(),updateTime(this.state.time))} color="primary" >Save</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;