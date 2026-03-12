import { ActualizarCategoria, CrearCategoria, ResponseCategoria } from '@/categoria/domain/models/categoria.model';
import { CategoriaRepository } from '@/categoria/domain/repositories/categoria.repository';
import { CategoriaSignal } from '@/categoria/domain/signals/categoria.signal';
import { CategoriaValidation } from '@/categoria/domain/validations/categoria.validation';
import { SharedModule } from '@/core/components/shared.module';
import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";

@Component({
  selector: 'app-add-edit-categoria',
  imports: [SharedModule, UiInputComponent, UiLoadingProgressBarComponent, UiButtonComponent],
  templateUrl: './add-edit-categoria.html',
  styleUrl: './add-edit-categoria.scss'
})
export class AddEditCategoria implements OnInit {
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();

  signal = inject(CategoriaSignal)
  categoriaSelect = this.signal.categoriaSelect
  categoriaAccion = this.signal.categoriaAccion
  repository = inject(CategoriaRepository)
  validation = inject(CategoriaValidation)
  expRegNombre = this.validation.expRegNombre
  expRegDescripcion = this.validation.expRegDescripcion
  maxLengthNombre = this.validation.maxLengthNombre
  minLengthNombre = this.validation.minLengthNombre
  maxLengthDescripcion = this.validation.maxLengthDescripcion
  minLengthDescripcion = this.validation.minLengthDescripcion
  expLockNombre = this.validation.expRegLockInputNombre
  expLockDescripcion = this.validation.expRegLockDescripcion

  loading: boolean = false
  categoriaForm: FormGroup
  alert = inject(AlertService);
  constructor() {

    this.categoriaForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.validation.maxLengthNombre),
        Validators.minLength(this.validation.minLengthNombre),
        Validators.pattern(this.validation.expRegNombre)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.validation.maxLengthDescripcion),
        Validators.minLength(this.validation.minLengthDescripcion),
        Validators.pattern(this.validation.expRegDescripcion)
      ])
    });

    effect(() => {
      const categoria = this.categoriaSelect();
      if (!categoria || !this.visible) return;

      if (categoria.idCategoria) {
        this.patchValue();
      } else {
        this.resetForm();
      }
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.resetForm();
    this.categoriaSelect.set(null as any);
  }

  onSubmit(): void {
    if (this.categoriaForm.invalid) return;

    this.loading = true;

    const isEdit = this.categoriaSelect()?.idCategoria;
    const accion = isEdit ? 'Editar' : 'Crear';

    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion} la categoría?`)
      .then(result => {
        if (!result) {
          this.loading = false;
          return;
        }

        if (isEdit) {
          this.editar({
            idCategoria: this.categoriaSelect().idCategoria,
            ...this.categoriaForm.value
          } as ActualizarCategoria);
        } else {
          this.agregar(this.categoriaForm.value as CrearCategoria);
        }
      });
  }

  agregar(categoria: CrearCategoria): void {
    this.repository.crear(categoria).subscribe({
      next: (res) => {
        this.categoriaAccion.set('CREADO');
        this.alert.showAlert('Categoría creada correctamente', 'success');
        this.loading = false;
        this.closeDialog();
      },
      error: (err) => {
        this.alert.showAlert(err.message, 'error');
        this.loading = false;
      }
    });
  }

  editar(categoria: ActualizarCategoria): void {
    this.repository.editar(categoria).subscribe({
      next: (res) => {
        this.categoriaAccion.set('EDITADO');
        this.alert.showAlert('Categoría editada correctamente', 'success');
        this.loading = false;
        this.closeDialog();
      },
      error: (err) => {
        this.alert.showAlert(err.message, 'error');
        this.loading = false;
      }
    });
  }

  patchValue(): void {
    const cat = this.categoriaSelect();
    if (!cat) return;

    this.categoriaForm.patchValue({
      nombre: cat.nombre,
      descripcion: cat.descripcion
    });
  }

  resetForm(): void {
    this.categoriaForm.reset();
    this.categoriaForm.markAsPristine();
    this.categoriaForm.markAsUntouched();
    this.loading = false;
  }

  closeDialog(): void {
    this.resetForm();
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
