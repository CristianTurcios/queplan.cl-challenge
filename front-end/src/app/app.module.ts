import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FilterComponent } from './components/filter/filter.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FilterComponent,
    TableComponent,
    HeaderComponent,
    SpinnerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
