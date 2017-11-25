import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{


  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right'
  }

  render(){
    return (
      <div className="chart">
        <Bar
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:this.props.chartTitle,
              fontSize:25
            },
            legend:{
              display:false,
              position:this.props.legendPosition
            }
          }}
        />
<br /><br />
        <Line
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:this.props.chartTitle,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
<br /><br />
        <Pie
          data={this.props.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:this.props.chartTitle,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;
