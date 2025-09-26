import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

// Méthode Nouvelle Standalone
// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient()]
// });

platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));
