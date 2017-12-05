import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right'
  }

state={len:'',data:[],title:'',viewCharts:[],data:this.props.chartData};

componentWillMount(){

}

  render(){
    {console.log("VALUES:"+this.props.chartLabels)}
    return (
      <div className="chart">

<div className="row">

<Line data={this.props.chartData}
  options={{
    title:{
      display:this.props.displayTitle, text:this.props.chartTitle, fontSize:25},
    legend:{
      display:this.props.displayLegend, position:this.props.legendPosition}}}/>

</div>

      </div>
    )
  }
}

export default Chart;
