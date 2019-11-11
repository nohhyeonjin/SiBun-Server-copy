import { prisma } from "../../../../generated/prisma-client";
import {generateToken} from "../../../utils";

export default{
    Mutation:{
        signIn:async(_,args,{request})=>{
            const { number, score=1}=args;   //args���� �й��� ��й��? ������
            const isExistUser = await prisma.$exists.user({number});
            if(isExistUser==true){  //�̹� ���ԵǾ�������
                const user = await prisma.user({number});   //prisma.user�Լ��� �й��� ���ڷ� �Է��ؼ� �����? ��������
                const token = generateToken(user.id);   //jwt�� id�� ��ȣȭ�ؼ� ��ū�� �������?
                return token;    
            }else{  //���ԵǾ� ���� ������
                const user = await prisma.createUser({
                    number,
                    score
                });
                const token = generateToken(user.id);
                return token;
            }
        }
    }
}