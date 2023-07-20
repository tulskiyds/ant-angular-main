import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgZorroAntdModule } from './services/ng-zorro-antd.module';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import ru from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { KonkursComponent } from './components/konkurs/konkurs.component';
import { TableComponent } from './components/table/table.component';
import { ProcDetailsFormComponent } from './components/proc-details-form/proc-details-form.component';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    KonkursComponent,
    ProcDetailsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
