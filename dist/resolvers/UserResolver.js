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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongodb_1 = require("mongodb");
const R = __importStar(require("ramda"));
const type_graphql_1 = require("type-graphql");
const User_1 = __importDefault(require("../schemas/User"));
const validators_1 = require("../util/validators");
const UserRepository_1 = require("../repository/UserRepository");
const UserInput_1 = require("../inputs/UserInput");
let UserResolver = class UserResolver {
    async user(id) {
        const user = await UserRepository_1.UserRepository().findOne(id);
        return user;
    }
    async users() {
        const allusers = await UserRepository_1.UserRepository().find();
        return allusers;
    }
    async createUser(newUserData) {
        /**validation*/
        const { errors, valid } = validators_1.validateAddUser(newUserData);
        if (R.not(valid)) {
            throw new apollo_server_1.UserInputError('Errors', { errors });
        }
        const newUser = await UserRepository_1.UserRepository().insertOne(newUserData);
        return newUser.ops[0];
    }
    async updateUser(updateUserInputData) {
        const { id, patch, updatedAt } = updateUserInputData;
        console.log('updatedAt: ', updatedAt);
        const updatedUser = await UserRepository_1.UserRepository().findOneAndUpdate({ _id: id }, { $set: Object.assign({}, patch, { updatedAt }) }, { returnOriginal: false });
        return updatedUser.value;
    }
    async deleteUser(id) {
        const deletedUser = await UserRepository_1.UserRepository().deleteOne({ _id: id });
        console.log('deleted user: ', deletedUser.deletedCount);
        return `user with id:${id} has been successfully deleted!`;
    }
};
__decorate([
    type_graphql_1.Query(returns => User_1.default, { description: 'Get a User', nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(returns => [User_1.default], { description: 'list of users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(returns => User_1.default, { description: "create User" }),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.AddUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(returns => User_1.default, { description: "Update User", nullable: true }),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.Mutation(returns => String, { description: "Delete User", nullable: true }),
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