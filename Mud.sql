--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.12
-- Dumped by pg_dump version 9.6.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: alimentacao; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.alimentacao (
    id_alimentacao integer NOT NULL,
    semana_id integer NOT NULL,
    carboidratos integer DEFAULT 0 NOT NULL,
    proteinas integer NOT NULL,
    laticinios integer DEFAULT 0 NOT NULL,
    verd_frut integer DEFAULT 0 NOT NULL,
    hidratacao integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.alimentacao OWNER TO mudadmin;

--
-- Name: COLUMN alimentacao.carboidratos; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.alimentacao.carboidratos IS '0-POUCO__1-MÉDIO__2-MUITO';


--
-- Name: COLUMN alimentacao.proteinas; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.alimentacao.proteinas IS '0-POUCO__1-MÉDIO__2-MUITO';


--
-- Name: COLUMN alimentacao.laticinios; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.alimentacao.laticinios IS '0-POUCO__1-MÉDIO__2-MUITO';


--
-- Name: COLUMN alimentacao.verd_frut; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.alimentacao.verd_frut IS '0-POUCO__1-MÉDIO__2-MUITO';


--
-- Name: COLUMN alimentacao.hidratacao; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.alimentacao.hidratacao IS '0-menos5COPOS__1-6-11COPOS__0-mais11COPOS';


--
-- Name: COLUMN alimentacao.deleted_at; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.alimentacao.deleted_at IS 'antes tava com INTEGER';


--
-- Name: alimentacao_id_alimentacao_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.alimentacao_id_alimentacao_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alimentacao_id_alimentacao_seq OWNER TO mudadmin;

--
-- Name: alimentacao_id_alimentacao_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.alimentacao_id_alimentacao_seq OWNED BY public.alimentacao.id_alimentacao;


--
-- Name: apps_key; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.apps_key (
    app_key integer NOT NULL,
    id_usuario integer NOT NULL,
    app_name character varying(45) NOT NULL,
    key character varying(200) NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date,
    deleted_at date
);


ALTER TABLE public.apps_key OWNER TO mudadmin;

--
-- Name: apps_key_app_key_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.apps_key_app_key_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.apps_key_app_key_seq OWNER TO mudadmin;

--
-- Name: apps_key_app_key_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.apps_key_app_key_seq OWNED BY public.apps_key.app_key;


--
-- Name: atividade_fisica; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.atividade_fisica (
    id_atividade integer NOT NULL,
    semana_id integer NOT NULL,
    a_realizou boolean DEFAULT false NOT NULL,
    tempo integer DEFAULT 0 NOT NULL,
    intensidade integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.atividade_fisica OWNER TO mudadmin;

--
-- Name: COLUMN atividade_fisica.intensidade; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.atividade_fisica.intensidade IS '0-LEVE__1-MODERADO__2-ALTO';


--
-- Name: atividade_fisica_id_atividade_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.atividade_fisica_id_atividade_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.atividade_fisica_id_atividade_seq OWNER TO mudadmin;

--
-- Name: atividade_fisica_id_atividade_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.atividade_fisica_id_atividade_seq OWNED BY public.atividade_fisica.id_atividade;


--
-- Name: bem_estar; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.bem_estar (
    id_atividade integer NOT NULL,
    semana_id integer NOT NULL,
    b_realizou boolean DEFAULT false NOT NULL,
    comentario character varying(200),
    vezes integer DEFAULT 0,
    acompanhamento boolean DEFAULT false NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date,
    deleted_at date
);


ALTER TABLE public.bem_estar OWNER TO mudadmin;

--
-- Name: bem_estar_id_atividade_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.bem_estar_id_atividade_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bem_estar_id_atividade_seq OWNER TO mudadmin;

--
-- Name: bem_estar_id_atividade_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.bem_estar_id_atividade_seq OWNED BY public.bem_estar.id_atividade;


--
-- Name: contato; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.contato (
    id_contato integer NOT NULL,
    id_usuario integer NOT NULL,
    nome character varying(50),
    telefone character varying(20)
);


ALTER TABLE public.contato OWNER TO mudadmin;

--
-- Name: contato_id_contato_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.contato_id_contato_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contato_id_contato_seq OWNER TO mudadmin;

--
-- Name: contato_id_contato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.contato_id_contato_seq OWNED BY public.contato.id_contato;


--
-- Name: crise; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.crise (
    id_crise integer NOT NULL,
    usuario_id integer NOT NULL,
    local character varying(300) NOT NULL,
    sintoma_inicial integer[],
    situacao character varying(300) NOT NULL,
    intensidade integer,
    acompanhamento integer,
    duracao integer NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date,
    deleted_at date
);


ALTER TABLE public.crise OWNER TO mudadmin;

--
-- Name: crise_id_crise_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.crise_id_crise_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.crise_id_crise_seq OWNER TO mudadmin;

--
-- Name: crise_id_crise_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.crise_id_crise_seq OWNED BY public.crise.id_crise;


--
-- Name: dado_inicial; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.dado_inicial (
    id_dado_inicial integer NOT NULL,
    usuario_id integer NOT NULL,
    sintoma_id integer[],
    primeira_crise date NOT NULL,
    situacao_sintoma character varying(500),
    intolerancia character varying(200),
    created_at date DEFAULT now() NOT NULL,
    updated_at date,
    deleted_at date
);


ALTER TABLE public.dado_inicial OWNER TO mudadmin;

--
-- Name: COLUMN dado_inicial.sintoma_id; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.dado_inicial.sintoma_id IS 'Sintomas estão na ordem por um array';


--
-- Name: dado_inicial_id_dado_inicial_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.dado_inicial_id_dado_inicial_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dado_inicial_id_dado_inicial_seq OWNER TO mudadmin;

--
-- Name: dado_inicial_id_dado_inicial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.dado_inicial_id_dado_inicial_seq OWNED BY public.dado_inicial.id_dado_inicial;


--
-- Name: mural; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.mural (
    id_mural integer NOT NULL,
    titulo character varying(44) NOT NULL,
    texto character varying(120) NOT NULL,
    usu_paciente integer NOT NULL,
    usu_prof integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    novo character varying,
    deleted_at date
);


ALTER TABLE public.mural OWNER TO mudadmin;

--
-- Name: mural_id_mural_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.mural_id_mural_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mural_id_mural_seq OWNER TO mudadmin;

--
-- Name: mural_id_mural_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.mural_id_mural_seq OWNED BY public.mural.id_mural;


--
-- Name: notificacao; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.notificacao (
    id_user integer NOT NULL,
    token character varying NOT NULL
);


ALTER TABLE public.notificacao OWNER TO mudadmin;

--
-- Name: semana; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.semana (
    id_semana integer NOT NULL,
    usuario_id integer NOT NULL,
    data_inicial date NOT NULL,
    data_final date NOT NULL,
    observacao character varying(200),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    deleted_at character varying(45)
);


ALTER TABLE public.semana OWNER TO mudadmin;

--
-- Name: semana_id_semana_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.semana_id_semana_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.semana_id_semana_seq OWNER TO mudadmin;

--
-- Name: semana_id_semana_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.semana_id_semana_seq OWNED BY public.semana.id_semana;


--
-- Name: sessao_id_sessao_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.sessao_id_sessao_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999999999999
    CACHE 1;


ALTER TABLE public.sessao_id_sessao_seq OWNER TO mudadmin;

--
-- Name: sessao; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.sessao (
    id_sessao bigint DEFAULT nextval('public.sessao_id_sessao_seq'::regclass) NOT NULL,
    hash character varying(35) NOT NULL,
    usuario_id integer,
    profissional_id integer NOT NULL,
    status integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at date,
    deleted_at date
);


ALTER TABLE public.sessao OWNER TO mudadmin;

--
-- Name: COLUMN sessao.status; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON COLUMN public.sessao.status IS '0 - aguardando // 1- ativa // 2- inativa';


--
-- Name: sintoma; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.sintoma (
    id_sintoma integer NOT NULL,
    nome character varying(200) NOT NULL,
    classe integer NOT NULL,
    created_at date NOT NULL,
    updated_at date,
    deleted_at date
);


ALTER TABLE public.sintoma OWNER TO mudadmin;

--
-- Name: sintoma_id_sintoma_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.sintoma_id_sintoma_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sintoma_id_sintoma_seq OWNER TO mudadmin;

--
-- Name: sintoma_id_sintoma_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.sintoma_id_sintoma_seq OWNED BY public.sintoma.id_sintoma;


--
-- Name: situacao; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.situacao (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    situacao character varying(200)
);


ALTER TABLE public.situacao OWNER TO mudadmin;

--
-- Name: situacao_id_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.situacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.situacao_id_seq OWNER TO mudadmin;

--
-- Name: situacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.situacao_id_seq OWNED BY public.situacao.id;


--
-- Name: sono; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.sono (
    id_sono integer NOT NULL,
    semana_id integer NOT NULL,
    duracao_sono integer NOT NULL,
    acordou boolean NOT NULL,
    vezes_acordou integer,
    acordou_naturalmente boolean DEFAULT false NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date,
    deleted_at integer
);


ALTER TABLE public.sono OWNER TO mudadmin;

--
-- Name: sono_id_sono_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.sono_id_sono_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sono_id_sono_seq OWNER TO mudadmin;

--
-- Name: sono_id_sono_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.sono_id_sono_seq OWNED BY public.sono.id_sono;


--
-- Name: teste; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.teste (
    id integer NOT NULL,
    nome character varying(120),
    idade integer
);


ALTER TABLE public.teste OWNER TO mudadmin;

--
-- Name: TABLE teste; Type: COMMENT; Schema: public; Owner: mudadmin
--

COMMENT ON TABLE public.teste IS 'Tabela teste para API';


--
-- Name: teste_id_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.teste_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teste_id_seq OWNER TO mudadmin;

--
-- Name: teste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.teste_id_seq OWNED BY public.teste.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: mudadmin
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nome character varying(200) NOT NULL,
    cpf character varying(14) NOT NULL,
    email character varying(200) NOT NULL,
    celular character varying(16) NOT NULL,
    profissional boolean DEFAULT false NOT NULL,
    crp character varying(9),
    senha character varying(200) NOT NULL,
    key character varying(200) NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date,
    deleted_at date,
    dt_nasc date
);


ALTER TABLE public.usuario OWNER TO mudadmin;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: mudadmin
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_usuario_seq OWNER TO mudadmin;

--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mudadmin
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- Name: alimentacao id_alimentacao; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.alimentacao ALTER COLUMN id_alimentacao SET DEFAULT nextval('public.alimentacao_id_alimentacao_seq'::regclass);


--
-- Name: apps_key app_key; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.apps_key ALTER COLUMN app_key SET DEFAULT nextval('public.apps_key_app_key_seq'::regclass);


--
-- Name: atividade_fisica id_atividade; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.atividade_fisica ALTER COLUMN id_atividade SET DEFAULT nextval('public.atividade_fisica_id_atividade_seq'::regclass);


--
-- Name: bem_estar id_atividade; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.bem_estar ALTER COLUMN id_atividade SET DEFAULT nextval('public.bem_estar_id_atividade_seq'::regclass);


--
-- Name: contato id_contato; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.contato ALTER COLUMN id_contato SET DEFAULT nextval('public.contato_id_contato_seq'::regclass);


--
-- Name: crise id_crise; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.crise ALTER COLUMN id_crise SET DEFAULT nextval('public.crise_id_crise_seq'::regclass);


--
-- Name: dado_inicial id_dado_inicial; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.dado_inicial ALTER COLUMN id_dado_inicial SET DEFAULT nextval('public.dado_inicial_id_dado_inicial_seq'::regclass);


--
-- Name: mural id_mural; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.mural ALTER COLUMN id_mural SET DEFAULT nextval('public.mural_id_mural_seq'::regclass);


--
-- Name: semana id_semana; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.semana ALTER COLUMN id_semana SET DEFAULT nextval('public.semana_id_semana_seq'::regclass);


--
-- Name: sintoma id_sintoma; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.sintoma ALTER COLUMN id_sintoma SET DEFAULT nextval('public.sintoma_id_sintoma_seq'::regclass);


--
-- Name: situacao id; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.situacao ALTER COLUMN id SET DEFAULT nextval('public.situacao_id_seq'::regclass);


--
-- Name: sono id_sono; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.sono ALTER COLUMN id_sono SET DEFAULT nextval('public.sono_id_sono_seq'::regclass);


--
-- Name: teste id; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.teste ALTER COLUMN id SET DEFAULT nextval('public.teste_id_seq'::regclass);


--
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- Name: alimentacao alimentacao_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.alimentacao
    ADD CONSTRAINT alimentacao_pkey PRIMARY KEY (id_alimentacao);


--
-- Name: apps_key apps_key_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.apps_key
    ADD CONSTRAINT apps_key_pkey PRIMARY KEY (app_key);


--
-- Name: atividade_fisica atividade_fisica_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.atividade_fisica
    ADD CONSTRAINT atividade_fisica_pkey PRIMARY KEY (id_atividade);


--
-- Name: bem_estar bem_estar_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.bem_estar
    ADD CONSTRAINT bem_estar_pkey PRIMARY KEY (id_atividade);


--
-- Name: contato contato_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.contato
    ADD CONSTRAINT contato_pkey PRIMARY KEY (id_contato);


--
-- Name: crise crise_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.crise
    ADD CONSTRAINT crise_pkey PRIMARY KEY (id_crise);


--
-- Name: dado_inicial dado_inicial_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.dado_inicial
    ADD CONSTRAINT dado_inicial_pkey PRIMARY KEY (id_dado_inicial);


--
-- Name: mural mural_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.mural
    ADD CONSTRAINT mural_pkey PRIMARY KEY (id_mural);


--
-- Name: semana semana_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.semana
    ADD CONSTRAINT semana_pkey PRIMARY KEY (id_semana);


--
-- Name: sessao sessao_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.sessao
    ADD CONSTRAINT sessao_pkey PRIMARY KEY (id_sessao);


--
-- Name: sintoma sintoma_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.sintoma
    ADD CONSTRAINT sintoma_pkey PRIMARY KEY (id_sintoma);


--
-- Name: situacao situacao_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.situacao
    ADD CONSTRAINT situacao_pkey PRIMARY KEY (id);


--
-- Name: sono sono_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.sono
    ADD CONSTRAINT sono_pkey PRIMARY KEY (id_sono);


--
-- Name: teste teste_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.teste
    ADD CONSTRAINT teste_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_cpf_key; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cpf_key UNIQUE (cpf);


--
-- Name: usuario usuario_crp_key; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_crp_key UNIQUE (crp);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: contato fk_id_usuario; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.contato
    ADD CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: alimentacao fk_semana_alimentacao; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.alimentacao
    ADD CONSTRAINT fk_semana_alimentacao FOREIGN KEY (semana_id) REFERENCES public.semana(id_semana);


--
-- Name: atividade_fisica fk_semana_atividade; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.atividade_fisica
    ADD CONSTRAINT fk_semana_atividade FOREIGN KEY (semana_id) REFERENCES public.semana(id_semana);


--
-- Name: bem_estar fk_semana_atividades0; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.bem_estar
    ADD CONSTRAINT fk_semana_atividades0 FOREIGN KEY (semana_id) REFERENCES public.semana(id_semana);


--
-- Name: sono fk_semana_sono; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.sono
    ADD CONSTRAINT fk_semana_sono FOREIGN KEY (semana_id) REFERENCES public.semana(id_semana);


--
-- Name: apps_key fk_usuario_app_keys; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.apps_key
    ADD CONSTRAINT fk_usuario_app_keys FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: crise fk_usuario_crise; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.crise
    ADD CONSTRAINT fk_usuario_crise FOREIGN KEY (usuario_id) REFERENCES public.usuario(id_usuario);


--
-- Name: dado_inicial fk_usuario_dados; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.dado_inicial
    ADD CONSTRAINT fk_usuario_dados FOREIGN KEY (usuario_id) REFERENCES public.usuario(id_usuario);


--
-- Name: semana fk_usuario_semana; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.semana
    ADD CONSTRAINT fk_usuario_semana FOREIGN KEY (usuario_id) REFERENCES public.usuario(id_usuario);


--
-- Name: situacao fk_usuario_situacao; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.situacao
    ADD CONSTRAINT fk_usuario_situacao FOREIGN KEY (usuario_id) REFERENCES public.usuario(id_usuario);


--
-- Name: mural mural_usu_paciente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.mural
    ADD CONSTRAINT mural_usu_paciente_fkey FOREIGN KEY (usu_paciente) REFERENCES public.usuario(id_usuario);


--
-- Name: mural mural_usu_prof_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.mural
    ADD CONSTRAINT mural_usu_prof_fkey FOREIGN KEY (usu_prof) REFERENCES public.usuario(id_usuario);


--
-- Name: notificacao notificacao_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.notificacao
    ADD CONSTRAINT notificacao_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.usuario(id_usuario);


--
-- Name: sessao sessao_profissional_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.sessao
    ADD CONSTRAINT sessao_profissional_id_fkey FOREIGN KEY (profissional_id) REFERENCES public.usuario(id_usuario);


--
-- Name: sessao sessao_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mudadmin
--

ALTER TABLE ONLY public.sessao
    ADD CONSTRAINT sessao_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id_usuario);


--
-- PostgreSQL database dump complete
--

