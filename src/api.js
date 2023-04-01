class User {
  constructor(email, password) {
    this.user = {
      id: Math.random(),
      email: email,
      password: password,
    };
  }

  get() {
    return this.user;
  }
}

class ApiMock {
  constructor() {
    const defaultUser = new User('test@gmail.com', 'Test911');
    this.users = {
      [defaultUser.user.id]: {
        ...defaultUser.user,
      },
    };
    this.errorCodes = {
      404: 'User not found',
      400: 'Wrong data',
      500: 'User already exists',
      401: 'Wrong email or password',
    };
  }

  async request() {
    return new Promise((resolve) => setTimeout(resolve, 1500));
  }

  getUserByEmail(email) {
    return Object.values(this.users).find((user) => user.email === email);
  }

  async hasUser(email) {
    await this.request();
    return !!this.getUserByEmail(email);
  }

  async logIn({ email, password }) {
    await this.request();
    const user = this.getUserByEmail(email);
    if (!user) {
      throw new Error(this.errorCodes[404]);
    }

    if (user.password !== password) {
      await Promise.reject(this.errorCodes[401]);
      throw new Error(this.errorCodes[401]);
    }

    const { id } = user;
    return { id, email };
  }

  async createUser({ email, password }) {
    await this.request();
    if (!email || !password) {
      throw new Error(this.errorCodes[400]);
    }
    if (this.getUserByEmail(email)) {
      throw new Error(this.errorCodes[500]);
    }

    const userClass = new User(email, password);
    const user = userClass.get();
    this.users[user.id] = {
      ...user
    };
    return this.users[user.id];
  }
}

export default ApiMock;
