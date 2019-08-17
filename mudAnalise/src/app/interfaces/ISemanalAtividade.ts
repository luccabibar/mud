export interface ISemanaAtividade{
    // o id repetiu entao cuidado
    id_atividade: number;
    semana_id: number;
    realizou: boolean;
    tempo: number;
    intensidade: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
