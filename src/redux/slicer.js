const INITIAL_STATE={
    email:"",urun:[]
}
const genelResponseReducer= (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "SET_NAME":
                return {...state,email:action.payload}
        case "SET_URUN":
                return {...state,urun:action.payload}
        default:
           return state
    }
}

export default genelResponseReducer