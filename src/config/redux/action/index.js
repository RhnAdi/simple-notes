import Firebase, {database} from "./../../../config/Firebase";

export const signUpUser = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type : "CHANGE_LOADING", value : true})
        Firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((user) => {
            console.log("response auth firebase ==>",user);
            const userData = {
                email : user.user.email,
                uid : user.user.uid,
                emailVerified : user.user.emailVerified,
            }
            dispatch({type : "CHANGE_LOADING", value : false})
            dispatch({type : "CHANGE_LOGIN", value : true})
            dispatch({type : "CHANGE_USER", value : userData})
            resolve(userData)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({type : "CHANGE_LOADING", value : false})
            dispatch({type : "CHANGE_LOGIN", value : false})
            reject({errorCode, errorMessage});
        })
    })
}

export const signInUser = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type : "CHANGE_LOADING", value : true})
        Firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then((user) => {
            const userData = {
                email : user.user.email,
                uid : user.user.uid,
                emailVerified : user.user.emailVerified,
                refreshToken : user.user.refreshToken,
            }
            console.log(userData)
            dispatch({type : "CHANGE_LOADING", value : false})
            dispatch({type : "CHANGE_LOGIN", value : true})
            dispatch({type : "CHANGE_USER", value : userData})
            resolve(userData)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({type : "CHANGE_LOADING", value : false})
            dispatch({type : "CHANGE_LOGIN", value : false})
            reject({errorCode, errorMessage});
        })
    })
}

export const addNotesToAPI = (data) => (dispatch) => {
    if(data.userId === undefined){
        return false;
    }
    if(data.title === "") {
        return false;
    }
    if(data.description === "") {
        return false;
    }
    database.ref('notes/' + data.userId).push({
        title : data.title,
        description : data.description,
        date : data.date,
    })
}

export const getAllNotes = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const ref = database.ref("notes/" + id);
        ref.on("value", (snapshot)=>{
            if(snapshot.val() === undefined || snapshot.val() === null){
                dispatch({type : "CHANGE_NOTES", value : []})
                resolve([]);
            } else {
                dispatch({type : "CHANGE_NOTES", value : Object.entries(snapshot.val()).reverse()});
                resolve(Object.entries(snapshot.val()).reverse());
            }
        })
    })
}

export const editNoteToAPI = (data) => (dispatch) => {
    const { title, description, date, userId, noteId } = data;
    if(userId === "") {
        return false;
    }
    if(title === "") {
        return false;
    }
    if(description === "") {
        return false;
    }
    if(noteId === "") {
        return false;
    }
    const ref = database.ref(`notes/${userId}/${noteId}`);
    ref.set({
        title : title,
        description : description,
        date : date,
    })
}

export const deleteNoteToAPI = (data) => (dispatch) => {
    if(data.noteId === ""){
        return false;
    }
    if(data.userId === undefined){
        return false;
    }
    const {userId, noteId} = data;
    const ref = database.ref(`notes/${userId}/${noteId}`);
    ref.remove();
}