import * as Test from '@controller/Test'

const routes = (server) => {
  server.get({ path: '/test/route' }, Test.Index)
};

export default routes;
