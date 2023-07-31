/**
 * @title Plain input autocomplete
 */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

class Library
{
  name: string="";
  streetName: string="";
  zipCode: string="";
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  citiesURL = "https://data.cityofnewyork.us/resource/feuq-due4.json";
  control = new FormControl();
  libraryName: string[]=[];
  cities = new Map<string, Library>();
  filteredCities: Observable<string[]> = new Observable<string[]>();
  data: string = "";
  cityData: number=0;
  cityIsSelected:boolean=false;
  selectedLibrary: Library=new Library();
  constructor(private http: HttpClient) {
    this.getCities().subscribe(data => {
      this.getCityData(data);
    });
  }

  ngOnInit() {
    this.filteredCities = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getCityData(data: any) {
    data.map((value: any)=>{
      const library = new Library();
      library.name = value.name;
      library.streetName = value.streetname;
      library.zipCode = value.zip;

      this.cities.set(library.name,library);
      this.libraryName.push(value.name);
    })
  }

  getCities() {
    return this.http.get(this.citiesURL);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.libraryName.filter(libraryName => this._normalizeValue(libraryName).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  citySelected(name:any) {
    // an array of your selections
    this.cityIsSelected=true;
    this.selectedLibrary=this.cities.get(name) as Library;
  }
}
