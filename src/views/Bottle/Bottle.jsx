import React, { Component }  from "react";
import PropTypes from "prop-types";
import { Grid, InputLabel } from "material-ui";
import ScheduleModal from "components/Modal/SimpleModal.jsx"
import ChartistGraph from "react-chartist";
import {
  StatsCard,
  RegularCard,
  ChartCard,
  Button,
  ItemGrid
} from "components";

import {
  Kitchen,
  Restore,
  AccessTime,
  AddAlarm,
  DateRange,
} from "material-ui-icons";

import {
  bottleTemperatureChart
} from "variables/charts";

import {
  user
} from "variables/User";

import avatar from "assets/img/faces/profilePicturePlaceholder.png";

function formatAMPM(stringDate) {
  if(stringDate == null){
    var strTime = "12:00 pm";
  }else{
    var date = new Date(stringDate);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
  }
  return strTime;
}

class Bottle extends Component {
  constructor() {
    super();
    this.state = {
     pillsTaken:0,
  	 show:false,
     chartData: {
                  labels: [],
                  series: [[]]
                },
     scheduleData:{
      scheduleId:null,
      bottleId:null,
      monday:false,
      tuesday:false,
      wednesday:false,
      thursday:false,
      friday:false,
      saturday:false,
      sunday:false,
      scheduleTime: null,
      date:null,
     },
     isDataFetched:false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false});
  };

  updateTime = (time) => {
    var scheduleData = this.state.scheduleData
    scheduleData.scheduleTime = time
    console.log("updateTime callde in Bottle.jsx");
    console.log(time);
    this.setState({scheduleData});
  }

  formatDatesAMPM = (dates) => {
  var formattedDates =[];
    dates.map((date) => {
    var createdDate = new Date(date);
    var hours = createdDate.getHours();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ampm;
    formattedDates.push(strTime);
      })
    return formattedDates;
  }

  loadData = (bottleId) => {
    this.loadTemperatureStats(bottleId);
    this.loadBottleStats(bottleId);
    this.loadScheduleData(bottleId);
    this.setState({isDataFetched:true})
  }
  loadScheduleData = (bottleId) => {
    var url = 'http://localhost:3100/getBottleSchedule/' + bottleId;
    fetch(url,{
        credentials: "same-origin",
        method: 'get',
        headers: {'Content-Type':'application/json'},
      })
        .then(response => {
          return response.json()
        })
          .then(scheduleData => {
            var schedule = scheduleData.bottleSchedule
                this.setState({scheduleData:{
                  scheduleId:schedule.schedule_id,
                  bottleId:schedule.bottle_id,
                  monday:schedule.monday,
                  tuesday:schedule.tuesday,
                  wednesday:schedule.wednesday,
                  thursday:schedule.thursday,
                  friday:schedule.friday,
                  saturday:schedule.saturday,
                  sunday:schedule.sunday,
                  scheduleTime: formatAMPM(schedule.schedule_time),
                  date:schedule.schedule_time
                 },
                 pillScheduleTime:formatAMPM(schedule.schedule_time),
               })
             }
        )
          .catch((error) => {
          console.log(error)
        })
  }

  loadBottleStats = (bottleId) => {
    var url = 'http://localhost:3100/getBottleData/' + bottleId;
    fetch(url,{
        credentials: "same-origin",
        method: 'get',
        headers: {'Content-Type':'application/json'},
      })
        .then(response => {
          return response.json()
        })
          .then(bottleData => {
                this.setState({pillsTaken: bottleData.bottle_opens})
             }
        )
          .catch((error) => {
          console.log(error)
        })
  }

  loadTemperatureStats = (bottleId) =>{
    var url = 'http://localhost:3100/getBottleMeasurments/' + bottleId;
    fetch(url,{
        credentials: "same-origin",
        method: 'get',
        headers: {'Content-Type':'application/json'},
      })
        .then(response => {
          return response.json()
        })
          .then(temperatureData => {
            var formattedTimes = this.formatDatesAMPM(temperatureData[1].time)
            if(temperatureData.length != 0){
                this.setState({chartData: {
                  labels: formattedTimes,
                  series: [temperatureData[0].temperature]
                }})
             }
        })
          .catch((error) => {
          console.log(error)
        })
    }


render() {
 const bottleId = (this.props.match.params.id)
  if(!this.state.isDataFetched || this.state.bottleId != bottleId){
    this.setState({bottleId:this.props.match.params.id}) 
    this.loadData(bottleId);
    return null
 } ;
  return (
    <div>
        <ScheduleModal mainDataLoaded={this.state.isDataFetched} scheduleData={this.state.scheduleData} bottleId={bottleId} show={this.state.show} hideModal={this.hideModal} updateTime={this.updateTime}/>
        <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle={`Bottle ${bottleId}`}
            cardSubtitle="Edit your schedule or unlink the bottle"
            content={
              <div>
                <Grid 
                container
                justify="space-between"
                >
                  <ItemGrid xs={12} sm={6} md={3}>
                  <StatsCard
                    icon={Kitchen}
                    iconColor="green"
                    title="Pills taken"
                    description={this.state.pillsTaken}
                    statIcon={Restore}
                    statText=""
                  />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={6} md={3}>
                  <StatsCard
                    icon={AddAlarm}
                    iconColor="green"
                    title="Pill schedule"
                    description={ this.state.scheduleData.scheduleTime}
                    statIcon={DateRange}
                    statText=""
                  />
                </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <ChartCard
                      chart={
                        <ChartistGraph
                          className="ct-chart"
                          data={this.state.chartData}
                          type="Line"
                          options={bottleTemperatureChart.options}
                          listener={bottleTemperatureChart.animation}
                        />
                      }
                      chartColor="red"
                      title="Bottle temperature"
                      text= "temperature should be under 25"
                      statIcon={AccessTime}
                      statText="temperature mesured 4 minutes ago"
                    />
                  </ItemGrid>
                </Grid>
                <Grid 
                container
                justify="space-between">
                <Button onClick={this.showModal} color="primary" >Show Schedule</Button>
                <Button onClick={this.showModal} color="primary" >Unlink Bottle</Button>
                </Grid>
              </div>
        }
        />
      </ItemGrid>
      </Grid>
  </div>
      );
     }
}
Bottle.propTypes = {
  
};

export default Bottle;
