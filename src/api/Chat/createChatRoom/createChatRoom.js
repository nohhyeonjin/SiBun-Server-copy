import { prisma } from "../../../../generated/prisma-client";
import {generateToken} from "../../../utils";


export default{
    Mutation:{
        createChatRoom:async(_,args,{request})=>{
            const {boss,memberList ,store, location, orderExpectedTime, state}=args;
            const isExistUser = await prisma.$exists.user({boss});
            const isExistStore = await prisma.$exists.store({store}); 

            console.log("여가 문제가?");
            //if(isExistUser==true&&isExistStore==true){
                console.log("여기가 문제니?");
                await prisma.createChatRoom({ 
                    boss: boss,
                    memberList: memberList,
                    store: store,
                    location: location,
                    orderExpectedTime: orderExpectedTime,
                    state: state
                });
                return "채팅방이 생성되었습다^^ ";
                
            // }
            // else{
            //     return "채팅방 생성을 실패하였습니다..ㅠㅠ ";
            // }
           
        }
    }
}

