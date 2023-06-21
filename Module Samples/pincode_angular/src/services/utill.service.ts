import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    appId!: string;

    // set AppId
    public setAppId(appId: string) {
        this.appId = appId;
    }

    // return appId
    public getAppId() {
        return this.appId;
    }
}
