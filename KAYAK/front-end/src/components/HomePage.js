import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import  LandingPage from './LandingPage'



class HomePage extends Component {



    render() {
        return (
            <div>

                <Route exact path="/" render={() => (
                    <div>
                        <LandingPage />
                    </div>
                )}/>


            </div>
        );
    }






}

export default withRouter(HomePage);