import { AppComponent } from '../../types/app-component.enum.js';
import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CityServiceInterface } from './city-service.interface.js';
import { CityEntity, CityModel } from './city.entity.js';
import CityService from './city.service.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import CityController from './city.controller.js';

export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer.bind<CityServiceInterface>(AppComponent.CityServiceInterface).to(CityService);
  cityContainer.bind<types.ModelType<CityEntity>>(AppComponent.CityModel).toConstantValue(CityModel);
  cityContainer.bind<ControllerInterface>(AppComponent.CategoryController).to(CityController).inSingletonScope();

  return cityContainer;
}
