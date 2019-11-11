import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    getStoreCategoryChatRoomList:async(_, args) => {
        const { storeCategoryName } = args;
        const storeList = await prisma.stores({where : {storeCategory : {name : storeCategoryName}}});
        var chatRoomList = new Array();
        var count = 0;
        for(var i = 0; i < storeList.length; i++){
            const chatList = await prisma.chatRooms({where : {store : {id : storeList[i].id}}});
            for(var j = 0; j < chatList.length; j++){
                chatRoomList[count] = chatList[j];
                count+=1; 
            }
           }
        return chatRoomList;
    }
  }
}