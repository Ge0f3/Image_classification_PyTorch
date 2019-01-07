import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AppRoutingModule } from './app-routing.module';
import { ResultsService } from './results.service';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TagginPageComponent } from './taggin-page/taggin-page.component';
import { ArtificialDataComponent } from './artificial-data/artificial-data.component';
import { FooterComponent } from './footer/footer.component';
import { ReportPageComponent } from './report-page/report-page.component'

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    FileuploadComponent,
    NavbarComponent,
    HomepageComponent,
    TagginPageComponent,
    ArtificialDataComponent,
    FooterComponent,
    ReportPageComponent
  ],
  imports: [
  HttpClientModule,
  FormsModule,
  AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [ResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
