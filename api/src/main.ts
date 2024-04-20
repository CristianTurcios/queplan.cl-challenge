import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
// import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  // app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Friends API')
    .setDescription('friends api for queplan.cl challenge')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('friends')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
