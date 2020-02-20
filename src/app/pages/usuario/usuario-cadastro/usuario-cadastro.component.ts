import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  HttpErrorResponse } from '@angular/common/http';

import { Observable, fromEvent, merge, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/core/modelos/usuario.model';
import { Sexo } from 'src/app/core/modelos/sexo.model';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/core/modelos/generic-form-validation';
import { SexoServico } from 'src/app/core/servicos/sexo.servico';
import { UsuarioServico } from 'src/app/core/servicos/usuario.servico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  usuario: Usuario;
  sexos: Sexo[];

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
              private sexoServico: SexoServico,
              private usuarioServico: UsuarioServico,
              private toastr: ToastrService,
              public router: Router) {

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
      },
      email: {
        email: 'Email inválido'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
   }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
      this.mudancasNaoSalvas = true;
    });
  }

  ngOnInit() {

    this.sexoServico.filtrar().pipe(

    ).subscribe((dados) => this.sexos = dados['data'] );

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.email]],
      senha: [''],
      sexo: ['', [Validators.required]],
      ativo: ['']
    });

  }

  adicionarUsuario() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {

      this.usuarioServico.inserir({
        nome: this.cadastroForm.get('nome').value,
        dataNascimento: this.cadastroForm.get('dataNascimento').value,
        email: this.cadastroForm.get('email').value,
        senha: this.cadastroForm.get('senha').value,
        sexo: this.cadastroForm.get('sexo').value,
        ativo: true }).pipe(
          catchError((error: HttpErrorResponse) => {

           if(error.status === 400) {
             this.toastr.error(error.error.errors[0]);
           }
           return from([]);
          })
        ).subscribe(() => {
          this.onReset();
          this.toastr.success('Cadastro realizado com sucesso!', 'Cadastro Usuário');
        });

      this.mudancasNaoSalvas = false;

    } else {
      this.toastr.error('Cadastro realizado com sucesso!', 'Cadastro Usuário');
    }
  }

  onReset(): void {
    this.cadastroForm.reset();
  }

  goBack(): void {
    
    this.router.navigate(['/usuario']);
  }

}
