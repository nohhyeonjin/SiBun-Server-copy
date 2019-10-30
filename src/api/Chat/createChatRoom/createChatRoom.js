import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import Axios from "axios";

export default{
    Mutation:{
        createChatRoom:async(_,args,{request})=>{
            isAuthenticated(request);
            const { storeName, location, time } = args;
            const { user } = request;
            const store = await prisma.store({name:storeName});

            var latitude = "latitude test";
            var longtitude = "longtitude test";

            //const address = '22 Main st Boston MA';
            await Axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                params:{
                    address : location,
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
            
            const chatRoom = await prisma.createChatRoom({
                boss : { connect : { id : user.id }},
                memberList : { connect : { id : user.id }},
                store : { connect : { id : store.id }},
                location : location,
                latitude : latitude,
                longtitude : longtitude,               
                orderExpectedTime : time,   //timeÇü½Ä ex) "2019-10-27T16:34:10"
                state : false
            });

            const RoomOrder = await prisma.createRoomOrder({
                chatRoom: {connect : {id : chatRoom.id}},
                state: false
            });

            return chatRoom;
        }
    }
}