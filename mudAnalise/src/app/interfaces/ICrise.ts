export interface ICrise {
    // o id repetiu entao cuidado
    id_crise: number;
    usuario_id: number;
    local: string;
    sintoma_inicial: string;
    situacao: string;
    acompanhamento: string;
    hora_inicio: string;
    hora_fim: string;
    intensidade: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
