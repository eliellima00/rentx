"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsersToken1679948625840 = void 0;
var _typeorm = require("typeorm");
class CreateUsersToken1679948625840 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "users_tokens",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "refresh_token",
        type: "varchar"
      }, {
        name: "user_id",
        type: "uuid"
      }, {
        name: "expires_date",
        type: "timestamp"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "FKUserToken",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable("users_tokens");
  }
}
exports.CreateUsersToken1679948625840 = CreateUsersToken1679948625840;