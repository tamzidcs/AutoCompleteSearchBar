import { Component } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-place-details-view',
  templateUrl: './place-details-view.component.html',
  styleUrls: ['./place-details-view.component.css'],
})
// class Place {
//   name: string = '';
//   streetName: string = '';
//   zipCode: string = '';
// }
// @Injectable()
export class PlaceDetailsViewComponent {
  pl: String = 'test'
  constructor() {
    //this.pl = placesService.selectedPlace;
  }

  ngOnInit() {
    
  }
  
}
