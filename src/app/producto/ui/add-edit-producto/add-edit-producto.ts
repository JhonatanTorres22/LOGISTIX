import { UiInputComponent } from '@/core/components/ui-input/ui-input.component';
import { CrearProducto, EditarProducto, ResponseProducto } from '@/producto/domain/models/producto.model';
import { ProductoRepository } from '@/producto/domain/repository/producto.repository';
import { ProductoSignal } from '@/producto/domain/signals/producto.signal';
import { ProductoValidation } from '@/producto/domain/validations/producto.validation';
import { Component, effect, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from 'src/assets/demo/services/alert.service';
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";
import { UiLoadingProgressBarComponent } from "@/core/components/ui-loading-progress-bar/ui-loading-progress-bar.component";
import { MarcaSignal } from '@/marca/domain/signals/marca.signal';
import { MarcaRepository } from '@/marca/domain/repositories/marca.repository';
import { ApiError } from '@/core/interceptors/error-message.model';
import { UiSelect } from '@/core/components/ui-select/ui-select.interface';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from "primeng/floatlabel";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AddEditMarca } from "@/marca/ui/add-edit-marca/add-edit-marca";
import { UiSelectComponent } from "@/core/components/ui-select/ui-select.component";

@Component({
  selector: 'app-add-edit-producto',
  imports: [CommonModule, DialogModule, FormsModule, AutoCompleteModule, ReactiveFormsModule, SelectModule, UiInputComponent, UiButtonComponent, UiLoadingProgressBarComponent, FloatLabelModule, AddEditMarca, UiSelectComponent],
  templateUrl: './add-edit-producto.html',
  styleUrl: './add-edit-producto.scss'
})
export class AddEditProducto implements OnInit {

  loading: boolean = false
  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  signal = inject(ProductoSignal)
  productoAccion = this.signal.productoAccion
  validation = inject(ProductoValidation)
  repository = inject(ProductoRepository)

  signalMarca = inject(MarcaSignal)
  listMarca = this.signalMarca.listMarca
  marcaRepository = inject(MarcaRepository)
  actionMarca = this.signalMarca.actionMarca
  // signalCategoria = inject(CategoriaSignal)
  // selectCategoria = this.signalCategoria.categoriaSelect
  productoSelect = this.signal.productoSelect
  formProducto: FormGroup;

  expRegNombreModeloDescripcion = this.validation.expRegNombreModeloDescripcion
  expRegUnidad = this.validation.expRegUnidad
  expRegPrecio = this.validation.expRegPrecio

  maxLengthNombre = this.validation.maxLengthNombre
  maxLengthModelo = this.validation.maxLengthModelo
  maxLengthDescripcion = this.validation.maxLengthDescripcion
  maxLengthUnidad = this.validation.maxLengthUnidad
  maxLengthPrecio = this.validation.maxLengthPrecio

  minLengthNombre = this.validation.minLengthNombre
  minLengthModelo = this.validation.minLengthModelo
  minLengthDescripcion = this.validation.minLengthDecripcion
  minLengthUnidad = this.validation.minLengthUnidad

  expLockNombreModeloDescripcion = this.validation.expRegLockNombreModeloDescripcion
  expLockUnidad = this.validation.expRegLockUnidad
  expLockPrecio = this.validation.expRegLockPrecio

  filteredUnidades: any[] = [];

  listarMarcas: UiSelect[] = []
  unidades = [{ text: 'KILOGRAMO', value: 'KILOGRAMO' },
  { text: 'UNIDAD', value: 'UNIDAD' }, { text: 'LITRO', value: 'LITRO' },
  { text: 'METRO', value: 'METRO' }, { text: 'PAQUETE', value: 'PAQUETE' },
  { text: 'SACO', value: 'SACO' }, { text: 'GALÓN', value: 'GALÓN' }, { text: 'FRASCO', value: 'FRASCO' },
  { text: 'CAJA', value: 'CAJA' }, { text: 'ROLLO', value: 'ROLLO' }, { text: 'BOLSA', value: 'BOLSA' },
  {text: 'BLISTER', value : 'BLISTER'}, {text: 'SOBRES', value : 'SOBRES'}
  ];

  tipo : UiSelect[] = [
    {text: 'PRODUCTO', value: 'PRODUCTO'},
    {text: 'SERVICIO', value: 'SERVICIO'}
  ]



