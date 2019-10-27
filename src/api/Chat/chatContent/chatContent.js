import { prisma } from "../../../../generated/prisma-client";


  export default{
    Query: {
        chatContent: () => prisma.chatContent()
    }
}