export class User {
  constructor(
    public id: number = null,
    public fullname: string = null,
    public phone: string = null,
    public email: string = null,
    public photo: string = null,
    public role: number = null,
    public tariff: number = null,
    public trademark: string = null,
    public amount: number = null,
    public about: string = null
  ) { }
}
