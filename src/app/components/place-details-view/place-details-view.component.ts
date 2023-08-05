import { Component } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Injectable } from '@angular/core';
import {Place} from '../../interfaces/places'

@Component({
  selector: 'app-place-details-view',
  templateUrl: './place-details-view.component.html',
  styleUrls: ['./place-details-view.component.css'],
})

// @Injectable()
export class PlaceDetailsViewComponent {
  place!: Place;
  constructor() {
    this.place = {
      name: 'place1',
      streetName: 'street1',
      zipCode: '0001',
    };
    //this.place = placesService.selectedPlace;
  }

  ngOnInit() {}
}
