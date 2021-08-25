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
exports.isUsernameTaken = void 0;
const api_1 = require("../services/api");
function isUsernameTaken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.body;
        const { records: entries } = yield api_1.getAllUsers();
        const taken = entries.some((entry) => entry.fields.username === username);
        if (taken)
            return res.status(409).send('Username taken');
        next();
    });
}
exports.isUsernameTaken = isUsernameTaken;
