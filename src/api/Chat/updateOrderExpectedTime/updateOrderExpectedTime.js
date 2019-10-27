import { prisma } from "../../../../generated/prisma-client";
import {generateToken} from "../../../utils";


// export default{
//     Mutation:{
//         updateOrderExpectTime:async(_,args,{request})=>{
//             const {chatRoomID, changeExpectTime}=args;  
//             const chatRoom = await prisma.chatRoom({chatRoomID});   //prisma.user�Լ��� �й��� ���ڷ� �Է��ؼ� ����� ��������
//             if(user.pwd===pwd){ //���� user.pwd�� pwd�� ���ٸ� jwt ��ū ����
//                 //JWT ��ū ����
//                 const token = generateToken(user.id);   //jwt�� id�� ��ȣȭ�ؼ� ��ū�� �������
//                 return token;  
//             } else{
//                 throw Error("Wrong number or pwd")
//             }
//         }
//     }
// }

// export default{
//     Mutation:{
//         async updateOrderExpectTime(root, { _id, input }) {
//             return await chatRoom.findOneAndUpdate(
//                 { _id }, 
//                 input, 
//                 { new: true }
//              );
//         }
//     }
// }
