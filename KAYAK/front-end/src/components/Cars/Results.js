import {connect} from 'react-redux';
import React, {Component} from 'react';

class Results extends Component {

    state ={
        airlines :['small','medium','large','SUV','convertible','luxury','van'],
        checkbox_small:1,
        checkbox_medium:1,
        checkbox_large:1,
        checkbox_suv:1,
        checkbox_convertible:1,
        checkbox_luxury:1,
        checkbox_van:1,
        array_for_sorting:this.props.cars,
        array_for_sorting_result:this.props.cars,
        flag:0,
        check_boxes:[],
        price_filter:0,
        duration_filter:0
    };

    flights(price_flag,duration_flag)
    {
        var flight_flag=false;
        var array_used_for_sorting =[];

        console.log("array_for_sorting:"+this.state.array_for_sorting);
        console.log("array_for_sorting_result:"+this.state.array_for_sorting_result);


        this.state.array_for_sorting.map((cars,index) =>{

            // Filter Condition for AIRLINES
            var array =this.state.airlines;

            for (var i=0;i<array.length;i++)
            {
                if(array[i] == cars.cars.car_type)
                {
                    flight_flag= true;

                }
            }

            if (flight_flag){
                flight_flag= false;

                    if(cars.cars.car_rent > this.state.price_filter)
                    {
                        array_used_for_sorting.push(cars.cars);
                        if(price_flag )
                        {
                            array_used_for_sorting.sort(function(a, b) {
                                return parseFloat(a.car_rent) - parseFloat(b.car_rent);
                            });

                        }

                        if(duration_flag)
                        {
                            array_used_for_sorting.sort(function(a, b) {
                                return parseFloat(a.car_distance) - parseFloat(b.car_distance);
                            });


                        }

                    }




            }

        });

        const cars = Object.keys(array_used_for_sorting).map((items) => (
            {
                'cars' : array_used_for_sorting[items]


            }
        ));


        this.setState({
            array_for_sorting_result: cars
        });

        this.setState({
            flag:1
        });
    }

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



                    <h3>Car Type</h3>
                    <form>
                        <div>
                            <input type="checkbox"
                                   id="small"
                                   name="small"
                                   value="small"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_small === 1){
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
                                               checkbox_small:0
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
                                               checkbox_small: 1
                                           });
                                           this.temp();
                                       }
                                   }}

                            />
                            <label for="small">Small</label>
                        </div>
                        <div>
                            <input type="checkbox"
                                   id="medium"
                                   name="medium"
                                   value="medium"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_medium === 1){
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
                                               checkbox_medium:0
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
                                               checkbox_medium: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="medium">Medium </label>

                        </div>
                        <div>
                            <input type="checkbox"
                                   id="large"
                                   name="large"
                                   value="large"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_large === 1){
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
                                               checkbox_large:0
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
                                               checkbox_large: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="large">Large</label>

                        </div>
                        <div>

                            <input type="checkbox"
                                   id="SUV"
                                   name="SUV"
                                   value="SUV"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_suv === 1){
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
                                               checkbox_suv:0
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
                                               checkbox_suv: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="SUV">SUV</label>
                        </div>



                        <div>

                            <input type="checkbox"
                                   id="convertible"
                                   name="convertible"
                                   value="convertible"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_convertible === 1){
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
                                               checkbox_convertible:0
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
                                               checkbox_convertible: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="convertible">Convertible</label>
                        </div>

                        <div>

                            <input type="checkbox"
                                   id="luxury"
                                   name="luxury"
                                   value="luxury"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_luxury === 1){
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
                                               checkbox_luxury:0
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
                                               checkbox_luxury: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="luxury">Luxury</label>
                        </div>

                        <div>

                            <input type="checkbox"
                                   id="van"
                                   name="van"
                                   value="van"
                                   onClick={(event) => {

                                       if ( this.state.checkbox_van === 1){
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
                                               checkbox_van:0
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
                                               checkbox_van: 1
                                           });
                                           this.temp();
                                       }
                                   }}
                            />
                            <label for="van">Van</label>
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

