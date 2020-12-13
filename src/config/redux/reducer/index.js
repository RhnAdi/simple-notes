const initState = {
    nama : "Raihan",
    isLoading : false,
    isLogin : false,
    user : {},
    notes : [],
}

const reducer = (state=initState, action) => {
    switch(action.type){
        case "SET_NAMA":
            return {
                ...state,
                nama : action.nama
            }
        case "CHANGE_LOADING":
            return {
                ...state,
                isLoading : action.value
            }
        case "CHANGE_LOGIN":
            return {
                ...state,
                isLogin : action.value,
            }
        case "CHANGE_USER":
            return {
                ...state,
                user : action.value,
            }
        case "CHANGE_NOTES":
            return {
                ...state,
                notes : action.value,
            }
        default : 
            return state;
    }
}

export default reducer;