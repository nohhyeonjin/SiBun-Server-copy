"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "MenuCategory",
    embedded: false
  },
  {
    name: "StoreCategory",
    embedded: false
  },
  {
    name: "Store",
    embedded: false
  },
  {
    name: "Menu",
    embedded: false
  },
  {
    name: "ChatRoom",
    embedded: false
  },
  {
    name: "RoomOrder",
    embedded: false
  },
  {
    name: "IndividualOrder",
    embedded: false
  },
  {
    name: "ChatContent",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/noh-hyeon-jin-54dd46/SiBun/dev`
});
exports.prisma = new exports.Prisma();
