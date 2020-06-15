import { Controller, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Asset } from './models/RatingElement';

@Controller()
export class AppController {
  constructor() { }



  @Post('/add')
  addAsset(): Asset {

    const asset = new Asset();
    asset.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    

    return asset;
  }

}
