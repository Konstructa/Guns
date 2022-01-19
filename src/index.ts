import { App } from './server/app';

async function main() {
  const app = new App();
  await app.listen();
}

main();
