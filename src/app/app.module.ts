import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { DaterangeComponent } from './daterange/daterange.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from '@angular/material/dialog';
import { Daterange1Component } from './daterange1/daterange1.component';
import {MatInputModule} from '@angular/material/input';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from './datemat/date-formats';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
// import { DialogcontentComponent } from './dialogcontent/dialogcontent.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatematComponent } from './datemat/datemat.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    DaterangeComponent,
    Daterange1Component,  
    // DialogcontentComponent,
    DatematComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync(),
    // { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    
  ],
  bootstrap: [AppComponent],
  schemas:  [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AppModule { }
