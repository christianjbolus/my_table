"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
const api_1 = require("../services/api");
const findUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const { records: entries } = yield api_1.getAllUsers();
    const foundUser = entries.find((entry) => entry.fields.username === username);
    if (foundUser) {
        return foundUser;
    }
    else {
        throw new Error('Username or password is incorrect');
    }
});
exports.findUser = findUser;
