import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { routes } from './app/app-routing.module'
import { AppModule } from './app/app.module';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
