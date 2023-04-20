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
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarUseCase_1 = require("./CreateCarUseCase");
let createCarUseCase;
let carsRepositoryInMemory;
describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase_1.CreateCarUseCase(carsRepositoryInMemory);
    });
    it("Should be able to create a new car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
        expect(car).toHaveProperty("id");
    }));
    it("should not be able to create a car with existent licence plate", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createCarUseCase.execute({
            name: "Car1",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
        yield expect(createCarUseCase.execute({
            name: "Car2",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        })).rejects.toEqual(new AppError_1.AppError("Car already exists!"));
    }));
    it("should be able to create a car with available true by default", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: "Car available",
            description: "Description Car",
            daily_rate: 100,
            licence_plate: "ABCD-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
        expect(car.available).toBe(true);
    }));
});
