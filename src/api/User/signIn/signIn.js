import { prisma } from "../../../../generated/prisma-client";
import {generateToken} from "../../../utils";

export default{
    Mutation:{
        signIn:async(_,args,{request})=>{
            const { number, pwd, score=1, hardshipState = false }=args;   //args���� �й��� ��й��? ������
            const isExistUser = await prisma.$exists.user({number});
            if(isExistUser==true){  //�̹� ���ԵǾ�������
                const user = await prisma.user({number});   //prisma.user�Լ��� �й��� ���ڷ� �Է��ؼ� �����? ��������
                if(user.pwd===pwd){ //���� user.pwd�� pwd�� ���ٸ� jwt ��ū ����
                    //JWT ��ū ����
                    const token = generateToken(user.id);   //jwt�� id�� ��ȣȭ�ؼ� ��ū�� �������?
                    return token;  
                } else{
                    throw Error("Wrong pwd")
                }    
            }else{  //���ԵǾ� ���� ������
                const user = await prisma.createUser({
                    number,
                    pwd,
                    score,
                    hardshipState
                });
                const token = generateToken(user.id);
                return token;
            }
        }
    }
}