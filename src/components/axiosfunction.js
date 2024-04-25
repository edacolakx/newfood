    import axios from "axios"
import { useSelector } from "react-redux";
export async function getUserInfo(){
        const {genelResponse} = useSelector(state=>state)
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
                const data = response.data;
                const currentUser = data.filter(item => item.email === genelResponse.kullaniciadi);           
                console.log(currentUser)
                console.log("currentUser")
            } catch (error) {
                console.error("hathnca",error);
            }
        };