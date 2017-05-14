//music schema
export default class Music {}
Music.schema = {
  name: 'Music',
  properties: {
    title:  'string',
    author: 'string',
    size: 'int',
    duration:'int'
  }
};