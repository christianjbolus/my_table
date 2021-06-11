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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_1 = require("./api");
const PORT = process.env.PORT || 8080;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const hash = yield bcrypt_1.default.hash(password, 12);
        const taken = yield isUserNameTaken(username);
        if (taken)
            throw new Error('Username taken');
        const newUser = yield api_1.createUser({ username, password: hash });
        res.send(newUser.id);
    }
    catch (err) {
        res.send(err.message);
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield findUser(username);
        const isValidPassword = yield bcrypt_1.default.compare(password, user.fields.password);
        if (!isValidPassword)
            throw new Error('Username or password is incorrect');
        res.send(user.id);
    }
    catch (err) {
        res.send(err.message);
    }
}));
app.listen(PORT, () => console.log('Server running'));
function isUserNameTaken(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const { records } = yield api_1.getAllUsers();
        return records.some((record) => record.fields.username === username);
    });
}
function findUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const { records } = yield api_1.getAllUsers();
        const foundUser = records.find((record) => record.fields.username === username);
        if (foundUser) {
            return foundUser;
        }
        else {
            throw new Error('Username or password is incorrect');
        }
    });
}
