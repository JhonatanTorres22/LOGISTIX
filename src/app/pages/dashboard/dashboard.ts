import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { ListOrdenPorFirmar } from "./components/list-orden-por-firmar/list-orden-por-firmar";
import { ListDocTributarioPorAprobar } from "./components/list-doc-tributario-por-aprobar/list-doc-tributario-por-aprobar";
import { ListComprobantePorCargar } from "./components/list-comprobante-por-cargar/list-comprobante-por-cargar";

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, ListOrdenPorFirmar, ListDocTributarioPorAprobar, ListComprobantePorCargar],
    template: `
<div class="grid w-full">

    <div class="col-12">
        <app-stats-widget></app-stats-widget>
    </div>

    <div class="col-12">
        <div class="grid">

            <div class="col-12 lg:col-6">
                <div class="flex flex-column gap-3">
                    <app-list-orden-por-firmar></app-list-orden-por-firmar>
                    <app-list-comprobante-por-cargar></app-list-comprobante-por-cargar>
                </div>
            </div>

            <div class="col-12 lg:col-6">
                <app-list-doc-tributario-por-aprobar></app-list-doc-tributario-por-aprobar>
            </div>

        </div>
    </div>

</div>
    `
})
export class Dashboard { }
