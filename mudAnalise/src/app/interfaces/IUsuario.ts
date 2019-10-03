/**
 * interface do Usuario, preenchida apos puxar os dados do profissional/paciente 
 */
export interface IUsuario {
    id_usuario?: number;
    nome: string;
    cpf: string;
    email: string;
    celular: string;
    profissional?: boolean;
    crp?: string;
    senha?: string; // nao pode trazer a senha do usuario
    key?: string;   
    dt_nasc: string;
    sexo?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
 