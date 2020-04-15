import { axiosWithAuth } from '../utils/axiosWithAuth'

export const ADD_CLASS = 'ADD_CLASS';
export const SCHEDULE_CLASS = 'SCHEDULE_CLASS';
export const UNSCHEDULE_CLASS = 'UNSCHEDULE_CLASS';
export const EDIT_CLASS = 'EDIT_CLASS';
export const DELETE_CLASS = 'DELETE_CLASS'
//Passes;
export const ADD_PASS = 'ADD_PASS';
export const DELETE_PASS = 'DELETE_PASS';
export const EDIT_PASS = 'EDIT_PASS';

//Categories
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';


//Logout
export const LOGOUT = 'LOGOUT';
export const ADD_STUDIO_CLASS = 'ADD_STUDIO_CLASS';
export const EDIT_STUDIO_CLASS = 'EDIT_STUDIO_CLASS';
export const DELETE_STUDIO_CLASS = 'DELETE_STUDIO_CLASS';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER'

//Fetch Data
export const START_FETCHING = 'START_FETCHING'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const FETCHCAT_SUCCESS = 'FETCHCAT_SUCCESS'
export const FETCHCLASS_SUCCESS = 'FETCHCLASS_SUCCESS'

//Studio classes
export const GET_STUDIOCLASSES_START = 'GET_STUDIOCLASSES_START';
export const GET_STUDIOCLASSES_SUCCESS = 'GET_STUDIOCLASSES_SUCCESS';
export const GET_STUDIOCLASSES_FAILURE = 'GET_STUDIOCLASSES_FAILURE';

export const DELETE_STUDIOCLASS_START = 'DELETE_STUDIOCLASS_START';
export const DELETE_STUDIOCLASS_SUCCESS = 'DELETE_STUDIOCLASS_SUCCESS';
export const DELETE_STUDIOCLASS_FAILURE = 'DELETE_STUDIOCLASS_FAILURE';

export const ADD_STUDIOCLASS_START = 'ADD_STUDIOCLASS_START';
export const ADD_STUDIOCLASS_SUCCESS = 'ADD_STUDIOCLASS_SUCCESS';
export const ADD_STUDIOCLASS_FAILURE = 'ADD_STUDIOCLASS_FAILURE';

export const EDIT_STUDIOCLASS_START = 'EDIT_STUDIOCLASS_START';
export const EDIT_STUDIOCLASS_SUCCESS = 'EDIT_STUDIOCLASS_SUCCESS';
export const EDIT_STUDIOCLASS_FAILURE = 'EDIT_STUDIOCLASS_FAILURE';

export const addClass = newClass => {
    return { type: ADD_CLASS, payload: newClass }
}

export const scheduleClass = scheduleClass => {
    return { type: SCHEDULE_CLASS, payload: scheduleClass }
}
export const unscheduleClass = unscheduleClass => {
    return { type: UNSCHEDULE_CLASS, payload: unscheduleClass }
}
export const deleteClass = id => {
    return { type: DELETE_CLASS, payload: id }
}
export const addPass = newPass => {
    return { type: ADD_PASS, payload: newPass }
}
export const deletePass = id => {
    return { type: DELETE_PASS, payload: id }
}

export const editPass = id => {
    return { type: EDIT_PASS, payload: id }
}
export const addCategory = id => dispatch => {
    //id = the id of the rental item you want to rent
    // renter_id = who is renting the item
    axiosWithAuth()
        .post(`https://lambda-anywhere-fitness.herokuapp.com/api/category`, id)
        .then(res => dispatch({ type: ADD_CATEGORY, payload: id }) & console.log(res, "addCategory"))
        .catch(res => dispatch({ type: ADD_CATEGORY, payload: id }))
}
export const fetchCategory = () => dispatch => {
    dispatch({ type: START_FETCHING });
    axiosWithAuth()
        .get(
            "category"
        )
        .then(res => {
            console.log(res, "Category get");
            dispatch({ type: FETCHCAT_SUCCESS, payload: res.data })
        })
        .catch(err => dispatch({ type: FETCH_FAILURE, payload: err.response }));
}
export const fetchClasses = () => dispatch => {
    dispatch({ type: START_FETCHING });
    axiosWithAuth()
        .get(
            "classes"
        )
        .then(res => {
            console.log(res, "CLASS get");
            dispatch({ type: FETCHCLASS_SUCCESS, payload: res.data })
        })
        .catch(err => dispatch({ type: FETCH_FAILURE, payload: err.response }));
}
export const deleteCategory = id => dispatch => {
    axiosWithAuth()
        .delete(`category/${id.id}`)
        .then(res => dispatch({ type: DELETE_CATEGORY, payload: id }))
        .catch(err => console.log(err))
}

export const editCategory = id => dispatch => {
    axiosWithAuth()
        .put(`category/${id.id}`, id)
        .then(res => dispatch({ type: EDIT_CATEGORY, payload: id }))
        .catch(err => console.log(err));

}


export const editClass = editClass => {
    return { type: EDIT_CLASS, payload: editClass }
}

export const logOut = () => {
    return { type: LOGOUT }
}

export const getStudioClasses = () => dispatch => {
    dispatch({ type: GET_STUDIOCLASSES_START });
    axiosWithAuth()
        .get(`classes`)
        .then(res => {
            // (console.log(`getStudioClasses:`, res))
            dispatch({ type: GET_STUDIOCLASSES_SUCCESS, payload: res.data })
        })
        .catch(err => {
            // (console.log(err))
            dispatch({ type: GET_STUDIOCLASSES_FAILURE, payload: err.response })
        });
}

export const addStudioClass = newStudioClass => dispatch => {
    dispatch({ type: ADD_STUDIOCLASS_START })
    axiosWithAuth()
        .post('classes', newStudioClass)
        .then(res => {
            dispatch({ type: ADD_STUDIOCLASS_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: ADD_STUDIOCLASS_FAILURE, payload: err.response })
        })
}

export const deleteStudioClass = id => dispatch => {
    dispatch({ type: DELETE_STUDIOCLASS_START });
    axiosWithAuth()
        .delete(`classes/${id}`)
        .then(res => {
            // console.log(`Delete studioClasses:`, res)
            dispatch({ type: DELETE_STUDIOCLASS_SUCCESS, payload: id })
        })
        .catch(err => {
            dispatch({ type: DELETE_STUDIOCLASS_FAILURE, payload: err.response })
        });
    // return { type: DELETE_STUDIO_CLASS, payload: id }
};

export const editStudioClass = editStudioClass => dispatch => {
    dispatch({ type: EDIT_STUDIOCLASS_START });
    axiosWithAuth()
        .put(`classes/${editStudioClass.id}`, editStudioClass)
        .then(res => {
            dispatch({ type: EDIT_STUDIOCLASS_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: EDIT_STUDIOCLASS_FAILURE, payload: err.response })
        })
}

export const addUser = user => {
    return { type: ADD_USER, payload: user }
}

export const removeUser = user => {
    return { type: REMOVE_USER }
}
