
export default class AuthModel {
  constructor(name, email, password, role, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = "";
    this._id = id;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.com',
    password: 'Password1',
    role: 'user',
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@ecom.com',
    password: 'Password1',
    role: 'Admin',
  },
];
