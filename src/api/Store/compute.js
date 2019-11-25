import { prisma } from "../../../generated/prisma-client";

export default {
  Store: {
    storeCategory: ({ id }) => prisma.store({ id }).storeCategory(),
    menuCategoryList: ({ id }) => prisma.store({ id }).menuCategoryList(),
    chatRoomList: ({ id }) => prisma.store({ id }).chatRoomList()
  },
  StoreOrder: {
    store: ({ id }) => prisma.storeOrder({ id }).store(),
    menuList: ({ id }) => prisma.storeOrder({ id }).menuList(),
    chatRoom: ({ id }) => prisma.storeOrder({ id }).chatRoom()
  }
}