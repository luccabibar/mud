export interface ISemanalAlimentacao{
    id_alimentacao: number;
    semana_id: number;
    carboidratos: number;
    proteinas: number;
    laticinios: number;
    ver_frut: number;
    hidratacao: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
