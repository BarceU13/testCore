import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getAvatar(id) {
    return this.http.post<any>('https://file-server-talent.herokuapp.com/getImage', { id })
        .pipe(map(avatar => {  
            return avatar;
        }));
  }
}