  constructor(private alert: AlertService) {
    this.formProducto = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(this.expRegNombreModeloDescripcion),
        Validators.maxLength(this.maxLengthNombre),
        Validators.minLength(this.minLengthNombre)
      ]),
      modelo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.expRegNombreModeloDescripcion),
        Validators.maxLength(this.maxLengthModelo),
        Validators.minLength(this.minLengthModelo)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.pattern(this.expRegNombreModeloDescripcion),
        Validators.maxLength(this.maxLengthDescripcion),
        Validators.minLength(this.minLengthDescripcion)
      ]),
      unidad: new FormControl('', [
        Validators.required,
        Validators.pattern(this.expRegUnidad),
        Validators.maxLength(this.maxLengthUnidad),
        Validators.minLength(this.minLengthUnidad)
      ]),
      urlImagen: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      marca: new FormControl('', [Validators.required]),
      tipo : new FormControl('', [Validators.required])
    });

    effect(() => {
      if (this.actionMarca() === 'Agregar') {
        this.obtenerMarcas();
      }
    })
  }

  ngOnInit() {
    if (!this.listMarca().length) {
      this.obtenerMarcas()
    }
  }

  obtenerMarcas() {
    this.loading = true;
    this.marcaRepository.obtenerMarcas().subscribe({
      next: (data) => {
        this.listMarca.set(data.data);
        this.loading = false;
      },
      error: (err) => {
        this.alert.showAlert(`Error al listar las marcas, ${err.userMessage}`, 'error');
        this.loading = false;
      }
    });
  }

  // Se llama cada vez que se abre el modal
  ngOnChanges() {
    if (this.visible) {
      this.resetForm();
    }
  }

private resetForm() {
  const producto = this.productoSelect();

  this.formProducto.reset({
    nombre: producto?.nombreProducto || '',
    modelo: producto?.modeloProducto || '',
    descripcion: producto?.descripcionProducto || '',
    unidad: producto?.unidad || '',
    urlImagen: producto?.urlImagen || '',
    marca: producto?.marca || null,
    tipo : producto?.tipo || ''
  });
}

  onSubmit() {
    if (this.formProducto.invalid) return;

    this.loading = true;
    const producto = this.productoSelect();
    const accion: 'Crear' | 'Editar' = producto.id === 0 ? 'Crear' : 'Editar';

    this.alert.sweetAlert('question', '¿Confirmar?', `¿Está seguro que desea ${accion}?`)
      .then(isConfirm => {
        if (!isConfirm) {
          this.loading = false;
          return;
        }

        const payload = {
          idCategoria: this.productoSelect().idCategoria,
          nombreProducto: this.formProducto.value.nombre,
          modeloProducto: this.formProducto.value.modelo,
          descripcionProducto: this.formProducto.value.descripcion,
          unidad: this.formProducto.value.unidad,
          urlImagen: this.formProducto.value.urlImagen,
          idMarca: this.formProducto.value.marca.idMarca,
          tipo: this.formProducto.value.tipo,
          id: producto.id
        };

        if (accion === 'Crear') {
          this.insertar(payload);
        } else {
          this.editar(payload);
        }
      });
  }

  insertar(newProducto: CrearProducto) {
    console.log(newProducto);

    this.repository.crear(newProducto).subscribe({
      next: (res) => {
        this.alert.showAlert(`Producto creado correctamente, ${res.message}`, 'success');
        this.productoAccion.set('CREADO');
        this.closeDialog();
      },
      error: (err: ApiError) => {
        console.log(err);

        this.alert.showAlert(`Error al crear el producto, ${err.error.message}`, 'error');
      },
      complete: () => this.loading = false
    });
  }

  editar(editProducto: EditarProducto) {
    console.log(editProducto);

    this.repository.editar(editProducto).subscribe({
      next: (res) => {
        const productoActualizado = {
          ...this.productoSelect(),
          ...editProducto,
          marca: this.listMarca().find(m => m.idMarca === editProducto.idMarca) || { idMarca: 0, nombreMarca: '', descripcionMarca: '' }
        };
        this.alert.showAlert(`Producto editado correctamente, ${res.message}`, 'success');
        this.productoSelect.set(productoActualizado);
        this.productoAccion.set('EDITADO');

        this.closeDialog();
      },
      error: (err) => {
        this.alert.showAlert(`Error al editar el producto, ${err.message}`, 'error');
      },
      complete: () => this.loading = false
    });
  }


  filteredMarcas: any[] = [];
  visibleMarcaModal: boolean = false
  buscarMarca(event: any) {
    const query = event.query.toLowerCase();

    this.filteredMarcas = this.listMarca().filter((marca: any) =>
      marca.nombreMarca.toLowerCase().includes(query)
    );
  }

  buscarUnidad(event: any) {
    const query = event.query.toLowerCase();

    this.filteredUnidades = this.unidades.filter(u =>
      u.text.toLowerCase().includes(query)
    );
  }


  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
