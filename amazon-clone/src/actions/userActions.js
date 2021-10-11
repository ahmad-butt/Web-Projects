export const SET_USER = 'SET_USER';

export const setUser = (username, email)=>{
    return {
        type: SET_USER,
        username: username,
        email: email
    }
}