/**
 * @title Plain input autocomplete
 */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

class City
{
  name: string="";
  county: string="";
  state: string="";
  population: string=""; 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  citiesURL = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=cities-and-towns-of-the-united-states&q=&rows=993&facet=feature&facet=feature2&facet=county&facet=state&refine.state=NY";
  control = new FormControl();
  cityName: string[]=[];
  cities = new Map<string, City>();
  filteredCities: Observable<string[]> = new Observable<string[]>();
  data: string = "";
  cityData: number=0;
  cityIsSelected:boolean=false;
  selectedCity: City=new City();
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
    for (let element in data["records" as keyof typeof data]) {
      var city: City = {  
        "name": data['records' as keyof typeof data][element as keyof typeof data]["fields" as keyof typeof data]["name" as keyof typeof data],
        "county": data['records' as keyof typeof data][element as keyof typeof data]["fields" as keyof typeof data]["county" as keyof typeof data],
        "state": data['records' as keyof typeof data][element as keyof typeof data]["fields" as keyof typeof data]["state" as keyof typeof data],
        "population": data['records' as keyof typeof data][element as keyof typeof data]["fields" as keyof typeof data]["pop_2010" as keyof typeof data],
      }
      this.cities.set(city.name,city);
      this.cityName.push(city.name);
    }
  }

  getCities() {
    return this.http.get(this.citiesURL);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.cityName.filter(cityName => this._normalizeValue(cityName).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  citySelected(name:any) {
    // an array of your selections
    this.cityIsSelected=true;
    this.selectedCity=this.cities.get(name) as City;
  }
}
