import Quickstore from 'awful-name-thanks-npm'

import redis from '@lib/redis'
import knex from '@lib/knex'

let qs = new Quickstore({
	knex: knex,
  redis: redis,
  prefix: 'bizstore',
	mysql: {
		tableName: 'storage',
		keyColumn: 'key',
		valueColumn: 'value'
	}
})

export default qs
