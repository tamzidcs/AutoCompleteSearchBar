/**
 * @title Plain input autocomplete
 */
 import {Component, OnInit} from '@angular/core';
 import {FormControl} from '@angular/forms';
 import {Observable} from 'rxjs';
 import {startWith, map} from 'rxjs/operators';
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  control = new FormControl();
  cities: string[] = ['New York', 'Chicago', 'San Fransisco', 'Seatle'];
  filteredCities: Observable<string[]>=new Observable<string[]>();

  ngOnInit() {
    this.filteredCities = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.cities.filter(cities => this._normalizeValue(cities).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
