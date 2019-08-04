"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../schemas/User"));
exports.UserRepository = () => {
    const userRepositoryTest = typeorm_1.getMongoRepository(User_1.default);
    return userRepositoryTest;
};
//# sourceMappingURL=UserRepository.js.map