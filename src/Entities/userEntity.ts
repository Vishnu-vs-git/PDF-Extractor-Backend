export class User {
  private id?: string | undefined;
  private name : string;
  private email : string;
  constructor(props:{
    name :string,
    email :string,
    id?: string | undefined
  }){

    this.name = props.name;
    this.email =props.email;
    this.id = props.id
  }

}