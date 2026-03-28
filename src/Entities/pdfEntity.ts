export class PdfEntity {
  public id?:string|undefined;
  public url:string;
  public publicId:string;
  public userId:string;
  constructor(
    props:{
      id?:string,
      url:string,
      publicId:string,
      userId:string
    }
  ){
    this.id =props.id;
    this.url = props.url;
    this.publicId = props.publicId;
    this.userId = props.userId
  }
}