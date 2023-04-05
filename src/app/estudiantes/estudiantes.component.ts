import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent {
  estudiantes: any[] = [];

  estudianteForm: FormGroup;

  // NOMBRE CONTROL
  nombreControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    this.noNumeroValidator(),
  ]);

  apellidoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    this.noNumeroValidator(),
  ]);

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  ciudadControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('[a-zA-Z ]*'),
  ]);

  celControl = new FormControl('', [
    Validators.required,
    this.celularValidatorNumber(),
    this.celularValidatorMax(),
  ]);

  constructor() {
    this.estudianteForm = new FormGroup({
      nombre: this.nombreControl,
      apellido: this.apellidoControl,
      email: this.emailControl,
      ciudad: this.ciudadControl,
      celular: this.celControl,
    });
  }

  onSubmit(): void {
    if (this.estudianteForm.valid) {
      this.estudiantes.push(this.estudianteForm.value);
      this.estudianteForm.reset();
    } else {
      this.estudianteForm.markAllAsTouched();
    }
  }

  noNumeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (/^[A-Za-z ]*$/.test(control.value)) {
        return null;
      } else {
        return {
          noNumero: true,
        };
      }
    };
  }
  celularValidatorNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (/^\d*$/.test(control.value)) {
        return null;
      } else {
        return {
          noCelular: true,
        };
      }
    };
  }
  celularValidatorMax(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (/^\S{10}$/.test(control.value)) {
        return null;
      } else {
        return {
          noDigits: true,
        };
      }
    };
  }
}
