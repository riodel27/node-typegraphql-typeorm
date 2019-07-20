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
const mongodb_1 = require("mongodb");
let Menu = class Menu {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", mongodb_1.ObjectId)
], Menu.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Menu.prototype, "name", void 0);
Menu = __decorate([
    type_graphql_1.ObjectType()
], Menu);
exports.Menu = Menu;
let MenuResolver = class MenuResolver {
    constructor() {
        this.data = [
            {
                _id: new mongodb_1.ObjectId("5c51bbef70ceca0001fd928f"),
                name: 'test'
            }
        ];
    }
    menus() {
        return this.data;
    }
};
__decorate([
    type_graphql_1.Query(returns => [Menu]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], MenuResolver.prototype, "menus", null);
MenuResolver = __decorate([
    type_graphql_1.Resolver()
], MenuResolver);
exports.MenuResolver = MenuResolver;
//# sourceMappingURL=Menu.js.map