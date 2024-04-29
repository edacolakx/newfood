const INITIAL_STATE={
    email:"",urun:[],stat:"",modal:false
}
const genelResponseReducer= (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "SET_NAME":
                return {...state,email:action.payload}
        case "SET_URUN":
                return {...state,urun:action.payload}
        case "SET_STATUS":
                return {...state,stat:action.payload}
        case "SET_MODAL":
                return {...state,modal:action.payload}
        default:
           return state
    }
}

export default genelResponseReducer