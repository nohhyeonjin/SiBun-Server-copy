import { prisma } from "../../../../generated/prisma-client";


  export default{
    Query: {
        chatContents: () => prisma.chatContents() // s붙여야지 배열 반환
    }
}