//music schema
export default class Music {}
Music.schema = {
  name: 'Music',
  primaryKey:'id',
  properties: {
    id:'int',
    title:  'string',
    author: 'string',
    size: 'int',
    duration:'int',
    date:'date',
    likes:'int'
  }
};