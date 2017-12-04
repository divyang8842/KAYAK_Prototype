import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { WidthProvider, Responsive } from 'react-grid-layout';
import _ from 'lodash';
import * as chartAPI from './../../../api/Admin/ChartsAPI'
import Chart from './Chart';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
var graphToShow = "" ;
class AddRemoveLayout extends React.PureComponent  {


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
        //console.log("YEAR: "+data.year);
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
    createElement(el) {
        const removeStyle = {
            position: 'absolute',
            right: '2px',
            top: 0,
            cursor: 'pointer'
        };
        const i = el.add ? '+' : el.i;
        return (


            <div key={i} data-grid={el} >
                {/*{el.add ?
                    <span className="add text" onClick={this.onAddItem} title="You can add an item by clicking here, too.">Add +</span>
                    : <span className="text">{i}</span>}*/}
                <span className="remove" style={removeStyle} onClick={()=> this.onRemoveItem(i)}>delete</span>

                {graphToShow=='CAR_COUNT'
                    ? (<Chart chartData={this.state.carCount} chartTitle="Car Count" legendPosition="bottom"/>)
                    : (graphToShow=='CAR_REVENUE'
                        ? (<Chart chartData={this.state.carRevenue} chartTitle="Car Revenue" legendPosition="bottom"/>)
                        : (graphToShow=='FLIGHT_COUNT'
                            ? (<Chart chartData={this.state.flightCount} chartTitle="Flight Count" legendPosition="bottom"/>)
                            : (graphToShow=='FLIGHT_REVENUE'
                                ? (<Chart chartData={this.state.flightRevenue} chartTitle="Flight Revenue" legendPosition="bottom"/>)
                                : (graphToShow=='HOTEL_COUNT'
                                    ? (<Chart chartData={this.state.hotelCount} chartTitle="Hotel Count" legendPosition="bottom"/>)
                                    : (graphToShow=='HOTEL_REVENUE'
                                        ? (<Chart chartData={this.state.hotelRevenue} chartTitle="Hotel Revenue" legendPosition="bottom"/>)
                                        : (graphToShow=='CITY_COUNT'
                                            ? (<Chart chartData={this.state.cityCount} chartTitle="City Count" legendPosition="bottom"/>)
                                            : (graphToShow=='CITY_REVENUE'
                                                ? (<Chart chartData={this.state.cityRevenue} chartTitle="City Revenue" legendPosition="bottom"/>)
                                                : null)))))))}


            </div>
        );
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
        this.getChartData({'year':2017});
    }

    render() {

        return (

            <div class="container">
                <div class="row">
                    <div class="col-xs-3">


                            <div className="col-lg-12 col-md-12 col-sm-12">
                                Year:
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
                        <div className="col-lg-12 col-md-12 col-sm-12">

<table>
    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('CAR_COUNT')}> Top 10 Rental Agencies : Number of cars rented</a></td>
    </tr>
<tr>
    <td> <a href="#" onClick={()=>this.onAddItem('CAR_REVENUE')}> Top 10 Rental Agencies : Revenue </a></td>
</tr>
    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('FLIGHT_COUNT')}> Top 10 Airlines : Number of tickets sold</a></td>
    </tr>

    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('FLIGHT_REVENUE')}> Top 10 Airlines : Revenue </a></td>
    </tr>

    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('HOTEL_COUNT')}> Top 10 Hotels : Number of room rented </a></td>
    </tr>

    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('HOTEL_REVENUE')}> Top 10 Hotels : Revenue </a></td>
    </tr>

    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('CITY_COUNT')}> Top 10 CITY : Number of bookings </a></td>
    </tr>
    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('CITY_REVENUE')}> Top 10 City : Revenue </a></td>
    </tr>
   {/* <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('CAR_COUNT')}> Top 10 Rental Agencies </a></td>
    </tr>
    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('CAR_COUNT')}> Top 10 Rental Agencies </a></td>
    </tr>
    <tr>
        <td> <a href="#" onClick={()=>this.onAddItem('CAR_COUNT')}> Top 10 Rental Agencies </a></td>
    </tr>

*/}
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
