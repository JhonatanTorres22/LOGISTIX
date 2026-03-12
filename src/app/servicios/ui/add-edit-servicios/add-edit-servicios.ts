import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { DialogModule } from "primeng/dialog";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";

@Component({
  selector: 'app-add-edit-servicios',
  imports: [UiLoadingProgressBarComponent, DialogModule, UiButtonComponent],
  templateUrl: './add-edit-servicios.html',
  styleUrl: './add-edit-servicios.scss'
})
export class AddEditServicios {
  loading: boolean = false
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>()


  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
