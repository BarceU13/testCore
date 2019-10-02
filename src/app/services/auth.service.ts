import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ 
    providedIn: 'root' 
})

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        console.log(this.currentUserSubject)
        return this.currentUserSubject.value;
    }

    login(email, password) {
        return this.http.post<any>('https://talentcore.herokuapp.com/auth/login', { email, password })
            .pipe(map(user => {
                console.log(user.status)
                if(user.status === 200){
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(this.currentUserSubject)
                    this.currentUserSubject.next(user);
                }
                
                return user;
            }));
    }

    logout() {
        // Remover usuario para quitar acceso
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}