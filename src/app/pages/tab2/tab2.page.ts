import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TerritoriosService } from '../../services/territorios.service';
import { ITerritorio } from '../../models/iterritorio.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor (
    private TerritoriosService: TerritoriosService
  ) { }

  @Input() firstName: string;

  results: Observable<ITerritorio>;
  text: string = ''; 

  ngOnInit () { }

  ionViewWillEnter () {
    this.results = this.TerritoriosService.getTerritorios();
  }

  searchTerritorio(): void {
    if (this.text == "") {
      this.results = this.TerritoriosService.getTerritorios();
      return;
    }
    this.results = this.TerritoriosService.searchTerritorio(this.text);
  }
}
