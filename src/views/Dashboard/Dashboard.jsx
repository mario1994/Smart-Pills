import React, { Component }  from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  InfoOutline,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  AddAlarm,
  Restore
} from "material-ui-icons";
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  RegularCard,
  Table,
  ItemGrid
} from "components";

import {
  dailyPillChart,
  bottleTemperatureChart
} from "variables/charts";

import dashboardStyle from "variables/styles/dashboardStyle";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
    value: 0,
    pillTime: "3:00 PM",
    timesLate : 0,
    daysUntilRefill : 4
    };
  }
  componentDidMount() {
    fetch('http://localhost:3100')
      .then(response => {
        if (response.ok) {
          console.log(response)
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log(data)
      })
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { user } = this.props;
    console.log(this.props.user);
    return (
      <div>
        <Grid container>
        <ItemGrid xs={12} sm={6} md={4}>
            <StatsCard
              icon={AddAlarm}
              iconColor="green"
              title="Pill schedule"
              description={this.state.pillTime}
              statIcon={DateRange}
              statText="Everyday"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={4}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="Late to take medicine"
              description={this.state.timesLate}
              statIcon={LocalOffer}
              statText="stats for this week"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={4}>
            <StatsCard
              icon={Restore}
              iconColor="orange"
              title="Days until refill"
              description={this.state.daysUntilRefill}
              statIcon={Update}
              statText="Updated today"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailyPillChart.data}
                  type="Line"
                  options={dailyPillChart.options}
                  listener={dailyPillChart.animation}
                />
              }
              chartColor="green"
              title="Daily Pill intake"
              text={
                <span>
                  <span className={this.props.classes.successText}>
                    <ArrowUpward
                      className={this.props.classes.upArrowCardCategory}
                    />{" "}
                    50%
                  </span>{" "}
                  increase in this weeks pill intake.
                </span>
              }
              statIcon={AccessTime}
              statText="updated 4 minutes ago" //This will be done by substracting timestamp from when the view loads and when the data was updated
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={6}>
            <ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={bottleTemperatureChart.data}
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
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              headerColor="orange"
              cardTitle="Pills on the market"
              cardSubtitle="Popular medicine and prices"
              content={
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Price", "Store"]}
                  tableData={[
                    ["1", "Omega 3 XL", "$30", "Amazon"],
                    ["2", "Rivaroxaban", "$50", "Rite Aid"],
                    ["3", "Neofen", "$10", "Walmart"],
                    ["4", "Vitamin pack", "$25", "CVS Pharmacy"]
                  ]}
                />
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
