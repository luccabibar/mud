/**Interface da tabela de Lazer, que se liga ao Relatorio Semanal */
export interface ISemanaLazer {
    // aqui muda o id pq repetiu
    id_atividade: number;
    semana_id: number;
    realizou: boolean;
    comentario?: string;
    vezes: number;
    acompanhamento: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

}
