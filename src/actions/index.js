import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';


export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().posts)
     .map('userId')
     .uniq()
     .forEach(id => dispatch(fetchUser(id)))
     .value();
};

export const fetchPosts = () => {
    return async dispatch => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({
            type: 'FETCH_POSTS',
            payload: shuffle(response.data)
        });
    }
};

export const fetchUser = (userId) => {
    return async dispatch => {
        const response = await jsonPlaceholder.get(`/users/${userId}`);

        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        });
    }
};

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};