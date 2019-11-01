import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport"

//��ū����
//sign�Լ� ������ �� payload�� ������� id�Է���
export const generateToken= id =>jwt.sign({ id }, process.env.JWT_SECRET);

const sendMail = email => {
    const options = {
        auth:{
            api_user : process.env.SENDGRID_USERNAME,
            api_key : process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
}
export const sendHardshipMail = (fromUserId, toUserId, content) => {
    const email = {
        from : "SiBun-server@hardship.com",
        to : "hyyyun20@naver.com",
        subject : "SiBun Hardship",
        html : `from : ${fromUserId} <br\>to : ${toUserId} <br\>content : ${content}`
    };
    return sendMail(email);
}