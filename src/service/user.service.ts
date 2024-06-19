import pool from "../config/connection";
import { UserDto } from "../dto/user.dto";

export class UserService {
  constructor(private readonly poolDatabase = pool) {}

  public async getAllUsers() {
    const sql = "SELECT * FROM users";
    return await this.poolDatabase.query(sql);
  }

  public async getUsersById(id: number) {
    const sql = "SELECT * FROM users WHERE id = $1";
    return await this.poolDatabase.query(sql, [id]);
  }

  public async createUser(user: UserDto) {
    const sql =
      "INSERT INTO users (names, lastnames, gender, email) VALUES ($1, $2, $3, $4) RETURNING *";
    const result = await this.poolDatabase.query(sql, [
      user.names,
      user.lastnames,
      user.gender,
      user.email,
    ]);
    return result;
  }

  public async updateUser(user: UserDto, id: number) {
    const sql =
      "UPDATE users SET names = $1, lastnames = $2, gender = $3, email = $4 WHERE id = $5 RETURNING *";
    const result = await this.poolDatabase.query(sql, [
      user.names,
      user.lastnames,
      user.gender,
      user.email,
      id,
    ]);
    return result;
  }

  public async deleteUser(id: number) {
    const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    return await this.poolDatabase.query(sql, [id]);
  }
}
