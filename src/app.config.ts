import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { ProvidersModule } from '@/core/providers/provider.module';
import { MessageService } from 'primeng/api';
import { BasicAuthInterceptor } from '@/core/helpers/basic-auth.interceptor';
import { ErrorInterceptor } from '@/core/helpers/error.interceptor';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';


export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideEchartsCore({ echarts }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      }),
      withEnabledBlockingInitialNavigation()
    ),

    provideHttpClient(
      withInterceptorsFromDi()
    ),

    provideAnimationsAsync(),
    importProvidersFrom(ProvidersModule),

    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' }
      },
      translation: {
        firstDayOfWeek: 1,
        dayNames: [
          "domingo", "lunes", "martes", "miércoles",
          "jueves", "viernes", "sábado"
        ],
        dayNamesShort: [
          "dom", "lun", "mar", "mié", "jue", "vie", "sáb"
        ],
        dayNamesMin: [
          "D", "L", "M", "X", "J", "V", "S"
        ],
        monthNames: [
          "enero", "febrero", "marzo", "abril",
          "mayo", "junio", "julio", "agosto",
          "septiembre", "octubre", "noviembre", "diciembre"
        ],
        monthNamesShort: [
          "ene", "feb", "mar", "abr",
          "may", "jun", "jul", "ago",
          "sep", "oct", "nov", "dic"
        ],
        today: "Hoy",
        clear: "Limpiar"
      }
    })

  ]
};
