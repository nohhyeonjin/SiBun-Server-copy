import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions={  //jwt option 설정
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),   //Authorization 헤더에서 jwt를 찾는 역할을 함
    secretOrKey : process.env.JWT_SECRET//토큰을 암호화하기 위한 문자열 -> 누군가 비밀값을 알게 되면 토큰을 모두 해독 할 수 있음
};

const verifyUser=async(payload, done) =>{    //done은 사용자를 찾았을 때 호출해야 하는 함수
    try{
        const user = await prisma.user({id:payload.id});//사용자를 찾음
        if(user!==null){
            return done(null,user); //user를 찾으면 user를 리턴해주고
        }else{
            return done(null, false);   //user를 못찾으면 false를 리턴해줌
        }
    }catch{
        done(error,false);
    }
}

passport.use(new Strategy(jwtOptions, verifyUser))//옵션이 잘 맞게 적용되었을 때 JwtStrategy함수가 토큰 해석함 -> 해석한 정보를 verifyUser의 payload로 전달해줌

//헤더의 값으로 BEARER 이후에 토큰이 입력됨
{Authorization: 'Bearer TOKEN'}