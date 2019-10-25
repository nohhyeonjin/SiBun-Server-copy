import { prisma } from "../../../../generated/prisma-client";
import {generateToken} from "../../../utils";

export default{
    Mutation:{
        confirmUser:async(_,args,{request})=>{
            const {number, pwd}=args;   //args에서 학번과 비밀번호 가져옴
            const user = await prisma.user({number});   //prisma.user함수에 학번을 인자로 입력해서 사용자 가져오기
            if(user.pwd===pwd){ //만약 user.pwd가 pwd와 같다면 jwt 토큰 리턴
                //JWT 토큰 생성
                const token = generateToken(user.id);   //jwt가 id를 암호화해서 토큰을 만들어줌
                return token;  
            } else{
                throw Error("Wrong number or pwd")
            }
        }
    }
}