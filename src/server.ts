import { App } from './shared/app/app';

async function main() {
  const app = new App();
  await app.listen();
}

main();
