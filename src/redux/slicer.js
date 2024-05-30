const INITIAL_STATE={
    email:"",urun:[],stat:"",modal:false,miktar:1,name:"",surname:"",sepetmiktar:0,adresforres:"",sifre:"",id:0,telefon:""
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
        case "SET_SEPETMIKTAR":
                return {...state,sepetmiktar:action.payload}
        case "SET_ADRESFORRESREG":
                return {...state,adresforres:action.payload}
        case "SET_SIFRE":
                return {...state,sifre:action.payload}
        case "SET_ID":
                return {...state,id:action.payload}
        case "SET_TELEFON":
                return {...state,telefon:action.payload}
        default:
           return state
    }
}

export default genelResponseReducer