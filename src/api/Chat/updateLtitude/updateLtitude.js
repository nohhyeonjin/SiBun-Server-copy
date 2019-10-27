import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import Axios from "axios";

export default{
    Mutation:{
        updateLtitude:async(_,args,{request})=>{
            const { chatRoomId, address } = args;
            var latitude = "latitude test";
            var longtitude = "longtitude test";

            //const address = '22 Main st Boston MA';
            await Axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                params:{
                    address : address,
                    key: process.env.GEOCODING_API_KEY
                }
            })
            .then(function(response){
                latitude = String(response.data.results[0].geometry.location.lat);
                longtitude = String(response.data.results[0].geometry.location.lng);    
            })
            .catch(function(error){
                console.log(error);
            })           

            const chatRoom = await prisma.updateChatRoom({
                data:{
                    latitude: latitude,
                    longtitude: longtitude
                },
                where : { id : chatRoomId }
            });
            return chatRoom;
        }
    }
}