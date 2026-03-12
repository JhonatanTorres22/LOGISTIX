import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DialogModule } from "primeng/dialog";
import { UiButtonComponent } from "@/core/components/ui-button/ui-button.component";

@Component({
  selector: 'app-generar-firma',
  imports: [DialogModule, UiButtonComponent],
  templateUrl: './generar-firma.html',
  styleUrl: './generar-firma.scss'
})
export class GenerarFirma {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() firmaGenerada = new EventEmitter<string>();

  @ViewChild('firmaCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private dibujando = false;

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement
    this.ctx = canvas.getContext('2d')!
    this.ctx.lineWidth = 2.5
    this.ctx.strokeStyle = '#1f2937'
    this.ctx.lineCap = 'round'

    this.initEventos(canvas);
  }

  initEventos(canvas: HTMLCanvasElement) {

    // MOUSE
    canvas.addEventListener('mousedown', () => this.dibujando = true);
    canvas.addEventListener('mouseup', () => this.stop());
    canvas.addEventListener('mouseleave', () => this.stop());
    canvas.addEventListener('mousemove', (e) => {
      if (!this.dibujando) return;
      this.draw(e.offsetX, e.offsetY);
    });

    // TOUCH
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.dibujando = true;
      const p = this.getTouchPos(e, canvas);
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.dibujando) return;
      const p = this.getTouchPos(e, canvas);
      this.draw(p.x, p.y);
    });

    canvas.addEventListener('touchend', () => this.stop());
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  stop() {
    this.dibujando = false;
    this.ctx.beginPath();
  }

  getTouchPos(e: TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  }

  limpiar() {
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.beginPath();
  }

  guardarFirma() {
    this.agregarSello(); 
    const base64 = this.canvas.nativeElement.toDataURL('image/png');
    this.firmaGenerada.emit(base64);
    this.visibleChange.emit(false);
  }

agregarSello() {
  const canvas = this.canvas.nativeElement;
  const ctx = this.ctx;

  const centerX = canvas.width / 2;
  const centerY = canvas.height - 75;
  const radius = 65;
  const grosorAro = 18; // 👈 AQUÍ

  ctx.save();

  ctx.strokeStyle = 'rgba(0, 0, 139, 0.7)';
  ctx.fillStyle = 'rgba(0, 0, 139, 0.7)';
  ctx.lineWidth = 2.5;

  // Exterior
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Interior
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - grosorAro, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = 'bold 10px Arial';

  this.textoCircular(
    ctx,
    'UNIVERSIDAD AUTÓNOMA DE ICA',
    centerX,
    centerY,
    radius - 10,
    -Math.PI / 2
  );

  this.textoCircular(
    ctx,
    'GERENCIA GENERAL',
    centerX,
    centerY,
    radius - 10,
    Math.PI / 2,
    true
  );

  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FIRMADO', centerX, centerY);

  ctx.restore();
}

textoCircular(
  ctx: CanvasRenderingContext2D,
  texto: string,
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  invert = false
) {
  const chars = texto.split('');
  const angleStep = Math.PI / (chars.length + 2);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(startAngle);

  chars.forEach((char, i) => {
    ctx.save();
    const angle = invert
      ? (chars.length - i) * angleStep
      : i * angleStep;

    ctx.rotate(angle);
    ctx.translate(0, -radius);
    if (invert) ctx.rotate(Math.PI);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });

  ctx.restore();
}




  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

}
