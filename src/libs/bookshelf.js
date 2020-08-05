import Bookshelf from 'bookshelf'
import knex from './knex'

import bookshelfParanoia from 'bookshelf-paranoia'
import bookshelfJson from 'bookshelf-json-columns'
import bookshelfEloquent from 'bookshelf-eloquent'

const bookshelf = Bookshelf(knex)

bookshelf.plugin(bookshelfParanoia)
bookshelf.plugin(bookshelfJson)
bookshelf.plugin(bookshelfEloquent)

export default bookshelf
