import 'reflect-metadata';
import { Container } from 'inversify';
import RestApplication from './app/rest.js';
import { AppComponent } from './types/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createOfferContainer } from './modules/offer/offer.container.js';
import { createCommentContainer } from './modules/comment/comment.container.js';
import { createCityContainer } from './modules/city/city.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createCityContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createCityContainer()
  );

  const application = mainContainer.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap();
