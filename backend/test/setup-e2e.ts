// Fix absolute path (-_-)
require("tsconfig-paths/register");
import 'src/modules/logger';
import 'src/modules/app';

export default async () => {
  console.log('\n\nLoaded e2e tests environment.\n');
};
