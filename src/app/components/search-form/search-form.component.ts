import { Component, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { PlacesService } from '../../services/places.service';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})

@Injectable()
export class SearchFormComponent {
  control = new FormControl();
  filteredPlaces: Observable<string[]> = new Observable<string[]>();
  constructor(private palcesService: PlacesService) {

  }
  ngOnInit() {
    this.filteredPlaces = this.control.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.palcesService.placeName.filter((placeName) =>
      this._normalizeValue(placeName).includes(filterValue)
    );
  }

  public placeSelected(placeName: String) {
    this.palcesService.placeSelected(placeName);
  }
}
