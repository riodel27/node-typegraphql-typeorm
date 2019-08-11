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
const type_graphql_1 = require("type-graphql");
const graphql_type_json_1 = require("graphql-type-json");
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let User = class User {
};
__decorate([
    typeorm_1.ObjectIdColumn() /** typeorm */,
    type_graphql_1.Field() /** type-graphql */,
    __metadata("design:type", mongodb_1.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ readonly: true }) /** readonly not working */,
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(type => graphql_type_json_1.GraphQLJSONObject),
    typeorm_1.Column(),
    __metadata("design:type", Object)
], User.prototype, "random", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field({ defaultValue: new Date() }),
    typeorm_1.Column({ default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        nullable: false,
        name: "dt_create"
    }),
    __metadata("design:type", Date)
], User.prototype, "createdOn", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        nullable: false,
        name: "dt_modified"
    }),
    __metadata("design:type", Date)
], User.prototype, "modifiedOn", void 0);
User = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], User);
exports.default = User;
//# sourceMappingURL=User.js.map