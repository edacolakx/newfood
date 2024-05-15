const INITIAL_STATE={
    email:"",urun:[],stat:"",modal:false,miktar:1,name:"",surname:""
}
const genelResponseReducer= (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "SET_NAME":
                return {...state,name:action.payload}
        case "SET_URUN":
                return {...state,urun:action.payload}
        case "SET_STATUS":
                return {...state,stat:action.payload}
        case "SET_MODAL":
                return {...state,modal:action.payload}
        case "SET_MIKTAR":
                return {...state,miktar:action.payload}
        case "SET_SURNAME":
                return {...state,surname:action.payload}
        case "SET_EMAIL":
                return {...state,email:action.payload}
        default:
           return state
    }
}

export default genelResponseReducer