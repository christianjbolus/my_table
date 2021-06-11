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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = 'https://api.airtable.com/v0/app21I9aDDq7taz3k/users';
const apiKey = process.env.AIRTABLE_API_KEY;
const config = {
    headers: {
        Authorization: `Bearer ${apiKey}`,
    },
};
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(BASE_URL, config);
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getAllUsers = getAllUsers;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.post(BASE_URL, { fields: user }, config);
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createUser = createUser;
