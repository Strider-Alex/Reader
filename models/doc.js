//audio schema
export default class Doc {}
Doc.schema = {
  name: 'Doc',
  primaryKey:'id',
  properties: {
    id:'int',
    title:  'string',
    author: 'string',
    book:'string',
    length: 'int',
    date:'date',
    likes:'int',
    content:{type:'string',optional:true}
  }
};