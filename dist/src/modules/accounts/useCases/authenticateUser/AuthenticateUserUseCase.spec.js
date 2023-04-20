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
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
const AuthenticateUserUseCase_1 = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase");
const CreateUserUseCase_1 = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const AppError_1 = require("@shared/errors/AppError");
let authenticateUserUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let createUserUseCase;
let dateProvider;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
    });
    it("Should be able to authenticate an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_licence: "000123",
            email: "user@test.com",
            password: "1234",
            name: "User Test",
        };
        yield createUserUseCase.execute(user);
        const result = yield authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    }));
    it("should not be able to authenticate an nonexistent user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUserUseCase.execute({
            email: "nonexistent@test.com",
            password: "1234",
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect!"));
    }));
    it("should not be able to authenticate with incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_licence: "9999",
            email: "user@user.com",
            password: "1234",
            name: "User Test Error",
        };
        yield createUserUseCase.execute(user);
        expect(authenticateUserUseCase.execute({
            email: user.email,
            password: "incorrectPassword",
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect!"));
    }));
});
