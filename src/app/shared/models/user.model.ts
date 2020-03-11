export class User {
  constructor(
    public fullname: string,
    public email: string,
    public phone: string,
    public photo: string,
    public role: string,
    public amount: string,
    public about: string,
    public city: number,
    public street: number,
    public id?: number,
  ) { }
}

