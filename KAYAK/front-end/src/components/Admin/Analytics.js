import React, {Component} from 'react';
import { Route, Link,Switch } from 'react-router-dom';
import Chart from './Chart';

class Analytics extends Component {

  state = {
    chartDataCars:{},
    chartDataFlights:{},
    chartDataHotels:{},
    chartDataMost:{},
    chartDataLeast:{},
    visible1:false,
    visible2:false,
    visible3:false,
    visible4:false,
    visible5:false
  };

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    // API calls here
    this.setState({
      chartDataCars:{
        labels: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6','a7','a8','a9','a10'],
        datasets:[{ label:'Cars',
                    data:[417,181,153,106,105,398,272,200,300,267],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
      chartDataFlights:{
        labels: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6','f7','f8','f9','f10'],
        datasets:[{ label:'Flights',
                    data:[617,815,1130,1065,1051,950,666,777,888,999],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
      chartDataHotels:{
        labels: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6','h7','h8','h9','h10'],
        datasets:[{ label:'Hotels',
                    data:[417,181,153,106,105,398,272,200,300,267],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(125, 99, 112, 0.6)','rgba(0, 0, 250, 0.6)',
                      'rgba(100, 99, 92, 0.6)','rgba(200, 150, 150, 0.6)']}]},
      chartDataMost:{
        labels: ['flights', 'hotels','cars'],
        datasets:[{ label:'Modules',
                    data:[217,181,300],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 159, 64, 0.6)']}]},
      chartDataLeast:{
        labels: ['admin', 'analytics'],
        datasets:[{ label:'Modules',
                    data:[47,11],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)']}]},
    });
  }


  showDiv(n) {
    if(n===1){
      this.setState({visible1: true,visible2: false,visible3: false,visible4: false,visible5: false});
    }
    else if(n===2){
      this.setState({visible2: true,visible1:false,visible3: false,visible4: false,visible5: false});
    }
    else if(n===3){
      this.setState({visible3: true,visible1:false,visible2: false,visible4: false,visible5: false});
    }
    else if(n===4){
      this.setState({visible4: true,visible1:false,visible2: false,visible3: false,visible5: false});
    }
    else if(n===5){
      this.setState({visible5: true,visible1:false,visible2: false,visible3: false,visible4: false});
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
        <div className="col-xxs-1 col-xs-1 mt"></div>
        <div className="col-xxs-3 col-xs-3 mt">
        <button type="button" className="btn btn-primary" value="Top 10 car agency" onClick={() => this.showDiv(1)}>Top 10 car agency</button>
        </div>
        <div className="col-xxs-3 col-xs-3 mt">
        <button type="button" className="btn btn-primary" value="Top 10 flights" onClick={() => this.showDiv(2)}>Top 10 flights</button>
        </div>
        <div className="col-xxs-3 col-xs-3 mt">
        <button type="button" className="btn btn-primary" value="Top 10 hotels" onClick={() => this.showDiv(3)}>Top 10 car agency</button>
        </div>
        </div>

        <div className="row">
        <div className="col-xxs-1 col-xs-1 mt"></div>
        <div className="col-xxs-3 col-xs-3 mt">
        <button type="button" className="btn btn-primary" value="Most visited modules" onClick={() => this.showDiv(4)}>Most visited modules</button>
        </div>
        <div className="col-xxs-3 col-xs-3 mt">
        <button type="button" className="btn btn-primary" value="Least visited modules" onClick={() => this.showDiv(5)}>Least visited modules</button>
        </div>
        </div>




      <div>
        {
          this.state.visible1
            ? (<Chart chartData={this.state.chartDataCars} chartTitle="Top 10 cars" legendPosition="bottom"/>)
            : (this.state.visible2
              ? (<Chart chartData={this.state.chartDataFlights} chartTitle="Top 10 flights" legendPosition="bottom"/>)
              : (this.state.visible3
                ? (<Chart chartData={this.state.chartDataHotels} chartTitle="Top 10 hotels" legendPosition="bottom"/>)
                : (this.state.visible4
                  ? (<Chart chartData={this.state.chartDataMost} chartTitle="Most visited modules" legendPosition="bottom"/>)
                  : (this.state.visible5
                    ? (<Chart chartData={this.state.chartDataLeast} chartTitle="Least visited modules" legendPosition="bottom"/>)
                    : null))))
        }
      </div>

</div>
</div>
</div>

        );
    }
}

export default Analytics;
