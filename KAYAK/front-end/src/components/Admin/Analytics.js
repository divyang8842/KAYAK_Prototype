import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import Chart from './Chart';
import ChartUT from './ChartUserTracking';
import * as chartAPI from './../../api/Admin/ChartsAPI'
import * as API from '../../api/Admin/AdminUserAPI';

class Analytics extends Component {

  state = {
    carCount:[], carRevenue:{}, flightCount:[], flightRevenue:[], pageClicks:{},tracking1:[],tracking2:[],tracking3:[],
    hotelCount:{}, hotelRevenue:{}, cityCount:{}, cityRevenue:{},leastSeen:{},UTtitles:[],UTdata:[],tracking4:[],tracking5:[],
    visible1:false, visible2:false, visible3:false, visible4:false, visible5:false,visible6:false,visible7:true,
    flag1:false, flag2:false, flag3:false, flag4:false, flag5:false,users: [],cities:[], count:0,userTitles:[],userData:[]
  };

  componentWillMount(){
    var u=[],c=[];
      this.setState({ users: []});
        API.listusers()
            .then((data) => {
                if (data) {
                  //console.log("USERS CHECK: "+data);
                  for(var i=0;i<data.length;i++){
                  u = this.state.users.concat(data[i]);
                  if(data[i].city)
                    c = this.state.cities.concat(data[i].city);
                  this.setState({ users: u,cities:c });
                }
                const uniqueCities = Array.from(new Set(this.state.cities));
                this.setState({cities:c });
              }
               else {
                    console.log("Error");
                }
            });
      var year = new Date().getFullYear();
    this.getChartData({"year":year.data});
    this.getChartData({"type":'usertracking',"userid":0});
  }

