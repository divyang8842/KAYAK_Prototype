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

             {/*   <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12"></div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <Pie data={this.props.chartData}
                             options={{
                                 title:{
                                     display:this.props.displayTitle, text:this.props.chartTitle,fontSize:25},
                                 legend:{display:this.props.displayLegend, position:this.props.legendPosition}
                             }}/>
                    </div>
                </div>*/}

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Bar data={this.props.chartData}
                             options={{
                                 title:{
                                     display:this.props.displayTitle, text:this.props.chartTitle, fontSize:25},
                                 legend:{display:false, position:this.props.legendPosition}}}/>
                    </div>

                    {/*   <div className="col-lg-6 col-md-6 col-sm-12">
                        <Line data={this.props.chartData}
                              options={{
                                  title:{
                                      display:this.props.displayTitle, text:this.props.chartTitle, fontSize:25},
                                  legend:{
                                      display:this.props.displayLegend, position:this.props.legendPosition}}}/>
                    </div>*/}
                </div>

            </div>
        )
    }
}

export default Chart;
