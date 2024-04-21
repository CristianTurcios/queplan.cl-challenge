import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Friend } from 'src/app/models/friend';
import { Columns } from 'src/app/types/displayed-columns';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() data: Array<Friend> = [];
  displayedColumns: Set<Columns> = new Set(['id', 'name', 'gender']);
}
