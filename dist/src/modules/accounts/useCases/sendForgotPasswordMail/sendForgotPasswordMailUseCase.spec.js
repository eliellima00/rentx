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
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const MailProviderInMemory_1 = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
const AppError_1 = require("@shared/errors/AppError");
const sendForgotPasswordMailUseCase_1 = require("./sendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new sendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    });
    it("should be able to send a forgot mail to user", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = spyOn(mailProvider, "sendMail");
        yield usersRepositoryInMemory.create({
            driver_licence: "2345678",
            email: "teste@mailprovider.pr",
            name: "Blane Curry",
            password: "12345",
        });
        yield sendForgotPasswordMailUseCase.execute("teste@mailprovider.pr");
        expect(sendMail).toHaveBeenCalled();
    }));
    it("should not be able to send an email if user does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute("teste@gmail.com")).rejects.toEqual(new AppError_1.AppError("User does not exists!"));
    }));
    it("should be able to create an users tokens", () => __awaiter(void 0, void 0, void 0, function* () {
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
        yield usersRepositoryInMemory.create({
            driver_licence: "2356678",
            email: "teste2@mailprovider.pr",
            name: "Blane Country",
            password: "1234567",
        });
        yield sendForgotPasswordMailUseCase.execute("teste2@mailprovider.pr");
        expect(generateTokenMail).toBeCalled();
    }));
});
