import jwt from "jsonwebtoken";

//토큰생성
//sign함수 실행할 때 payload로 사용자의 id입력함
export const generateToken= id =>jwt.sign({ id }, process.env.JWT_SECRET);
