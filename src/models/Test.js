import bookshelf from '@lib/bookshelf'

const User = bookshelf.model('Test', {
  tableName: 'test',
  hasTimestamps: true,
  softDelete: true
})

export default User