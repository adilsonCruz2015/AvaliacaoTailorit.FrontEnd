import { Sexo } from './sexo.model';

export interface Usuario {
    usuarioId?: string;
    nome?: string;
    dataNascimento?: string;
    email?: string;
    senha?: string;
    sexo: Sexo;
    ativo: boolean;
}