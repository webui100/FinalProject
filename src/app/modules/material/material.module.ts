import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatRadioModule,
  MatExpansionModule,
} from '@angular/material';

const MaterialComponents = [
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatExpansionModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatRadioModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}
