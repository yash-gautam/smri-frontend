import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddModelComponent } from './components/add-model/add-model.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDimensionComponent } from './components/admin-dimension/admin-dimension.component';
import { AdminComponent } from './components/admin/admin.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { ContactComponent } from './components/contact/contact.component';
import { CoverComponent } from './components/cover/cover/cover.component';
import { GraphComponent } from './components/graph/graph.component';
import { ModelComponent } from './components/model/model.component';
import { SurveyPageComponent } from './components/survey-page/survey-page.component';
import { SurveyComponent } from './components/survey/survey/survey.component';
import {NewCoverComponent} from './components/new-cover/new-cover.component';
import { HomeComponent } from './components/home/home.component';
import { NewSurveyPageComponent } from './components/new-survey-page/new-survey-page.component';
import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "survey", component: NewSurveyPageComponent},

  {path:"admin",component:AdminDashboardComponent},

  // {path:"graph",component:GraphComponent},
  {path:"analysis",component:NewAnalysisComponent},
  // {path:"about",component:AboutUsComponent},
  // {path:"contact",component:ContactComponent},
  {path:"newCover",component:NewCoverComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
