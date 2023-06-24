import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CityServiceInterface } from './city-service.interface.js';
import { fillDTO } from '../../core/helpers/index.js';
import CityRdo from './rdo/city.rdo.js';
import CreateCityDto from './dto/create-city.dto';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.CityServiceInterface) private readonly cityService: CityServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CityController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const categoriesToResponse = fillDTO(CityRdo, cities);
    this.ok(res, categoriesToResponse);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCityDto>,
    res: Response
  ): Promise<void> {

    const existCity = await this.cityService.findByCityName(body.name);

    if (existCity) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `City with name «${body.name}» exists.`,
        'CityController'
      );
    }

    const result = await this.cityService.create(body);
    this.created(res, fillDTO(CityRdo, result));
  }
}
