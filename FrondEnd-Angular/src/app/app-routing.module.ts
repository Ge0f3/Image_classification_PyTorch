import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FileuploadComponent} from './fileupload/fileupload.component';
import { HomepageComponent} from './homepage/homepage.component';
import { TagginPageComponent} from './taggin-page/taggin-page.component';
import { ArtificialDataComponent } from './artificial-data/artificial-data.component';
import { ReportPageComponent } from './report-page/report-page.component';

const routes:Routes =[
  {path:'',component:HomepageComponent},
  {path:'data_tag',component:LandingpageComponent},
  {path:'data_mask',component:TagginPageComponent},
  {path:'landing',component:LandingpageComponent},
  {path:'fileupload',component:FileuploadComponent},
  {path:'artificial_data',component:ArtificialDataComponent},
  {path:'report_page',component:ReportPageComponent}

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
