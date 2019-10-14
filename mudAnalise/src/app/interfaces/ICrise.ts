/**
 * Interface de crise, pra armazenar os dados que vem do Banco
 */
export interface ICrise {
    id_crise: number;
    usuario_id: number;
    local: string;
    sintoma_inicial: string;
    situacao: string;
    acompanhamento: string;
    duracao: number;
    intensidade: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
