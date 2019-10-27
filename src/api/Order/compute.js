import { prisma } from "../../../generated/prisma-client";

export default {
  RoomOrder: {
    chatRoom: ({ id }) => prisma.roomOrder({ id }).chatRoom(),
    individualOrderList: ({ id }) => prisma.roomOrder({ id }).individualOrderList()
  },
  IndividualOrder: {
    user: ({ id }) => prisma.individualOrder({ id }).user(),
    menuList: ({ id }) => prisma.individualOrder({ id }).menuList(),
    roomOrder: ({ id }) => prisma.individualOrder({ id }).roomOrder()
  }
}