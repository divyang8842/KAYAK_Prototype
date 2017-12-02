import {UPDATE_TRACKING} from '../../actions/Analytics/Tracking.js';

const initialstate ={
    path:['SEARCH_PAGE'],
    pagename:'',
    time:Date.now()
};

const tracking=(state=initialstate,action)=>
{
    switch (action.type) {
        case UPDATE_TRACKING :
            state = {
                path: action.data.currentpath,
                pagename:action.data.currentpage,
                time:action.data.timenow
            };
            return state;

        default :
            return state;
    }

}

export default tracking;