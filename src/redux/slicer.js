const INITIAL_STATE={
    kullaniciadi:"",token:"",modal:false
}
const genelResponseReducer= (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "SET_NAME":
                return {...state,kullaniciadi:action.payload}
        case "SET_TOKEN":
                return {...state,token:action.payload}
        case 'SET_MODAL':
            return {...state,modal:action.payload}
        //case "SET_POSTS":
        //        return {...state,posts:action.payload,refreshing:false}
        //case "REFRESH_POSTS":
        //      return {...state,refreshing:true}
        default:
           return state
    }
}

export default genelResponseReducer