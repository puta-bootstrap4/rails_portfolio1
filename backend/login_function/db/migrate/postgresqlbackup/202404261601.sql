--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 14.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: kawanokatsuyuki
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.ar_internal_metadata OWNER TO kawanokatsuyuki;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: kawanokatsuyuki
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO kawanokatsuyuki;

--
-- Name: users; Type: TABLE; Schema: public; Owner: kawanokatsuyuki
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying,
    email character varying,
    password_digest character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    refresh_token_expires_at timestamp(6) without time zone,
    refresh_token character varying
);


ALTER TABLE public.users OWNER TO kawanokatsuyuki;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: kawanokatsuyuki
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO kawanokatsuyuki;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kawanokatsuyuki
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: kawanokatsuyuki
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: kawanokatsuyuki
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	development	2024-03-20 11:43:02.079536	2024-03-20 11:43:02.079538
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: kawanokatsuyuki
--

COPY public.schema_migrations (version) FROM stdin;
20240320114219
20240321020229
20240321020242
20240424004529
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kawanokatsuyuki
--

COPY public.users (id, name, email, password_digest, created_at, updated_at, refresh_token_expires_at, refresh_token) FROM stdin;
1	test update	test@mail.com	$2a$12$4TrH2JIpwG0SQ1J4jfomguWGhZk2GUymAop69XYujyTjJbussPqDO	2024-03-20 21:58:19.339922	2024-04-22 08:42:08.146309	2024-04-23 08:42:08.145945	87aca633eb91b538a0f3db768195dc358c04be8a
2	q	q@q	$2a$12$sCDja3X.KKWSFly.1h9DQu8TJddlNLr../GlAKCbHtvv92QbLbM5C	2024-04-23 03:40:37.639904	2024-04-23 03:40:37.655192	2024-04-24 03:40:37.655083	0e3e4bc7a56fe729951c6d04d5e02a52f0837e46
3	a	a@a	$2a$12$aJVElQ8v46nHPaL3n/mt3.tm5DgT.Gxx.VVZIGcPCYAyg1oGDiAue	2024-04-24 00:30:02.685182	2024-04-24 00:30:02.690294	2024-04-25 00:30:02.69019	538b4a80900989d49330fb15705a16e01b95a88c
5	a	a@aa	$2a$12$A5XoJd.ec6jOGjNtniOEN.s6co1IzBmeU57yNZXbPELvv0djkWm/i	2024-04-24 01:02:07.144597	2024-04-24 01:02:07.153442	2024-04-25 01:02:07.147218	3fdbc52522dddcca5aa0ef83e57a453d56adecb3
6	あ	a@aaaa	$2a$12$0gfF9WTk7TzKD5VdDhP4JuOF4jvviViEKpVUn8ycHbHgKd1lRxTwW	2024-04-24 01:05:14.397096	2024-04-24 01:05:14.401253	2024-04-25 01:05:14.401114	4ec2393cc6863de08bc2563c6d3f23b98428fe5f
7	a	b@b	$2a$12$o.b0f3EHEQer8zO8k8UyAunWqrqm5XpJVi8jFVal2CKdX/i1t4jW.	2024-04-24 04:44:00.306943	2024-04-24 04:44:00.309367	2024-04-25 04:44:00.309203	ae4ebb9fd86919265a8b6b4396a7235a54b13a32
8	hoge	hoge@hoge	$2a$12$jKtA9xef51X0deAqeSjYROFF0pXaOvbwh8sQz631xHhXlpxkCjME2	2024-04-24 05:04:52.757914	2024-04-24 05:04:52.766043	2024-04-25 05:04:52.762001	71cc0f4eebde395cf181addc2c04f5d12be5662c
9	b	c@c	$2a$12$3Yp0aS8IXO0.tuztqBwvVeKHoURBefTLHoPj/I4EJMmzhEZfx4nAy	2024-04-24 05:33:30.091231	2024-04-24 05:33:30.094256	2024-04-25 05:33:30.094154	8210cdefbd208427108d4e4f543b62160e401e6c
10	hoge	aho@aho	$2a$12$BZF3Cd6aZ7TQBg6pVMMqk.CdbMnpe46RCuwReJNSxlj5gXHXmfdlK	2024-04-24 08:49:00.864141	2024-04-24 08:49:00.868494	2024-04-25 08:49:00.868381	d62f1d07cbbd46f8f6c091185b6c96d1a5ba698c
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kawanokatsuyuki
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: kawanokatsuyuki
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: kawanokatsuyuki
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: kawanokatsuyuki
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: kawanokatsuyuki
--

CREATE UNIQUE INDEX index_users_on_email ON public.users USING btree (email);


--
-- PostgreSQL database dump complete
--

