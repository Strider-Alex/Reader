//audio schema
export default class Audio {}
Music.schema = {
  name: 'Audio',
  primaryKey:'id',
  properties: {
    id:'int',
    title:  'string',
    author: 'string',
    size: 'int',
    duration:'int',
    music:{type:'Music',optional:true},
    doc:{type:'Doc',optional:true},
    date:'date',
    likes:'int'
  }
};