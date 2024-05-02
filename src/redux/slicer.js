const INITIAL_STATE={
    email:"",urun:[],stat:"",modal:false,miktar:1
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
        case "SET_MIKTAR":
                return {...state,miktar:action.payload}
        default:
           return state
    }
}

export default genelResponseReducer