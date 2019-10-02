import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router'
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  user : User = new User();
  userData:any; 
  imgSrc: string;

  constructor(private ims : ImageService, private router: Router) { }

  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('currentUser'));  
    console.log(this.userData)  
    this.user.name = this.userData.data.content.data.name;
    this.user.lastName = this.userData.data.content.data.lastname;
    this.user.role = this.userData.data.content.data.role;
    this.user.telephone = this.userData.data.content.data.telephone;
    this.user.sex = this.userData.data.content.data.sex;

    this.user.status = this.userData.data.content.data.statusUser.value;
    this.user.email = this.userData.data.content.data.email;

    

    this.ims.getAvatar(this.userData.nameProfilePicture).pipe(first())
    .subscribe( 
      data => { 
        if(data.status === 200){ 
          this.imgSrc  = "data:image/png;base64,"+data.data.content;
        }
        else{
          alert('Error en el envio de imagen')
        }
        
      }, 
      error => { alert('Sucedió un error'); }
    )
  }
}
