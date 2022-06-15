import { BackendApp } from './BackendApp';

try {
  new BackendApp().start();
} catch (error: any) {
  console.log({
    code: error.code,
    message: error.message
  });
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
  process.exit(1);
});
