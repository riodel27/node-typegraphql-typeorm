"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../schemas/User"));
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let AddUserInput = class AddUserInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddUserInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddUserInput.prototype, "email", void 0);
AddUserInput = __decorate([
    type_graphql_1.InputType({ description: "New user data" })
], AddUserInput);
let UpdateUserInput = class UpdateUserInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "email", void 0);
UpdateUserInput = __decorate([
    type_graphql_1.InputType({ description: "Update user input" })
], UpdateUserInput);
let UserResolver = class UserResolver {
    async users() {
        const userRepository = typeorm_1.getMongoRepository(User_1.default);
        const allusers = await userRepository.find();
        return allusers;
    }
    async addUser(newUserData) {
        const userRepository = typeorm_1.getMongoRepository(User_1.default);
        const newUser = await userRepository.insertOne(newUserData);
        return newUser.ops[0];
    }
    async updateUser(id, updateUserInputData) {
        const userRepository = typeorm_1.getMongoRepository(User_1.default);
        const updatedUser = await userRepository.findOneAndUpdate({ _id: id }, { $set: updateUserInputData }, { returnOriginal: false });
        console.log('updated user: ', updatedUser);
        /** error handling
         *  ? how to handle return value of null. meaning trying to update a non existing user.
        */
        return updatedUser.value;
    }
    async deleteUser(id) {
        const userRepository = typeorm_1.getMongoRepository(User_1.default);
        const deletedUser = await userRepository.deleteOne({ _id: id });
        /**error handling for scenario like trying to delete a non existing user */
        return `user with id:${id} has been successfully deleted!`;
    }
};
__decorate([
    type_graphql_1.Query(returns => [User_1.default], { description: 'list of users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(returns => User_1.default, { description: "Add User" }),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
__decorate([
    type_graphql_1.Mutation(returns => User_1.default, { description: "Update User" }),
    __param(0, type_graphql_1.Arg('id')), __param(1, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongodb_1.ObjectId, UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.Mutation(returns => String, { description: "Delete User" }),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongodb_1.ObjectId]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(of => User_1.default)
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=UserResolver.js.map