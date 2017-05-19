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
    liked:'bool',
    content:{type:'string',optional:true}
  }
};