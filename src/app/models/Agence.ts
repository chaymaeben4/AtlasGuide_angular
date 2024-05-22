export class Agence {
  id: number;
  name: string;
  location: string;
  email: string;
  phone: string;
  password: string;
  constructor(
    id: number,
    name: string,
    location: string,
    email: string,
    phone: string,
    password: string,) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
