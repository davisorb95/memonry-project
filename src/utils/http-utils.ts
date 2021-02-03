import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpUtils {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url, this.httpOptions).subscribe(
        value => resolve(value),
        error => reject(error.error)
      );
    });
  }

  post(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, body, this.httpOptions).subscribe(
        value => resolve(value),
        error => reject(error.error)
      );
    });
  }

  put(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, body, this.httpOptions).subscribe(
        value => resolve(value),
        error => reject(error.error)
      );
    });
  }

  delete(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url, this.httpOptions).subscribe(
        value => resolve(value),
        error => reject(error.error)
      );
    });
  }
}
