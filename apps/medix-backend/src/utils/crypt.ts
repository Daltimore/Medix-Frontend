import bcrypt from "bcrypt";

const saltRounds = 10;

export class Crypt {
  public static hash(plainText: string) {
    return bcrypt.hashSync(plainText, saltRounds);
  }

  public static compare(plainText: string, hash: string) {
    return bcrypt.compareSync(plainText, hash);
  }
}
