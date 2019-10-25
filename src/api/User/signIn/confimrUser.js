import { prisma } from "../../../../generated/prisma-client";
import {generateToken} from "../../../utils";

export default{
    Mutation:{
        confirmUser:async(_,args,{request})=>{
            const {number, pwd}=args;   //args���� �й��� ��й�ȣ ������
            const user = await prisma.user({number});   //prisma.user�Լ��� �й��� ���ڷ� �Է��ؼ� ����� ��������
            if(user.pwd===pwd){ //���� user.pwd�� pwd�� ���ٸ� jwt ��ū ����
                //JWT ��ū ����
                const token = generateToken(user.id);   //jwt�� id�� ��ȣȭ�ؼ� ��ū�� �������
                return token;  
            } else{
                throw Error("Wrong number or pwd")
            }
        }
    }
}