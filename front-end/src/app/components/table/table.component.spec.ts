import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableComponent, MatTableModule],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('View Test', () => {
    beforeEach(() => {
      component.data = [{ id: 1, name: 'name', gender: 'male' }];
      component.displayedColumns = new Set(['id', 'name', 'gender']);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should load harness for a table', async () => {
      const tables = await loader.getAllHarnesses(MatTableHarness);
      expect(tables.length).toBe(1);
    });

    it('should get the different kinds of rows in the table', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const headerRows = await table.getHeaderRows();
      const rows = await table.getRows();
      expect(headerRows.length).toBe(1);
      expect(rows.length).toBe(1);
    });

    it('should get cells inside a row', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const headerRows = await table.getHeaderRows();
      const rows = await table.getRows();
      const headerCells = (
        await parallel(() => headerRows.map(row => row.getCells()))
      ).map(row => row.length);
      const cells = (await parallel(() => rows.map(row => row.getCells()))).map(
        row => row.length
      );

      expect(headerCells).toEqual([3]);
      expect(cells).toEqual([3]);
    });

    it('should be able to get the text of a cell', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const secondRow = (await table.getRows())[0];
      const cells = await secondRow.getCells();
      const cellTexts = await parallel(() => cells.map(cell => cell.getText()));
      expect(cellTexts).toEqual(['1', 'name', 'male']);
    });

    it('should be able to get the column name of a cell', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const fifthRow = (await table.getRows())[0];
      const cells = await fifthRow.getCells();
      const cellColumnNames = await parallel(() =>
        cells.map(cell => cell.getColumnName())
      );
      expect(cellColumnNames).toEqual(['id', 'name', 'gender']);
    });

    it('should be able to filter cells by text', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const firstRow = (await table.getRows())[0];
      const cells = await firstRow.getCells({ text: 'name' });
      const cellTexts = await parallel(() => cells.map(cell => cell.getText()));
      expect(cellTexts).toEqual(['name']);
    });

    it('should be able to filter cells by column name', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const firstRow = (await table.getRows())[0];
      const cells = await firstRow.getCells({ columnName: 'gender' });
      const cellTexts = await parallel(() => cells.map(cell => cell.getText()));
      expect(cellTexts).toEqual(['male']);
    });
  });
});
