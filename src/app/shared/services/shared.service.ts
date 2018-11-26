import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SharedService {
    public enrollMessage = new Subject<string>();
    setEnroolMessage() {
        this.enrollMessage.next();
    }
}