"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;
var _typeorm = require("typeorm");
var _Car = require("../entities/Car");
class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    licence_plate,
    name,
    specifications,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      licence_plate,
      name,
      specifications
    });
    await this.repository.save(car);
    return car;
  }
  async findByLicencePlate(licence_plate) {
    const car = await this.repository.findOne({
      licence_plate
    });
    return car;
  }
  async findAvailable(brand, category_id, name) {
    const carsQuery = await this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });
    if (brand) {
      carsQuery.andWhere("c.brand = :brand", {
        brand
      });
    }
    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id
      });
    }
    if (name) {
      carsQuery.andWhere("c.name = :name", {
        name
      });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }
  async findById(id) {
    const car = await this.repository.findOne(id);
    return car;
  }
  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }
}
exports.CarsRepository = CarsRepository;