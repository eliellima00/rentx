"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");
var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");
let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 100,
      licence_plate: "4BCP1245",
      fine_amount: 40,
      brand: "Car brand",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 100,
      licence_plate: "4BCP854",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 100,
      licence_plate: "4BCP4123",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car_brand_test"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 100,
      licence_plate: "BRAZ4123",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "123456"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456"
    });
    expect(cars).toEqual([car]);
  });
});