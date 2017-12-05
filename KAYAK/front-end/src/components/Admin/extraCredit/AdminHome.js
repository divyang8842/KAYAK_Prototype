import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import * as chartAPI from './../../../api/Admin/ChartsAPI'
import Chart from './Chart';
import Chart2 from './Chart2';
import * as API from '../../../api/Admin/AdminUserAPI';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
var graphToShow = "" ;
class AddRemoveLayout extends React.PureComponent  {

state={items:[],users:[],cities:[],flag1:true,flag2:true,flag3:true,flag4:true,flag5:true,flag6:true,flag7:true,flag8:true,flag9:true,
  flag11:true,flag10:true,flag12:true,tracking1:[],tracking2:[],tracking3:[],pageTime:[]};
    static defaultProps = {
        className: "layout",
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
        rowHeight: 100
    };

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            newCounter: 0
        };

        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
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
                    pageTime:{
                        labels: result.user_tracting.timeTitle[0],
                        datasets:[{ label:'Time Per Page',
                            data:result.user_tracting.timeData[0],
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
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
                    pageTime:{
                        labels: result.user_tracting.timeTitle[0],
                        datasets:[{ label:'Time Per Page',
                            data:result.user_tracting.timeData[0],
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
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
                    pageTime:{
                        labels: result.user_tracting.timeTitle[0],
                        datasets:[{ label:'Time Per Page',
                            data:result.user_tracting.timeData[0],
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                                'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
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
        //console.log("YEAR: "+data.year);
      /*  chartAPI.getChartsData(data)
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
            });*/
    }
    createElement(el) {
        const removeStyle = {
            position: 'absolute',
            right: '2px',
            top: 0,
            cursor: 'pointer'
        };
        const i =  el.i;
        return (


            <div key={i} data-grid={el} >
                {/*{el.add ?
                    <span className="add text" onClick={this.onAddItem} title="You can add an item by clicking here, too.">Add +</span>
                    : <span className="text">{i}</span>}*/}

                <span className="remove" style={removeStyle} onClick={()=>this.onRemoveItem(i)}>x</span>
                {i=='1'
                    ? (<Chart chartData={this.state.carCount} chartTitle="Car Count" legendPosition="bottom"/>)
                    : (i=='CAR_REVENUE'
                        ? (<Chart chartData={this.state.carRevenue} chartTitle="Car Revenue" legendPosition="bottom"/>)
                        : (i=='FLIGHT_COUNT'
                            ? (<Chart chartData={this.state.flightCount} chartTitle="Flight Count" legendPosition="bottom"/>)
                            : (i=='FLIGHT_REVENUE'
                                ? (<Chart chartData={this.state.flightRevenue} chartTitle="Flight Revenue" legendPosition="bottom"/>)
                                : (i=='HOTEL_COUNT'
                                    ? (<Chart chartData={this.state.hotelCount} chartTitle="Hotel Count" legendPosition="bottom"/>)
                                    : (i=='HOTEL_REVENUE'
                                        ? (<Chart chartData={this.state.hotelRevenue} chartTitle="Hotel Revenue" legendPosition="bottom"/>)
                                        : (i=='CITY_COUNT'
                                            ? (<Chart chartData={this.state.cityCount} chartTitle="City Count" legendPosition="bottom"/>)
                                            : (i=='CITY_REVENUE'
                                                ? (<Chart chartData={this.state.cityRevenue} chartTitle="City Revenue" legendPosition="bottom"/>)
                                                : (i=='PAGE_CLICKS'
                                                    ? (<Chart chartData={this.state.pageClicks} chartTitle="Clicks Per Page" legendPosition="bottom"/>)
                                                    : (i=='LEAST_SEEN'
                                                        ? (<Chart chartData={this.state.leastSeen} chartTitle="Least Seen Areas" legendPosition="bottom"/>)
                                                        : ((i=='PAGE_TIME'
                                                            ? (<Chart chartData={this.state.pageTime} chartTitle="Page Time" legendPosition="bottom"/>)
                                                            : (i=='USER_TRACK'
                                                                ? (<Chart2 chartData={this.state.tracking1} chartTitle="User Tracking" legendPosition="bottom"/>)
                                                                : (null)))))))))))))}


            </div>
        );
    }

hideButton(n){
  if(n==1)
  this.setState({flag1:!this.state.flag1});
  else if(n==2)
  this.setState({flag2:!this.state.flag2});
  else if(n==3)
  this.setState({flag3:!this.state.flag3});
  else if(n==4)
  this.setState({flag4:!this.state.flag4});
  else if(n==5)
  this.setState({flag5:!this.state.flag5});
  else if(n==6)
  this.setState({flag6:!this.state.flag6});
  else if(n==7)
  this.setState({flag7:!this.state.flag7});
  else if(n==8)
  this.setState({flag8:!this.state.flag8});
  else if(n==9)
  this.setState({flag9:!this.state.flag9});
  else if(n==10)
  this.setState({flag10:!this.state.flag10});
  else if(n==11)
  this.setState({flag11:!this.state.flag11});
  else if(n==12)
  this.setState({flag12:!this.state.flag12});
}


    onAddItem(data) {
        if(!data){
            data = "CAR_COUNT";
        }
        //alert(JSON.stringify(data));
        graphToShow = data;
        /*eslint no-console: 0*/
        console.log('adding', 'n' + this.state.newCounter);
        this.setState({
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: data,
                x: this.state.items.length * 3 % (this.state.cols || 12),
                y: this.state.items.length * 3 % (this.state.cols || 12),/*Infinity*/ // puts it at the bottom
                w: 3,
                h: 3
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
        this.setState({layout: layout});
    }

    onRemoveItem(i) {
        alert('deleting');
        console.log('removing', i);
        this.setState({items: _.reject(this.state.items, {i: i})});
    }

    componentWillMount(){
    /*  var u=[],c=[];
        this.setState({ users: []});
          API.listusers()
              .then((data) => {
                  if (data) {
                    //console.log("USERS CHECK: "+data);
                    for(var i=0;i<data.length;i++){
                    u = this.state.users.push(data[i]);
                    if(data[i].city)
                      c = this.state.cities.push(data[i].city);
                    this.setState({ users: u,cities:c });
                  }
                  const uniqueCities = Array.from(new Set(this.state.cities));
                  this.setState({cities:c });
                }
                 else {
                      console.log("Error");
                  }
              });*/
        this.getChartData({'year':2017});
          this.getChartData({"type":'usertracking',"userid":0});
    }

    render() {

        return (

            <div class="container">
                <div class="row">
                    <div class="col-xs-3">


                            <div className="col-lg-12 col-md-12 col-sm-12">
                            <br/>
                                Select Year:
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





                            <div className="col-lg-12 col-md-12 col-sm-12"><br/></div>
                        <div className="col-lg-12 col-md-12 col-sm-12">

<table>
    <tr><td><button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem("1"); this.hideButton(1); }.bind(this)} disabled={this.state.flag1}>Top 10 Car Count</button></td></tr>
    <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('CAR_REVENUE'); this.hideButton(2); }.bind(this)} disabled={this.state.flag2}> Top 10 Car Revenue </button></td></tr>
    <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('FLIGHT_COUNT'); this.hideButton(3); }.bind(this)} disabled={this.state.flag3}> Top 10 Airlines Count</button></td></tr>
    <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('FLIGHT_REVENUE'); this.hideButton(4); }.bind(this)} disabled={this.state.flag4}> Top 10 Airlines Revenue</button></td></tr>
    <tr><td><button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('HOTEL_COUNT'); this.hideButton(5); }.bind(this)} disabled={this.state.flag5}> Top 10 Hotels Count</button></td></tr>
    <tr><td><button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('HOTEL_REVENUE'); this.hideButton(6); }.bind(this)} disabled={this.state.flag6}> Top 10 Hotels Revenue</button></td></tr>
    <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('CITY_COUNT'); this.hideButton(7); }.bind(this)} disabled={this.state.flag7}> Top 10 City Count</button></td></tr>
    <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('CITY_REVENUE'); this.hideButton(8); }.bind(this)} disabled={this.state.flag8}> Top 10 City Revenue </button></td></tr>
    <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('PAGE_CLICKS'); this.hideButton(9); }.bind(this)} disabled={this.state.flag9}>Clicks per page</button></td></tr>
    <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('LEAST_SEEN'); this.hideButton(10); }.bind(this)} disabled={this.state.flag10}>Least seen areas</button></td></tr>
   <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('PAGE_TIME'); this.hideButton(11); }.bind(this)} disabled={this.state.flag11}>Time per page</button></td></tr>
      <tr><td> <button className="w3-button w3-white w3-border w3-border-green w3-round-large" onClick={function(){ this.onAddItem('USER_TRACK'); this.hideButton(12); }.bind(this)} disabled={this.state.flag12}>User tracking</button></td></tr>
</table>
                        </div>
                    </div>
                    <div class="col-xs-9">
                        <div>
                            <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakpointChange}
                                                       {...this.props}     className="layout"
                                                       cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                                                       >
                                {_.map(this.state.items, (el) => this.createElement(el))}

                            </ResponsiveReactGridLayout>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(AddRemoveLayout);
/*module.exports = AddRemoveLayout;*/

/*

if (require.main === module) {
    require('./hook')(module.exports);
}
*/
