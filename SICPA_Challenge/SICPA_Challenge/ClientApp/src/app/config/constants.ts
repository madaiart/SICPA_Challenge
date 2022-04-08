// Angular Modules
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class Constants {
  public readonly Api_Endpoint: string = environment.Api_Endpoint;
  public readonly Api_Mock_Endpoint: string = environment.Api_Mock_Endpoint;
}