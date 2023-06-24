import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { ParamsDictionary } from 'express-serve-static-core';
import OfferRdo from './rdo/offer.rdo.js';
import { fillDTO } from '../../core/helpers/common.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
// import { ConfigInterface } from '../../core/config/config.interface.js';
// import { RestSchema } from '../../core/config/rest.schema.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
// import CreateOfferDto from './dto/create-offer.dto.js';


type ParamsOfferDetails = {
  offerId: string;
} | ParamsDictionary;

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    // @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    // this.addRoute({
    //   path: '/', method: HttpMethod.Post,
    //   handler: this.create
    // });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offersToResponse = fillDTO(OfferRdo, offers);

    this.ok(res, offersToResponse);
  }

  // public async create(
  //   { body, user }: Request<UnknownRecord, UnknownRecord, CreateOfferDto>,
  //   res: Response
  // ): Promise<void> {
  //   const result = await this.offerService.create({ ...body, owner: user.id });
  //   const offer = await this.offerService.findById(result.id);

  //   this.created(res, fillDTO(OfferRdo, offer));
  // }

  public async show(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));
  }


  public async delete(
    { params }: Request<ParamsOfferDetails>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;

    await this.offerService.deleteById(offerId);

    this.noContent(res, {});
  }


  public async update(
    { body, params }: Request<ParamsOfferDetails, UnknownRecord, UpdateOfferDto>,
    res: Response,
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

}
