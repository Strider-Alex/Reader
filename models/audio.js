//audio schema
export default class Audio {}
Audio.schema = {
  name: 'Audio',
  primaryKey:'id',
  properties: {
    id:'int',
    title:  'string',
    author: 'string',
    size: {type:'int',optional:true},
    duration:{type:'int',optional:true},
    music:{type:'string',optional:true},
    doc:{type:'Doc',optional:true},
    date:'date',
    collection:'bool',
    remoteID:{type:'int',optional:true},
    comment:{type:'string',optional:true},
    path:{type:'string',optional:true}
  }
};