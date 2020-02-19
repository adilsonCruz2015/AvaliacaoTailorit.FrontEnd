import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/modelos/usuario.model';
import { Sexo } from 'src/app/core/modelos/sexo.model';
import { ValidationMessages } from 'src/app/core/modelos/generic-form-validation';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit, AfterViewInit {
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';
  sexos: Sexo[];

  validationMessages: ValidationMessages;

  constructor(private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    throw new Error("Method not implemented.");
  }

  

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      dataNascimento: ['', Validators.required],
      email: [''],
      senha:[''],
      sexo: ['']
    });
  }

}