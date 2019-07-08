import { Observable } from "rxjs";
import { RxHttpRequest, RxHttpRequestResponse } from "@akanass/rx-http-request";

export interface INekoImage {
    url: string;
}
export interface INekoRoute {
    name: string;
    displayName: string;
    isNsfw?: boolean;
    request: () => Observable<RxHttpRequestResponse<INekoImage>>;
}