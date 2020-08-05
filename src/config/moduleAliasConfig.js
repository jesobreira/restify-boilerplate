import path from 'path'

export default {
  "~": path.join(__dirname, '..'),
  '@controller': path.join(__dirname, '..', 'controllers'),
  '@model': path.join(__dirname, '..', 'models'),
  '@schema': path.join(__dirname, '..', 'schemas'),
  '@helper': path.join(__dirname, '..', 'helpers'),
  '@util': path.join(__dirname, '..', 'utils'),
  '@lib': path.join(__dirname, '..', 'libs'),
  '@exception': path.join(__dirname, '..', 'exceptions'),
  '@worker': path.join(__dirname, '..', 'workers'),
  '@listener': path.join(__dirname, '..', 'listeners'),
}
