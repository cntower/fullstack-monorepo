import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from '@app/app.component';
import { environment } from '../environments/environment';
import { API_BASE_URL } from './services/api.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: API_BASE_URL,
      useValue: environment.apiUrl,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
