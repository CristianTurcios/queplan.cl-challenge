import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef;
  @Output() filterData = new EventEmitter<string>();

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        // unable to find correct type for this, should be KeyboardEvent :/
        map((event: any) => event.target.value.trim().toLocaleLowerCase()),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((value: string) => this.filterData.emit(value));
  }
}
