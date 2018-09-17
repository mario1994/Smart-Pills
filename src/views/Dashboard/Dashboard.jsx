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

import {
  user
} from "variables/User";

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
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <Grid container alignItems="center">
        <ItemGrid xs={12} sm={6} md={6}>
            <RegularCard
              cardTitle="Take your medication on time!"
              cardSubtitle = "Help yourself never miss a medication"
              content= "Smart Pills helps you keep your schedule on track"
              headerColor= "blue"

            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={6}>
            <RegularCard
              cardTitle="Order your bottle today!"
              cardSubtitle = "Smart pills bottles price starting from 29,99$"
              content= "Currently out of stock"
              headerColor= "green"
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
