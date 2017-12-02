import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import Chart from './Chart';
import * as chartAPI from './../../api/Admin/ChartsAPI'

class Analytics extends Component {

  state = {
    carCount:[], carRevenue:{}, flightCount:[], flightRevenue:[], pageClicks:{},
    hotelCount:{}, hotelRevenue:{}, cityCount:{}, cityRevenue:{},leastSeen:{},
    visible1:false, visible2:false, visible3:false, visible4:false, visible5:false,visible6:false,
    flag1:false, flag2:false, flag3:false, flag4:false, flag5:false
  };

  componentWillMount(){
      var year = new Date().getFullYear();
    this.getChartData({"year":year.data});
  }

  getChartData(data){
    console.log("YEAR: "+data.year);
    chartAPI.getChartsData(data)
        .then((result) => {
            if (result) {
              var car_count_len=(result.car_count.data).length;
              var car_revenue_len=(result.car_revenue.data).length;
              var hotel_count_len=(result.hotel_count.data).length;
              var hotel_revenue_len=(result.hotel_revenue.data).length;
              var flight_count_len=(result.flight_count.data).length;
              var flight_revenue_len=(result.flight_revenue.data).length;
              var city_count_len=(result.city_count.data).length;
              var city_revenue_len=(result.city_revenue.data).length;
              var car_count_label=[], car_revenue_label=[], hotel_count_label=[], hotel_revenue_label=[], flight_count_label=[], flight_revenue_label=[],city_count_label=[], city_revenue_label=[];
              var car_count_data=[], car_revenue_data=[], hotel_count_data=[], hotel_revenue_data=[], flight_count_data=[],flight_revenue_data=[],city_count_data=[], city_revenue_data=[];

              for(var i=0;i<car_count_len;i++){
                car_count_label.push(result.car_count.title[i]);
                car_count_data.push(result.car_count.data[i]);
              }
              for(var i=0;i<car_revenue_len;i++){
                car_revenue_label.push(result.car_revenue.title[i]);
                car_revenue_data.push(result.car_revenue.data[i]);
              }
              for(var i=0;i<hotel_count_len;i++){
                hotel_count_label.push(result.hotel_count.title[i]);
                hotel_count_data.push(result.hotel_count.data[i]);
              }
              for(var i=0;i<hotel_revenue_len;i++){
                hotel_revenue_label.push(result.hotel_revenue.title[i]);
                hotel_revenue_data.push(result.hotel_revenue.data[i]);
              }
              for(var i=0;i<flight_count_len;i++){
                flight_count_label.push(result.flight_count.title[i]);
                flight_count_data.push(result.flight_count.data[i]);
              }
              for(var i=0;i<flight_revenue_len;i++){
                flight_revenue_label.push(result.flight_revenue.title[i]);
                flight_revenue_data.push(result.flight_revenue.data[i]);
              }
              for(var i=0;i<city_count_len;i++){
                city_count_label.push(result.city_count.title[i]);
                city_count_data.push(result.city_count.data[i]);
              }
              for(var i=0;i<city_revenue_len;i++){
                city_revenue_label.push(result.city_revenue.title[i]);
                city_revenue_data.push(result.city_revenue.data[i]);
              }

                this.setState({
                  pageClicks:{
                      labels: result.clicks_per_page.title,
                      datasets:[{ label:'Clicks per page',
                          data:result.clicks_per_page.data,
                          backgroundColor:[
                              'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                              'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                  leastSeen:{
                      labels: result.least_seen_area.title,
                      datasets:[{ label:'Cars Count',
                          data:result.least_seen_area.data,
                          backgroundColor:[
                              'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                              'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                    carCount:{
                        labels: car_count_label,
                        datasets:[{ label:'Cars Count',
                            data:car_count_data,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    carRevenue:{
                        labels: car_revenue_label,
                        datasets:[{ label:'Cars Revenue',
                            data:car_revenue_data,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    flightCount:{
                        labels: flight_count_label,
                        datasets:[{ label:'Flights Count',
                            data:flight_count_data,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    flightRevenue:{
                        labels: flight_revenue_label,
                        datasets:[{ label:'Flight Revenue',
                            data:flight_revenue_data,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)']}]},

                    hotelCount:{
                      labels: hotel_count_label,
                      datasets:[{ label:'Hotel Count',
                                  data:hotel_count_data,
                                  backgroundColor:[
                                            'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                            'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                            'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                    hotelRevenue:{
                      labels: hotel_revenue_label,
                      datasets:[{ label:'Hotel Revenue',
                                  data:hotel_revenue_data,
                                  backgroundColor:[
                                            'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                            'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                            'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    cityCount:{
                      labels: city_count_label,
                      datasets:[{ label:'City Count',
                                  data:city_count_data,
                                  backgroundColor:[
                                            'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                            'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                            'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    cityRevenue:{
                      labels: city_revenue_label,
                      datasets:[{ label:'City Revenue',
                                  data:city_revenue_data,
                                  backgroundColor:[
                                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                });

            }
           else {
                console.log("Error");
            }
        });
  }

  /*changeYear(y){
    console.log("YEAR: "+y);
    this.getChartData({"year":y});
  }*/


  showDiv(n) {
    if(n===1){
      this.setState({visible1: true,visible2: false,visible3: false,visible4: false,visible5: false,visible6: false,
        flag1: false,flag2: true,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false});
    }
    else if(n===2){
      this.setState({visible1:false,visible2: true,visible3: false,visible4: false,visible5: false,visible6: false,
        flag1: false,flag2: false,flag3: false,flag4: true,flag5: false,flag6: false,flag7: false,flag8: false});
    }
    else if(n===3){
      this.setState({visible1:false,visible2: false,visible3: true,visible4: false,visible5: false,visible6: false,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: true,flag7: false,flag8: false});
    }
    else if(n===4){
      this.setState({visible1:false,visible2: false,visible3: false,visible4: true,visible5: false,visible6: false,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: true});
    }
    else if(n===5){
      this.setState({visible1:false,visible2: false,visible3: false,visible4: false,visible5: true,visible6: false,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false});
    }
    else if(n===6){
      this.setState({visible1:false,visible2: false,visible3: false,visible4: false,visible5: false,visible6: true,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false});
    }
  }


  showSubDiv(n) {
    if(n===1){
      this.setState({flag1: true,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false,
      visible1:true,visible2: false,visible3: false,visible4: false,visible5: false,visible6: false});
    }
    else if(n===2){
      this.setState({flag1: false,flag2: true,flag3: false,flag4: false,flag5: false, flag6: false,flag7: false,flag8: false,
      visible1:true,visible2: false,visible3: false,visible4: false,visible5: false,visible6: false});
    }
    else if(n===3){
      this.setState({flag1: false,flag2: false,flag3: true,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false,
      visible1:false,visible2: true,visible3: false,visible4: false,visible5: false,visible6: false});
    }
    else if(n===4){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: true,flag5: false,flag6: false,flag7: false,flag8: false,
      visible1:false,visible2: true,visible3: false,visible4: false,visible5: false,visible6: false});
    }
    else if(n===5){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: false,flag5: true,flag6: false,flag7: false,flag8: false,
      visible1:false,visible2: false,visible3: true,visible4: false,visible5: false,visible6: false});
    }
    else if(n===6){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: true,flag7: false,flag8: false,
                     visible1:false,visible2: false,visible3: true,visible4: false,visible5: false,visible6: false});
    }
    else if(n===7){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: true,flag8: false,
      visible1:false,visible2: false,visible3: false,visible4: true,visible5: false,visible6: false});
    }
    else if(n===8){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: true,
      visible1:false,visible2: false,visible3: false,visible4: true,visible5: false,visible6: true});
    }
  }


    render() {
        return (
          <div>
          <div id="fh5co-page">
          <div className="container">
        <h3 style={{fontWeight:"bold",textAlign:"center"}}>Analytics Charts</h3>
        <div className="col-xxs-12 col-xs-12 mt"></div>

        <div className="row">

        <div className="w3-bar">
        <div className="col-xxs-1 col-xs-1 mt"></div>
        <div className="col-xxs-11 col-xs-11 mt">
        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="User tracking" onClick={() => this.showDiv(7)}>User Tracking</button>
        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Top 10 car agency" onClick={() => this.showDiv(1)}>Top 10 car agency</button>
        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Top 10 flights" onClick={() => this.showDiv(2)}>Top 10 flights</button>
        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Top 10 hotels" onClick={() => this.showDiv(3)}>Top 10 hotels</button>
        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Top 10 cities" onClick={() => this.showDiv(4)}>Top 10 cities</button>
        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Page clicks" onClick={() => this.showDiv(5)}>Page clicks</button>
        <button type="button" style={{color:"#F78536"}} className="w3-bar-item w3-button" value="Least Seen" onClick={() => this.showDiv(6)}>Least Seen</button>
        </div>
        </div>
        </div>
        <div className="col-xxs-12 col-xs-12 mt"></div>


<div className="row">
<div className="col-lg-5 col-md-5 col-sm-12"></div>
<div className="col-lg-5 col-md-5 col-sm-12">
Select year:
<select onChange={(event)=>{this.getChartData({"year":event.target.value})}}>
<option value="2017" disabled selected>Select</option>
  <option value="2017">2017</option>
  <option value="2016">2016</option>
  <option value="2015">2015</option>
  <option value="2014">2014</option>
  <option value="2013">2013</option>
  <option value="2012">2012</option>
</select>
</div>  </div>
<div className="col-xxs-12 col-xs-12 mt"></div>

      <div>
        {
          this.state.visible1
            ? (
              <div className="row">
              <div className="col-xxs-5 col-xs-5 mt"></div>
              <div className="col-xxs-7 col-xs-7 mt">
              <button type="button" style={{padding:'4px'}} className="btn btn-primary" value="Car count" onClick={() => this.showSubDiv(1)}>Count</button>
              &nbsp;
              <button type="button" style={{padding:'4px'}} className="btn btn-primary" value="Car revenue" onClick={() => this.showSubDiv(2)}>Revenue</button>
              </div>
              </div>
            )
            : (this.state.visible2
              ? (
                <div className="row">
                <div className="col-xxs-5 col-xs-5 mt"></div>
                <div className="col-xxs-7 col-xs-7 mt">
                <button type="button" style={{padding:'4px'}} className="btn btn-primary" value="Car count" onClick={() => this.showSubDiv(3)}>Count</button>
                &nbsp;
                <button type="button" style={{padding:'4px'}} className="btn btn-primary" value="Car revenue" onClick={() => this.showSubDiv(4)}>Revenue</button>
                </div>
                </div>
              )
              : (this.state.visible3
                ? (
                  <div className="row">
                  <div className="col-xxs-5 col-xs-5 mt"></div>
                  <div className="col-xxs-7 col-xs-7 mt">
                  <button type="button" style={{padding:'4px'}} className="btn btn-primary" value="Hotel count" onClick={() => this.showSubDiv(5)}>Count</button>
                  &nbsp;
                  <button type="button" style={{padding:'4px'}} className="btn btn-primary" value="Hotel revenue" onClick={() => this.showSubDiv(6)}>Revenue</button>
                  </div>
                  </div>
                )
                : (this.state.visible4
                  ? (
                    <div className="row">
                    <div className="col-xxs-5 col-xs-5 mt"></div>
                    <div className="col-xxs-7 col-xs-7 mt">
                    <button type="button" style={{padding:'4px'}} className="btn btn-primary" value="City count" onClick={() => this.showSubDiv(7)}>Count</button>
                    &nbsp;
                    <button type="button" style={{padding:'4px'}} className="btn btn-primary" value="City revenue" onClick={() => this.showSubDiv(8)}>Revenue</button>
                    </div>
                    </div>
                  )
                  : (this.state.visible5
                    ? (
                      <div className="row">
                      <Chart chartData={this.state.pageClicks} chartTitle="Clicks Per Page" legendPosition="bottom"/>
                      </div>
                    )
                    : (this.state.visible6
                      ? (
                        <div className="row">
                        <Chart chartData={this.state.leastSeen} chartTitle="Least Seen Areas" legendPosition="bottom"/>
                        </div>
                      )
                      : null)))))
        }
      </div>


      <div>
      {this.state.flag1
        ? (<Chart chartData={this.state.carCount} chartTitle="Car Count" legendPosition="bottom"/>)
        : (this.state.flag2
          ? (<Chart chartData={this.state.carRevenue} chartTitle="Car Revenue" legendPosition="bottom"/>)
          : (this.state.flag3
            ? (<Chart chartData={this.state.flightCount} chartTitle="Flight Count" legendPosition="bottom"/>)
            : (this.state.flag4
              ? (<Chart chartData={this.state.flightRevenue} chartTitle="Flight Revenue" legendPosition="bottom"/>)
              : (this.state.flag5
                ? (<Chart chartData={this.state.hotelCount} chartTitle="Hotel Count" legendPosition="bottom"/>)
                : (this.state.flag6
                  ? (<Chart chartData={this.state.hotelRevenue} chartTitle="Hotel Revenue" legendPosition="bottom"/>)
                  : (this.state.flag7
                    ? (<Chart chartData={this.state.cityCount} chartTitle="City Count" legendPosition="bottom"/>)
                    : (this.state.flag8
                      ? (<Chart chartData={this.state.cityRevenue} chartTitle="City Revenue" legendPosition="bottom"/>)
                      : null)))))))}
      </div>

</div>
</div>
</div>

        );
    }
}

export default Analytics;
