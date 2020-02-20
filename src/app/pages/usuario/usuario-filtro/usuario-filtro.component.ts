import { Component, OnInit } from '@angular/core';
import { UsuarioServico } from 'src/app/core/servicos/usuario.servico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, from } from 'rxjs';
import { Usuario } from 'src/app/core/modelos/usuario.model';
import { debounceTime, distinctUntilChanged, switchMap, tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-filtro',
  templateUrl: './usuario-filtro.component.html',
  styleUrls: ['./usuario-filtro.component.css']
})
export class UsuarioFiltroComponent implements OnInit {

  constructor(private usuarioServico: UsuarioServico,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  executando = false;
  excluindo  = false;
  buscaForm: FormGroup;
  usuarios: Usuario[];
  naoEncontrado = false;
  qtd: number = 0;

  ngOnInit() {
    this.buscaForm = this.fb.group({
      texto: [''],
      ativo: ['']
    });
    this.buscaForm.controls.ativo.setValue('', {onlySelf: true});

    this.buscaForm.controls.texto.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((term: string) => { this.onSubmit(); return of(); })
  ).subscribe();

    this.onSubmit();

  }

  onSubmit(): void {
    const texto: string = this.buscaForm.value.texto;
    const ativo: string = this.buscaForm.value.ativo;
    this.naoEncontrado = false;

    this.usuarioServico.filtrar({
      nome: texto,
      ativo
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.usuarios = null;
          this.naoEncontrado = true;
        }
        return from([]);
      })
    ).subscribe((dados) => {
      this.usuarios = dados.data;
    });
 }

  onChange(): void {
    this.onSubmit();
  }
}
