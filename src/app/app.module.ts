import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoverComponent } from './components/cover/cover/cover.component';
import { SurveyComponent } from './components/survey/survey/survey.component';
import { NavbarComponent } from './components/nav/navbar/navbar.component';

import { ModelComponent } from './components/model/model.component';
import { SurveyPageComponent } from './components/survey-page/survey-page.component';
import { AddModelComponent } from './components/add-model/add-model.component';

import { AdminComponent } from './components/admin/admin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminDimensionComponent } from './components/admin-dimension/admin-dimension.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngMaterComponent } from './components/ang-mater/ang-mater.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GraphComponent } from './components/graph/graph.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { ExcelUploadComponent } from './components/excel/excel-upload.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { Content1Component } from './components/content1/content1.component';
import { NewCoverComponent } from './components/new-cover/new-cover.component';
import { NewNavbarComponent } from './components/new-navbar/new-navbar.component';
import { NewToolCardComponent } from './components/new-tool-card/new-tool-card.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { NewSurveyPageComponent } from './components/new-survey-page/new-survey-page.component';
import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';
import { ExcelPreviewComponent } from './components/excel-preview/excel-preview.component';
import { HomeComponent } from './components/home/home.component';
import { NgSelectModule  } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    CoverComponent,
    SurveyComponent,
    NavbarComponent,
    ModelComponent,
     SurveyPageComponent,
     AddModelComponent,

     AdminComponent,
      AdminDimensionComponent,
      AdminDashboardComponent,
      AngMaterComponent,
      GraphComponent,
      AnalysisComponent,
      ExcelUploadComponent,
      AboutUsComponent,
      ContactComponent,
      FooterComponent,
      Content1Component,
      NewCoverComponent,
      NewNavbarComponent,
      NewToolCardComponent,
      NewSurveyPageComponent,
      NewAnalysisComponent,
      ExcelPreviewComponent,
      HomeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    SlickCarouselModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    NgSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
