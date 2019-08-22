import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TerritoriosService } from '../../services/territorios.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IManzana } from '../../models/IManzana.interface';
import { IRegistro } from '../../models/IRegistro.interface';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AlertController } from '@ionic/angular';
//storage 
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  content: Observable<IManzana>;
  manzanas: IManzana[] = [];
  response: string = '';
  conductor: string = '';
  @Input() registro = { 
    idcongregacion: '', 
    localidad: '',
    numero: '',
    manzanas: '',
    conductor: '' 
  }

  constructor(
    private TerritoriosService: TerritoriosService, 
    public restApi: TerritoriosService,
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private storage: Storage
  ) { }

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

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.TerritoriosService.getDetails(id).subscribe(result => {
      this.content = result;
    });
    this.TerritoriosService.getManzanasByTerritorio(id).subscribe(resultado => this.manzanas = resultado);
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  toggle = true;
  group = null;
  selected = [];

  userChanged(event: { component: IonicSelectableComponent, value: any}) {
    //console.log('Selected: ', event);
  }
 
  openFromCode() {
    this.selectComponent.open();
  }
 
  // clear() {
  //   this.selectComponent.clear();
  //   this.selectComponent.close();
  // }
 
  toggleItems() {
    this.selectComponent.toggleItems(this.toggle);
    this.toggle = !this.toggle;
  }
 
  confirm() {
    this.selectComponent.confirm(); 
    this.selectComponent.close();
    this.selected.forEach(value => {
      this.registro.manzanas = this.registro.manzanas + value.letra;
      this.TerritoriosService.setManzanaTerminada(value.id).subscribe(result => this.response = result);
    });
    
    this.storage.get('session').then((val) => {
      this.registro.idcongregacion = val['id'];
    });
    //servicio de envio de registro
    this.registro.numero = this.content['numero'];
    this.registro.localidad = this.content['localidad'];
    this.registro.idcongregacion = "1";
    this.restApi.setRegistro(this.registro).subscribe(data => {
      if (data['status'] == 'error') {
        this.presentAlert(data['message']);
        return;
      }
    })
  }
}
