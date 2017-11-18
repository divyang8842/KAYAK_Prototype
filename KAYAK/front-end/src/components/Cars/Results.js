import {connect} from 'react-redux';
import React, {Component} from 'react';

class Results extends Component {

    state ={
        airlines :['airindia','airasia','luftansa','jetblue','emirates'],
        checkbox_airindia:1,
        checkbox_airasia:1,
        checkbox_emirates:1,
        checkbox_jetblue:1,
        checkbox_luftansa:1,
        array_for_sorting:this.props.cars,
        array_for_sorting_result:this.props.cars,
        flag:0,
        check_boxes:[],
        price_filter:0,
        duration_filter:0
    };

    temp()
    {

        return this.state.array_for_sorting_result.map((cars,index) => {


            return (
                <tr>
                    <h3>
                        {cars.cars.car_model}
                    </h3>
                    <br/>

                    {cars.cars.car_type}

                    {cars.cars.car_class}

                    {cars.cars.car_city}

                    {cars.cars.passengers}

                    {cars.cars.doors}

                </tr>
            )

        })
    }

    render() {
        return(
            <div className="container-fluid">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>

                <div className="col-sm-2 col-lg-2 col-md-2 col-xs-2" >


                    <h3>Air Lines</h3>
                    <form>
                        <div>
                            <input type="checkbox"
                                   id="airindia"
                                   name="airindia"
                                   value="airindia"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_airindia === 1){
                                           var temp = this.state.airlines;
                                           var index = temp.indexOf(event.target.value);
                                           temp.splice(index,1);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));
                                           // temp ********

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_airindia:0
                                           });
                                           this.temp();

                                       }
                                       else
                                       {
                                           var temp = this.state.airlines;
                                           temp.push(event.target.value);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_airindia: 1
                                           });
                                           this.temp();
                                       }
                                   }}

                            />
                            <label for="airindia">Air India</label>
                        </div>
                        <div>
                            <input type="checkbox"
                                   id="airasia"
                                   name="airasia"
                                   value="airasia"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_airasia === 1){
                                           var temp = this.state.airlines;
                                           var index = temp.indexOf(event.target.value);
                                           temp.splice(index,1);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));
                                           // temp ********

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_airasia:0
                                           });
                                           this.temp();

                                       }
                                       else
                                       {
                                           var temp = this.state.airlines;
                                           temp.push(event.target.value);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_airasia: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="airasia">Air Asia</label>

                        </div>
                        <div>
                            <input type="checkbox"
                                   id="emirates"
                                   name="emirates"
                                   value="emirates"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_emirates === 1){
                                           var temp = this.state.airlines;
                                           var index = temp.indexOf(event.target.value);
                                           temp.splice(index,1);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));
                                           // temp ********

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_emirates:0
                                           });
                                           this.temp();

                                       }
                                       else
                                       {
                                           var temp = this.state.airlines;
                                           temp.push(event.target.value);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_emirates: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="emirates">Emirates</label>

                        </div>
                        <div>

                            <input type="checkbox"
                                   id="jetblue"
                                   name="jetblue"
                                   value="jetblue"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_jetblue === 1){
                                           var temp = this.state.airlines;
                                           var index = temp.indexOf(event.target.value);
                                           temp.splice(index,1);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));
                                           // temp ********

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_jetblue:0
                                           });
                                           this.temp();

                                       }
                                       else
                                       {
                                           var temp = this.state.airlines;
                                           temp.push(event.target.value);
                                           console.log(temp);
                                           // this.setState(Object.assign({},this.state,{airlines:temp}),this.flights(null,null));

                                           this.setState({
                                               airlines: temp
                                           },this.flights(null,null));

                                           this.setState({
                                               checkbox_jetblue: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="jetblue">Jet Blue</label>
                        </div>

                    </form>

                    <h3>Price</h3>
                    <input type="text"
                           className="form-control"
                           id="from-place"
                           placeholder="Price"
                           value={this.state.price_filter}
                           onChange={(event) => {
                               this.setState({
                                   price_filter: event.target.value
                               },this.flights(null,null));
                           }

                           }
                    />

                    <h3>Duration</h3>
                    <input type="text"
                           className="form-control"
                           id="from-place"
                           placeholder="Price"
                           value={this.state.duration_filter}
                           onChange={(event) => {
                               this.setState({
                                   duration_filter: event.target.value
                               },this.flights(null,null));}
                           }
                    />


                </div>
                <div className="col-sm-10 col-lg-10 col-md-10 col-xs-10" >
                    <div className="row">
                        <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                            <button className="btn btn-primary btn-block"
                                    onClick={() => this.flights(true,null)}
                            >
                                PRICE
                            </button>
                        </div>
                        <div className="col-sm-6 col-lg-6 col-md-6 col-xs-6" >
                            <button className="btn btn-primary btn-block"
                                    onClick={() => this.flights(null,true)}>
                                DURATION
                            </button>
                        </div>
                    </div>
                    <div className="row">

                        <table >

                            <tbody>

                            {/*{this.flights(null,null)}*/}

                            {this.temp()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );


    };
}

function mapStateToProps(state) {
        const cars = Object.keys(state.getcars).map((items) => (
            {
                'cars' : state.getcars[items]


            }
        ));

        return {cars};
    }

export default connect(mapStateToProps, null)(Results);

