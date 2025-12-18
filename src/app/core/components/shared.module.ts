import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardModule } from 'primeng/card';
import { Card } from "./card/card";
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { FloatLabelModule } from "primeng/floatlabel";
import { TableModule } from "primeng/table";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { Dialog } from "primeng/dialog";
import { RadioButtonModule } from 'primeng/radiobutton';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
const PrimeNgModule = [
    CardModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    TableModule,
    IconField,
    InputIcon,
    Dialog,
    RadioButtonModule,
    DividerModule,
    FieldsetModule,
    AccordionModule,
    ChipModule,
    ProgressBarModule,
    FileUploadModule


];
@NgModule({
    declarations: [],
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNgModule,
        Card
    ],
    exports: [PrimeNgModule, FormsModule, ReactiveFormsModule,CommonModule,
        Card
    ]

})

export class SharedModule { }