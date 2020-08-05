import schemata from 'schemata'

const TestSchema = schemata({
    name: 'TestSchema',
    properties: {
        id: {
            type: Number
        },
        name: {
            type: String
        }
    }
})

export default TestSchema