  getChartData(data){
    //for user tracking charts
    if(data.type==='usertracking'){
      console.log("WITH USERTRACKING all");
      //userid filter
      if(data.userid>0){
        //alert(data.userid);
        console.log("USER ID: "+data.userid);
        chartAPI.getChartsData(data)
          .then((result) => {
              if (result) {
this.setState({userTitles:result.user_tracting.title,userData:result.user_tracting.data});
                this.setState({
                  tracking1:{
                      labels: result.user_tracting.title[0],
                      datasets:[{ label:'Tracking',
                          data:result.user_tracting.data[0],
                          backgroundColor:[
                              'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                              'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                  tracking2:{
                    labels: result.user_tracting.title[1],
                    datasets:[{ label:'Tracking',
                    data:result.user_tracting.data[1],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                      tracking3:{
                        labels: result.user_tracting.title[2],
                        datasets:[{ label:'Tracking',
                        data:result.user_tracting.data[2],
                        backgroundColor:[
                          'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                          'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                  tracking4:{
                    labels: result.user_tracting.title[3],
                    datasets:[{ label:'Tracking',
                    data:result.user_tracting.data[3],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                      tracking5:{
                        labels: result.user_tracting.title[4],
                        datasets:[{ label:'Tracking',
                        data:result.user_tracting.data[4],
                        backgroundColor:[
                          'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                          'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    });

              }
            })
          }//userid
      //city filter
      else if(data.city){
        //alert(data.city);
        console.log("CITY ID: "+data.city);
        chartAPI.getChartsData(data)
          .then((result) => {
              if (result) {
                this.setState({userTitles:result.user_tracting.title,userData:result.user_tracting.data});
                this.setState({
                  tracking1:{
                      labels: result.user_tracting.title[0],
                      datasets:[{ label:'Tracking',
                          data:result.user_tracting.data[0],
                          backgroundColor:[
                              'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                              'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                  tracking2:{
                    labels: result.user_tracting.title[1],
                    datasets:[{ label:'Tracking',
                    data:result.user_tracting.data[1],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                      tracking3:{
                        labels: result.user_tracting.title[2],
                        datasets:[{ label:'Tracking',
                        data:result.user_tracting.data[2],
                        backgroundColor:[
                          'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                          'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                  tracking4:{
                    labels: result.user_tracting.title[3],
                    datasets:[{ label:'Tracking',
                    data:result.user_tracting.data[3],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                      tracking5:{
                        labels: result.user_tracting.title[4],
                        datasets:[{ label:'Tracking',
                        data:result.user_tracting.data[4],
                        backgroundColor:[
                          'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                          'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    });
              }
            })
          }//city
    //no filter
    else {
      chartAPI.getChartsData(data)
          .then((result) => {
              if (result) {
this.setState({userTitles:result.user_tracting.title,userData:result.user_tracting.data});
                this.setState({
                  tracking1:{
                      labels: result.user_tracting.title[0],
                      datasets:[{ label:'Tracking',
                          data:result.user_tracting.data[0],
                          backgroundColor:[
                              'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                              'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                  tracking2:{
                    labels: result.user_tracting.title[1],
                    datasets:[{ label:'Tracking',
                    data:result.user_tracting.data[1],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                      tracking3:{
                        labels: result.user_tracting.title[2],
                        datasets:[{ label:'Tracking',
                        data:result.user_tracting.data[2],
                        backgroundColor:[
                          'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                          'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                  tracking4:{
                    labels: result.user_tracting.title[3],
                    datasets:[{ label:'Tracking',
                    data:result.user_tracting.data[3],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                      tracking5:{
                        labels: result.user_tracting.title[4],
                        datasets:[{ label:'Tracking',
                        data:result.user_tracting.data[4],
                        backgroundColor:[
                          'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                          'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    });
              }
            })
    }//else
  }
  //for all other charts
    else{
    console.log("WITH Other data");
    chartAPI.getChartsData(data)
        .then((result) => {
            if (result) {
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
                        labels: result.car_count.title,
                        datasets:[{ label:'Cars Count',
                            data:result.car_count.data,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    carRevenue:{
                        labels: result.car_revenue.title,
                        datasets:[{ label:'Cars Revenue',
                            data:result.car_revenue.data,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    flightCount:{
                        labels: result.flight_count.title,
                        datasets:[{ label:'Flights Count',
                            data:result.flight_count.data,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    flightRevenue:{
                        labels: result.flight_revenue.title,
                        datasets:[{ label:'Flight Revenue',
                            data:result.flight_revenue.data,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                    hotelCount:{
                      labels: result.hotel_count.title,
                      datasets:[{ label:'Hotel Count',
                                  data:result.hotel_count.data,
                                  backgroundColor:[
                                            'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                            'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                            'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},

                    hotelRevenue:{
                      labels: result.hotel_revenue.title,
                      datasets:[{ label:'Hotel Revenue',
                                  data:result.hotel_revenue.data,
                                  backgroundColor:[
                                            'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                            'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                            'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    cityCount:{
                      labels: result.city_count.title,
                      datasets:[{ label:'City Count',
                                  data:result.city_count.data,
                                  backgroundColor:[
                                            'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                            'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                            'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
                    cityRevenue:{
                      labels: result.city_revenue.title,
                      datasets:[{ label:'City Revenue',
                                  data:result.city_revenue.data,
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
      }// else
  }



  showDiv(n) {
    if(n===1){
      this.setState({visible1: true,visible2: false,visible3: false,visible4: false,visible5: false,visible6: false,visible7: false,
        flag1: false,flag2: true,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false});
    }
    else if(n===2){
      this.setState({visible1:false,visible2: true,visible3: false,visible4: false,visible5: false,visible6: false,visible7: false,
        flag1: false,flag2: false,flag3: false,flag4: true,flag5: false,flag6: false,flag7: false,flag8: false});
    }
    else if(n===3){
      this.setState({visible1:false,visible2: false,visible3: true,visible4: false,visible5: false,visible6: false,visible7: false,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: true,flag7: false,flag8: false});
    }
    else if(n===4){
      this.setState({visible1:false,visible2: false,visible3: false,visible4: true,visible5: false,visible6: false,visible7: false,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: true});
    }
    else if(n===5){
      this.setState({visible1:false,visible2: false,visible3: false,visible4: false,visible5: true,visible6: false,visible7: false,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false});
    }
    else if(n===6){
      this.setState({visible1:false,visible2: false,visible3: false,visible4: false,visible5: false,visible6: true,visible7: false,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false});
    }
    else if(n===7){
      this.setState({visible1:false,visible2: false,visible3: false,visible4: false,visible5: false,visible6: false,visible7: true,
        flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false});
    }
  }


  showSubDiv(n) {
    if(n===1){
      this.setState({flag1: true,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false,
      visible1:true,visible2: false,visible3: false,visible4: false,visible5: false,visible6: false,visible7: false});
    }
    else if(n===2){
      this.setState({flag1: false,flag2: true,flag3: false,flag4: false,flag5: false, flag6: false,flag7: false,flag8: false,
      visible1:true,visible2: false,visible3: false,visible4: false,visible5: false,visible6: false,visible7: false});
    }
    else if(n===3){
      this.setState({flag1: false,flag2: false,flag3: true,flag4: false,flag5: false,flag6: false,flag7: false,flag8: false,
      visible1:false,visible2: true,visible3: false,visible4: false,visible5: false,visible6: false,visible7: false});
    }
    else if(n===4){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: true,flag5: false,flag6: false,flag7: false,flag8: false,
      visible1:false,visible2: true,visible3: false,visible4: false,visible5: false,visible6: false,visible7: false});
    }
    else if(n===5){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: false,flag5: true,flag6: false,flag7: false,flag8: false,
      visible1:false,visible2: false,visible3: true,visible4: false,visible5: false,visible6: false,visible7: false});
    }
    else if(n===6){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: true,flag7: false,flag8: false,
                     visible1:false,visible2: false,visible3: true,visible4: false,visible5: false,visible6: false,visible7: false});
    }
    else if(n===7){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: true,flag8: false,
      visible1:false,visible2: false,visible3: false,visible4: true,visible5: false,visible6: false,visible7: false});
    }
    else if(n===8){
      this.setState({flag1: false,flag2: false,flag3: false,flag4: false,flag5: false,flag6: false,flag7: false,flag8: true,
      visible1:false,visible2: false,visible3: false,visible4: true,visible5: false,visible6: true,visible7: false});
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
 </div>
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
                      : (this.state.visible7
                        ? (<div>
                          <div className="row">
                          <div className="col-xxs-4 col-xs-4 mt"></div>
                          <div className="col-xxs-2 col-xs-2 mt">
                          <select onChange={(event)=>{this.getChartData({"year":"",type:"usertracking","userid":event.target.value})}}>
                          <option value="" disabled selected>Select User</option>
                          {this.state.users.map(id =>
                            <option key={id.user_id} value={id.user_id}>{id.fname }</option>
                          )};
                          </select>
                          </div>

                          <div className="col-xxs-2 col-xs-2 mt">
                          <select onChange={(event)=>{this.getChartData({"year":"",type:"usertracking","city":event.target.value})}}>
                          <option value="" disabled selected>Select City</option>
                          {this.state.cities.map(city =>
                            <option key={city} value={city}>{city}</option>
                          )};
                          </select>
                          </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                          <ChartUT chartData={this.state.tracking1} chartTitle="User Tracking" legendPosition="bottom"/>
                          <ChartUT chartData={this.state.tracking2} chartTitle="User Tracking" legendPosition="bottom"/>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                          <ChartUT chartData={this.state.tracking3} chartTitle="User Tracking" legendPosition="bottom"/>
                          <ChartUT chartData={this.state.tracking4} chartTitle="User Tracking" legendPosition="bottom"/>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                          <ChartUT chartData={this.state.tracking5} chartTitle="User Tracking" legendPosition="bottom"/>
                          </div>
                          </div>
                        )
                        : null))))))
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
