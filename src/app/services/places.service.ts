import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

class Place {
  name: string = '';
  streetName: string = '';
  zipCode: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  placesURL = 'https://data.cityofnewyork.us/resource/feuq-due4.json';
  places = new Map<string, Place>();
  placeName: string[] = [];
  placeIsSelected: boolean | undefined;
  selectedPlace!: Place;
  cities: any;
  constructor(private http: HttpClient) {
    this.getPlaces().subscribe((data) => {
      this.getPlaceData(data);
    });
  }

  getPlaces() {
    return this.http.get(this.placesURL);
  }

  getPlaceData(data: any) {
    data.map((value: any) => {
      const library = new Place();
      library.name = value.name;
      library.streetName = value.streetname;
      library.zipCode = value.zip;

      this.places.set(library.name, library);
      this.placeName.push(value.name);
    });
  }

  placeSelected(name: String) {
    this.placeIsSelected = true;
    this.selectedPlace = this.cities.get(name) as Place;
  }
}
