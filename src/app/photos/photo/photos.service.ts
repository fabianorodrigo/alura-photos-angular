import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Photo} from './photo';

const API = 'http://arquitetura.ancinerj.gov.br/ancinecatalogo';

@Injectable({providedIn: 'root'})
export class PhotoService {
    constructor(private http: HttpClient) {
        //ao colocar private, esse 'http' se torna um atributo do componente automaticamente
    }

    listFromUser(userName: string) {
        return this.http.get<Photo[]>(`${API}/sistemas?${userName}`);
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams().append('page', page.toString());
        return this.http.get<Photo[]>(`${API}/sistemas?${userName}`, {params});
    }
}
