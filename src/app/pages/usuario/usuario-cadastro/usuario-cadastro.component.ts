import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/core/modelos/usuario.model';
import { Sexo } from 'src/app/core/modelos/sexo.model';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/core/modelos/generic-form-validation';

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
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) { 

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido',
        minlength: 'O Nome precisa ter no mínimo 3 caracteres',
        maxlength: 'O Nome precisa ter no máximo 20 caracteres'
      },
      dataNascimento: {
        required: 'Informe a Data de Nascimento'
      },
      sexo: {
        required: 'Informe o sexo'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
   }

  

  ngAfterViewInit(): void {
    
  }

  

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: new FormControl(''),
      dataNascimento: '',
      email: [''],
      senha: [''],
      sexo:[''],
      ativo:[]
    });
  }

}
