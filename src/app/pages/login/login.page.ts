import { Component, OnInit, Input } from '@angular/core';
import { TerritoriosService } from '../../services/territorios.service';
import { Observable } from 'rxjs';
//permite enrutar direcciones
import { Router, NavigationExtras } from '@angular/router';
import { ICongregacion } from '../../models/ICongregacion.interface';
import { AlertController } from '@ionic/angular';
//para guardar en storage
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor( 
    public restApi: TerritoriosService, 
    public router: Router, 
    private alertCtrl: AlertController,
    private storage: Storage
  ) 
  { }

  ngOnInit() { }
  
  @Input() loginInput = { codigo: '', password: '' }
  results: Observable<ICongregacion>;
  codigo: string = "";
  password: string = "";  

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      //subHeader: '',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  login() {
    this.restApi.setDataLogin(this.loginInput).subscribe(data => {
      //console.log(this.loginInput);
      if (data['status'] == 'error') {
        this.presentAlert(data['message']);
        this.loginInput.codigo = "";
        this.loginInput.password = "";
        return;
      }
      this.storage.set('session', data['congregacion']);
      // let navigationExtras: NavigationExtras = {
      //   state: {
      //     data: data['congregacion']
      //   }
      // }
      this.router.navigate(['/inicio/tabs/tab1']);
    })
  }
}
