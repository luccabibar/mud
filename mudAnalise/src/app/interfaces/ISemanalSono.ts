export interface ISemanalSono{
    id_sono: number;
    semana_id: number;
    duracao_sono: string;
    acordou: boolean;
    vezes_acordou: number;
    acordou_naturalmente: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
