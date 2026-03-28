export class User {
  public id?: string | undefined;
  public name : string;
  public email : string;
  private password : string;
  constructor(props:{
    name :string,
    email :string,
    id?: string | undefined,
    password:string
  }){

    this.name = props.name;
    this.email =props.email;
    this.id = props.id;
    this.password = props.password;
  }

  getPassword(){
    return this.password
  }
  toPersistence() {
  return {
    name: this.name,
    email: this.email,
    password: this.password
  };
}

}