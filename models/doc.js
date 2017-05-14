//audio schema
export default class Doc {}
Music.schema = {
  name: 'Doc',
  primaryKey:'id',
  properties: {
    id:'int',
    title:  'string',
    author: 'string',
    book:'string',
    length: 'int',
    date:'date'
  }
};