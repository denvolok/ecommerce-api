import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerConfig {
  public static init(app: INestApplication): void {
    const options = new DocumentBuilder()
      .setTitle("ecommerce-api")
      .setDescription("ecommerce-api API description")
      .setVersion("1.0")
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("api", app, document);
  }
}
