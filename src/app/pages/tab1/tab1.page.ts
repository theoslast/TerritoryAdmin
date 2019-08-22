import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICongregacion } from '../../models/ICongregacion.interface';
import { Observable } from 'rxjs';
//para guardar en storage
import { Storage } from '@ionic/storage';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  congregacion: Observable<ICongregacion>;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private storage: Storage,
    private modalController: ModalController,
  ) {
    // ----------- para pasar parametros a otra page
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.congregacion = this.router.getCurrentNavigation().extras.state.data;
    //     //console.log(this.congregacion)
    //   }
    // });
  }

  ngOnInit() { 
    this.storage.get('session').then((val) => {
      this.congregacion = val;
    });
  }

  //permite mostrar imagen como modal
  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }
}
