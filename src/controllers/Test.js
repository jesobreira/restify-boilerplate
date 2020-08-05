import TestSchema from '@schema/TestSchema'
import TestException from '@exception/TestException'

export async function Index(req, res) {
  res.json(200, TestSchema.stripUnknownProperties({ foo: 'bar' }))
}