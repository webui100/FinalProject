import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  public processing: boolean = false;
  public storage: Subject<any> = new Subject<any>();

  public publish(value: any) {
    this.storage.next(value);
  }
}
