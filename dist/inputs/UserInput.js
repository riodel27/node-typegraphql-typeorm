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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const graphql_type_json_1 = require("graphql-type-json");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
let AddUserInput = class AddUserInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.MaxLength(10),
    __metadata("design:type", String)
], AddUserInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AddUserInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(type => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    __metadata("design:type", Object)
], AddUserInput.prototype, "random", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date
    /**default value of new date() is a problem. because it doesn't seem to change. seem like it is creating the date when the program is started. */
    )
], AddUserInput.prototype, "createdOn", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], AddUserInput.prototype, "modifiedOn", void 0);
AddUserInput = __decorate([
    type_graphql_1.InputType({ description: "New user input" })
], AddUserInput);
exports.AddUserInput = AddUserInput;
let UpdateUserInput = class UpdateUserInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", mongodb_1.ObjectId)
], UpdateUserInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(type => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Object)
], UpdateUserInput.prototype, "patch", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true, }),
    __metadata("design:type", Date)
], UpdateUserInput.prototype, "updatedAt", void 0);
UpdateUserInput = __decorate([
    type_graphql_1.InputType({ description: "Update user input" })
], UpdateUserInput);
exports.UpdateUserInput = UpdateUserInput;
//# sourceMappingURL=UserInput.js.map