import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { version } from '../package.json';
import { HttpExceptionFilter } from './shared/interceptors/http-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      abortOnError: false,
    });

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    const config = new DocumentBuilder()
      .setTitle('Ponte API')
      .setDescription('Ponte API description')
      .setVersion(version)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const configService = app.get(ConfigService);
    const port = configService.get('app.port');

    app
      .listen(port)
      .then(() => {
        console.log(`Server is running on port ${port}`);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
bootstrap();
