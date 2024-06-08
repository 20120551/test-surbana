import { AppModule } from './app.module';
import { createApplication } from './bootstrap';

async function bootstrap() {
  const app = await createApplication({
    modules: AppModule,
    enableSwagger: true,
    enableLogger: true,
  });

  // add more things here

  await app.listen(3000);
}
bootstrap();
