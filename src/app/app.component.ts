/**
 * @title Plain input autocomplete
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {SearchFormComponent} from './components/search-form/search-form.component'
import {PlaceDetailsViewComponent} from './components/place-details-view/place-details-view.component'
import { PlacesService } from './services/places.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: string = '';
  cityData: number = 0;
  cityIsSelected: boolean = true;

  constructor(private placesService: PlacesService) {

  }

  // ngOnInit() {
  //   this.cityIsSelected = true;
  // }
}
