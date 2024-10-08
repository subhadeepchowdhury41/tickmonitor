toc.dat                                                                                             0000600 0004000 0002000 00000063257 14664755225 0014474 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       &                |            tickmonitor-db    16.3    16.3 K    w           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         x           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         z           1262    198510    tickmonitor-db    DATABASE     �   CREATE DATABASE "tickmonitor-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
     DROP DATABASE "tickmonitor-db";
                postgres    false                     3079    198511 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false         {           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2         v           1247    223010    task_interval_enum    TYPE     v   CREATE TYPE public.task_interval_enum AS ENUM (
    'none',
    'daily',
    'weekly',
    'monthly',
    'annual'
);
 %   DROP TYPE public.task_interval_enum;
       public          postgres    false         p           1247    222991    task_status_enum    TYPE     v   CREATE TYPE public.task_status_enum AS ENUM (
    'to_initiate',
    'in_progress',
    'completed',
    'on_hold'
);
 #   DROP TYPE public.task_status_enum;
       public          postgres    false         s           1247    223000    task_urgency_enum    TYPE     f   CREATE TYPE public.task_urgency_enum AS ENUM (
    'low',
    'medium',
    'high',
    'critical'
);
 $   DROP TYPE public.task_urgency_enum;
       public          postgres    false         j           1247    222978    task_user_role_enum    TYPE     G   CREATE TYPE public.task_user_role_enum AS ENUM (
    'to',
    'cc'
);
 &   DROP TYPE public.task_user_role_enum;
       public          postgres    false         �            1259    223045    attatchment    TABLE       CREATE TABLE public.attatchment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    field character varying NOT NULL,
    url character varying NOT NULL,
    "userId" uuid,
    "taskId" uuid,
    "commentId" uuid
);
    DROP TABLE public.attatchment;
       public         heap    postgres    false    2         �            1259    223036    comment    TABLE     �   CREATE TABLE public.comment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "taskId" uuid
);
    DROP TABLE public.comment;
       public         heap    postgres    false    2         �            1259    222958    domain    TABLE     J  CREATE TABLE public.domain (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "domainUrl" character varying NOT NULL,
    details json DEFAULT '{}'::json NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    "domainId" character varying NOT NULL,
    "domainName" character varying NOT NULL,
    "parentDomainId" uuid
);
    DROP TABLE public.domain;
       public         heap    postgres    false    2         �            1259    223064    domain_users    TABLE     _   CREATE TABLE public.domain_users (
    "domainId" uuid NOT NULL,
    "userId" uuid NOT NULL
);
     DROP TABLE public.domain_users;
       public         heap    postgres    false         �            1259    222950    role    TABLE     �   CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL,
    type character varying NOT NULL,
    "domainId" uuid,
    "userId" uuid
);
    DROP TABLE public.role;
       public         heap    postgres    false         �            1259    222949    role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.role_id_seq;
       public          postgres    false    218         |           0    0    role_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;
          public          postgres    false    217         �            1259    223021    task    TABLE     N  CREATE TABLE public.task (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "dueDate" timestamp without time zone NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    status public.task_status_enum DEFAULT 'to_initiate'::public.task_status_enum NOT NULL,
    urgency public.task_urgency_enum DEFAULT 'low'::public.task_urgency_enum NOT NULL,
    "interval" public.task_interval_enum DEFAULT 'none'::public.task_interval_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "parentTaskId" uuid,
    "assignedById" uuid,
    "dependencyOfId" uuid
);
    DROP TABLE public.task;
       public         heap    postgres    false    2    880    883    886    886    880    883         �            1259    223071    task-vertex    TABLE     `   CREATE TABLE public."task-vertex" (
    "taskId" uuid NOT NULL,
    "vertexId" uuid NOT NULL
);
 !   DROP TABLE public."task-vertex";
       public         heap    postgres    false         �            1259    222983 	   task_user    TABLE     �   CREATE TABLE public.task_user (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role public.task_user_role_enum DEFAULT 'to'::public.task_user_role_enum NOT NULL,
    "userId" uuid,
    "taskId" uuid
);
    DROP TABLE public.task_user;
       public         heap    postgres    false    2    874    874         �            1259    222940    tasklog    TABLE     o  CREATE TABLE public.tasklog (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    status character varying NOT NULL,
    description character varying,
    "taskId" uuid,
    "userId" uuid,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.tasklog;
       public         heap    postgres    false    2         �            1259    223053    user    TABLE     �  CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "isEmailVerified" boolean DEFAULT false NOT NULL,
    name character varying,
    phone character varying,
    department character varying,
    company character varying,
    "refreshToken" character varying,
    "tasksAssignedByMeId" uuid
);
    DROP TABLE public."user";
       public         heap    postgres    false    2         �            1259    222968    vertex    TABLE     �   CREATE TABLE public.vertex (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    "parentVertexId" uuid,
    "taskId" uuid,
    "domainId" uuid
);
    DROP TABLE public.vertex;
       public         heap    postgres    false    2         �           2604    222953    role id    DEFAULT     b   ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);
 6   ALTER TABLE public.role ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218         q          0    223045    attatchment 
   TABLE DATA           \   COPY public.attatchment (id, name, field, url, "userId", "taskId", "commentId") FROM stdin;
    public          postgres    false    224       4977.dat p          0    223036    comment 
   TABLE DATA           O   COPY public.comment (id, content, "createdAt", "userId", "taskId") FROM stdin;
    public          postgres    false    223       4976.dat l          0    222958    domain 
   TABLE DATA           m   COPY public.domain (id, "domainUrl", details, level, "domainId", "domainName", "parentDomainId") FROM stdin;
    public          postgres    false    219       4972.dat s          0    223064    domain_users 
   TABLE DATA           <   COPY public.domain_users ("domainId", "userId") FROM stdin;
    public          postgres    false    226       4979.dat k          0    222950    role 
   TABLE DATA           D   COPY public.role (id, name, type, "domainId", "userId") FROM stdin;
    public          postgres    false    218       4971.dat o          0    223021    task 
   TABLE DATA           �   COPY public.task (id, title, description, "startDate", "dueDate", "isCompleted", level, status, urgency, "interval", "createdAt", "updatedAt", "parentTaskId", "assignedById", "dependencyOfId") FROM stdin;
    public          postgres    false    222       4975.dat t          0    223071    task-vertex 
   TABLE DATA           =   COPY public."task-vertex" ("taskId", "vertexId") FROM stdin;
    public          postgres    false    227       4980.dat n          0    222983 	   task_user 
   TABLE DATA           A   COPY public.task_user (id, role, "userId", "taskId") FROM stdin;
    public          postgres    false    221       4974.dat i          0    222940    tasklog 
   TABLE DATA           h   COPY public.tasklog (id, title, date, status, description, "taskId", "userId", "createdAt") FROM stdin;
    public          postgres    false    216       4969.dat r          0    223053    user 
   TABLE DATA           �   COPY public."user" (id, email, password, "isEmailVerified", name, phone, department, company, "refreshToken", "tasksAssignedByMeId") FROM stdin;
    public          postgres    false    225       4978.dat m          0    222968    vertex 
   TABLE DATA           Y   COPY public.vertex (id, name, level, "parentVertexId", "taskId", "domainId") FROM stdin;
    public          postgres    false    220       4973.dat }           0    0    role_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.role_id_seq', 1, false);
          public          postgres    false    217         �           2606    223044 &   comment PK_0b0e4bbc8415ec426f87f3a88e2 
   CONSTRAINT     f   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.comment DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2";
       public            postgres    false    223         �           2606    222967 %   domain PK_27e3ec3ea0ae02c8c5bceab3ba9 
   CONSTRAINT     e   ALTER TABLE ONLY public.domain
    ADD CONSTRAINT "PK_27e3ec3ea0ae02c8c5bceab3ba9" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.domain DROP CONSTRAINT "PK_27e3ec3ea0ae02c8c5bceab3ba9";
       public            postgres    false    219         �           2606    222989 (   task_user PK_6ea2c1c13f01b7a383ebbeaebb0 
   CONSTRAINT     h   ALTER TABLE ONLY public.task_user
    ADD CONSTRAINT "PK_6ea2c1c13f01b7a383ebbeaebb0" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.task_user DROP CONSTRAINT "PK_6ea2c1c13f01b7a383ebbeaebb0";
       public            postgres    false    221         �           2606    223052 *   attatchment PK_791175f20c2166c5bf9f962b364 
   CONSTRAINT     j   ALTER TABLE ONLY public.attatchment
    ADD CONSTRAINT "PK_791175f20c2166c5bf9f962b364" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.attatchment DROP CONSTRAINT "PK_791175f20c2166c5bf9f962b364";
       public            postgres    false    224         �           2606    223068 +   domain_users PK_a948e72f5e967a7237a27c381d4 
   CONSTRAINT     }   ALTER TABLE ONLY public.domain_users
    ADD CONSTRAINT "PK_a948e72f5e967a7237a27c381d4" PRIMARY KEY ("domainId", "userId");
 W   ALTER TABLE ONLY public.domain_users DROP CONSTRAINT "PK_a948e72f5e967a7237a27c381d4";
       public            postgres    false    226    226         �           2606    222957 #   role PK_b36bcfe02fc8de3c57a8b2391c2 
   CONSTRAINT     c   ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.role DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2";
       public            postgres    false    218         �           2606    222976 %   vertex PK_c8ba7ae73ad81b9f3991ad76684 
   CONSTRAINT     e   ALTER TABLE ONLY public.vertex
    ADD CONSTRAINT "PK_c8ba7ae73ad81b9f3991ad76684" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.vertex DROP CONSTRAINT "PK_c8ba7ae73ad81b9f3991ad76684";
       public            postgres    false    220         �           2606    223061 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    225         �           2606    223075 *   task-vertex PK_d75e01e4c240869a9ec84a52b6f 
   CONSTRAINT     ~   ALTER TABLE ONLY public."task-vertex"
    ADD CONSTRAINT "PK_d75e01e4c240869a9ec84a52b6f" PRIMARY KEY ("taskId", "vertexId");
 X   ALTER TABLE ONLY public."task-vertex" DROP CONSTRAINT "PK_d75e01e4c240869a9ec84a52b6f";
       public            postgres    false    227    227         �           2606    222948 &   tasklog PK_e4b8e18f38769d0503b45250e0b 
   CONSTRAINT     f   ALTER TABLE ONLY public.tasklog
    ADD CONSTRAINT "PK_e4b8e18f38769d0503b45250e0b" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.tasklog DROP CONSTRAINT "PK_e4b8e18f38769d0503b45250e0b";
       public            postgres    false    216         �           2606    223035 #   task PK_fb213f79ee45060ba925ecd576e 
   CONSTRAINT     c   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.task DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e";
       public            postgres    false    222         �           2606    223063 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public            postgres    false    225         �           1259    223076    IDX_3c134205aae5a74ad661cbe337    INDEX     ^   CREATE INDEX "IDX_3c134205aae5a74ad661cbe337" ON public."task-vertex" USING btree ("taskId");
 4   DROP INDEX public."IDX_3c134205aae5a74ad661cbe337";
       public            postgres    false    227         �           1259    223070    IDX_bd9f1fc00100cacd6731b360d4    INDEX     ]   CREATE INDEX "IDX_bd9f1fc00100cacd6731b360d4" ON public.domain_users USING btree ("userId");
 4   DROP INDEX public."IDX_bd9f1fc00100cacd6731b360d4";
       public            postgres    false    226         �           1259    223077    IDX_c6062f6eaead8029efa4c522da    INDEX     `   CREATE INDEX "IDX_c6062f6eaead8029efa4c522da" ON public."task-vertex" USING btree ("vertexId");
 4   DROP INDEX public."IDX_c6062f6eaead8029efa4c522da";
       public            postgres    false    227         �           1259    223069    IDX_d5e49bfa90d6b89c505bd1690f    INDEX     _   CREATE INDEX "IDX_d5e49bfa90d6b89c505bd1690f" ON public.domain_users USING btree ("domainId");
 4   DROP INDEX public."IDX_d5e49bfa90d6b89c505bd1690f";
       public            postgres    false    226         �           2606    223098 %   domain FK_004184e5dbe0a2977b1dcef5b41    FK CONSTRAINT     �   ALTER TABLE ONLY public.domain
    ADD CONSTRAINT "FK_004184e5dbe0a2977b1dcef5b41" FOREIGN KEY ("parentDomainId") REFERENCES public.domain(id);
 Q   ALTER TABLE ONLY public.domain DROP CONSTRAINT "FK_004184e5dbe0a2977b1dcef5b41";
       public          postgres    false    219    4780    219         �           2606    223163 *   attatchment FK_0715f3f008e0eb0b19319e185d8    FK CONSTRAINT     �   ALTER TABLE ONLY public.attatchment
    ADD CONSTRAINT "FK_0715f3f008e0eb0b19319e185d8" FOREIGN KEY ("commentId") REFERENCES public.comment(id);
 V   ALTER TABLE ONLY public.attatchment DROP CONSTRAINT "FK_0715f3f008e0eb0b19319e185d8";
       public          postgres    false    224    4788    223         �           2606    223118 (   task_user FK_0f500c19a4a119f22a82c9b3640    FK CONSTRAINT     �   ALTER TABLE ONLY public.task_user
    ADD CONSTRAINT "FK_0f500c19a4a119f22a82c9b3640" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 T   ALTER TABLE ONLY public.task_user DROP CONSTRAINT "FK_0f500c19a4a119f22a82c9b3640";
       public          postgres    false    221    4792    225         �           2606    239249 *   attatchment FK_16a3e1fd6e3a89922dcd9766bb6    FK CONSTRAINT     �   ALTER TABLE ONLY public.attatchment
    ADD CONSTRAINT "FK_16a3e1fd6e3a89922dcd9766bb6" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.attatchment DROP CONSTRAINT "FK_16a3e1fd6e3a89922dcd9766bb6";
       public          postgres    false    224    4786    222         �           2606    223183 *   task-vertex FK_3c134205aae5a74ad661cbe3374    FK CONSTRAINT     �   ALTER TABLE ONLY public."task-vertex"
    ADD CONSTRAINT "FK_3c134205aae5a74ad661cbe3374" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."task-vertex" DROP CONSTRAINT "FK_3c134205aae5a74ad661cbe3374";
       public          postgres    false    227    222    4786         �           2606    223093 #   role FK_3e02d32dd4707c91433de0390ea    FK CONSTRAINT     �   ALTER TABLE ONLY public.role
    ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 O   ALTER TABLE ONLY public.role DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea";
       public          postgres    false    218    225    4792         �           2606    223113 %   vertex FK_44f2b43b1c3a61b71256802d06a    FK CONSTRAINT     �   ALTER TABLE ONLY public.vertex
    ADD CONSTRAINT "FK_44f2b43b1c3a61b71256802d06a" FOREIGN KEY ("domainId") REFERENCES public.domain(id);
 Q   ALTER TABLE ONLY public.vertex DROP CONSTRAINT "FK_44f2b43b1c3a61b71256802d06a";
       public          postgres    false    220    4780    219         �           2606    223108 %   vertex FK_53482bc79969d161032b7474d7d    FK CONSTRAINT     �   ALTER TABLE ONLY public.vertex
    ADD CONSTRAINT "FK_53482bc79969d161032b7474d7d" FOREIGN KEY ("taskId") REFERENCES public.task(id);
 Q   ALTER TABLE ONLY public.vertex DROP CONSTRAINT "FK_53482bc79969d161032b7474d7d";
       public          postgres    false    220    4786    222         �           2606    223138 #   task FK_592f97031fc28581e69127bcb60    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_592f97031fc28581e69127bcb60" FOREIGN KEY ("dependencyOfId") REFERENCES public.task(id);
 O   ALTER TABLE ONLY public.task DROP CONSTRAINT "FK_592f97031fc28581e69127bcb60";
       public          postgres    false    4786    222    222         �           2606    223103 %   vertex FK_815d0c2e5fc20bbbfc06308f1ab    FK CONSTRAINT     �   ALTER TABLE ONLY public.vertex
    ADD CONSTRAINT "FK_815d0c2e5fc20bbbfc06308f1ab" FOREIGN KEY ("parentVertexId") REFERENCES public.vertex(id);
 Q   ALTER TABLE ONLY public.vertex DROP CONSTRAINT "FK_815d0c2e5fc20bbbfc06308f1ab";
       public          postgres    false    4782    220    220         �           2606    223128 #   task FK_8bf6d736c49d48d91691ea0dfe5    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_8bf6d736c49d48d91691ea0dfe5" FOREIGN KEY ("parentTaskId") REFERENCES public.task(id);
 O   ALTER TABLE ONLY public.task DROP CONSTRAINT "FK_8bf6d736c49d48d91691ea0dfe5";
       public          postgres    false    222    222    4786         �           2606    239244 &   comment FK_9fc19c95c33ef4d97d09b72ee95    FK CONSTRAINT     �   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.comment DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95";
       public          postgres    false    223    222    4786         �           2606    223078 &   tasklog FK_a2377eeb9bf457edf462d035c23    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasklog
    ADD CONSTRAINT "FK_a2377eeb9bf457edf462d035c23" FOREIGN KEY ("taskId") REFERENCES public.task(id);
 R   ALTER TABLE ONLY public.tasklog DROP CONSTRAINT "FK_a2377eeb9bf457edf462d035c23";
       public          postgres    false    4786    216    222         �           2606    223178 +   domain_users FK_bd9f1fc00100cacd6731b360d41    FK CONSTRAINT     �   ALTER TABLE ONLY public.domain_users
    ADD CONSTRAINT "FK_bd9f1fc00100cacd6731b360d41" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 W   ALTER TABLE ONLY public.domain_users DROP CONSTRAINT "FK_bd9f1fc00100cacd6731b360d41";
       public          postgres    false    226    225    4792         �           2606    223088 #   role FK_c01c7c15207c87156b4102d44dc    FK CONSTRAINT     �   ALTER TABLE ONLY public.role
    ADD CONSTRAINT "FK_c01c7c15207c87156b4102d44dc" FOREIGN KEY ("domainId") REFERENCES public.domain(id);
 O   ALTER TABLE ONLY public.role DROP CONSTRAINT "FK_c01c7c15207c87156b4102d44dc";
       public          postgres    false    218    4780    219         �           2606    223143 &   comment FK_c0354a9a009d3bb45a08655ce3b    FK CONSTRAINT     �   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 R   ALTER TABLE ONLY public.comment DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b";
       public          postgres    false    223    4792    225         �           2606    223153 *   attatchment FK_c36b3be58dd5c37469e11ad0ac2    FK CONSTRAINT     �   ALTER TABLE ONLY public.attatchment
    ADD CONSTRAINT "FK_c36b3be58dd5c37469e11ad0ac2" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 V   ALTER TABLE ONLY public.attatchment DROP CONSTRAINT "FK_c36b3be58dd5c37469e11ad0ac2";
       public          postgres    false    225    4792    224         �           2606    223168 #   user FK_c50ce8e615830ba865261537e03    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c50ce8e615830ba865261537e03" FOREIGN KEY ("tasksAssignedByMeId") REFERENCES public.task(id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_c50ce8e615830ba865261537e03";
       public          postgres    false    222    4786    225         �           2606    223188 *   task-vertex FK_c6062f6eaead8029efa4c522dab    FK CONSTRAINT     �   ALTER TABLE ONLY public."task-vertex"
    ADD CONSTRAINT "FK_c6062f6eaead8029efa4c522dab" FOREIGN KEY ("vertexId") REFERENCES public.vertex(id);
 X   ALTER TABLE ONLY public."task-vertex" DROP CONSTRAINT "FK_c6062f6eaead8029efa4c522dab";
       public          postgres    false    220    4782    227         �           2606    223173 +   domain_users FK_d5e49bfa90d6b89c505bd1690f9    FK CONSTRAINT     �   ALTER TABLE ONLY public.domain_users
    ADD CONSTRAINT "FK_d5e49bfa90d6b89c505bd1690f9" FOREIGN KEY ("domainId") REFERENCES public.domain(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.domain_users DROP CONSTRAINT "FK_d5e49bfa90d6b89c505bd1690f9";
       public          postgres    false    226    4780    219         �           2606    223133 #   task FK_d67cd7c5e34f48cf33be802898a    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_d67cd7c5e34f48cf33be802898a" FOREIGN KEY ("assignedById") REFERENCES public."user"(id);
 O   ALTER TABLE ONLY public.task DROP CONSTRAINT "FK_d67cd7c5e34f48cf33be802898a";
       public          postgres    false    222    225    4792         �           2606    223083 &   tasklog FK_e9255a6d15a050278bd23247798    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasklog
    ADD CONSTRAINT "FK_e9255a6d15a050278bd23247798" FOREIGN KEY ("userId") REFERENCES public."user"(id);
 R   ALTER TABLE ONLY public.tasklog DROP CONSTRAINT "FK_e9255a6d15a050278bd23247798";
       public          postgres    false    216    4792    225         �           2606    231052 (   task_user FK_ff099dc6756bfef736ebe18ea9a    FK CONSTRAINT     �   ALTER TABLE ONLY public.task_user
    ADD CONSTRAINT "FK_ff099dc6756bfef736ebe18ea9a" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.task_user DROP CONSTRAINT "FK_ff099dc6756bfef736ebe18ea9a";
       public          postgres    false    4786    221    222                                                                                                                                                                                                                                                                                                                                                         4977.dat                                                                                            0000600 0004000 0002000 00000003164 14664755225 0014310 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        e4195ddf-7119-4eb5-bcf2-38716f27d98d	1723540663256-resume.pdf	1723614984673-1723540663256-resume.pdf	https://tickmonitor-upload.s3.ap-south-1.amazonaws.com/1723614984673-1723540663256-resume.pdf	c49db94b-6523-4377-9692-d65509d6370d	52f23f34-3ee2-4ec9-b815-909ea03c907c	485eaaf6-cc24-42ed-81b9-4d078e3f5303
748f698a-3521-4607-a429-5d2d55bcd24b	ca.pem	1723644560794-ca.pem	https://tickmonitor-upload.s3.ap-south-1.amazonaws.com/1723644560794-ca.pem	c49db94b-6523-4377-9692-d65509d6370d	52f23f34-3ee2-4ec9-b815-909ea03c907c	485eaaf6-cc24-42ed-81b9-4d078e3f5303
1d759d2d-2a2a-43f2-a775-10d7f062795a	resume.pdf	1723860944029-resume.pdf	https://tickmonitor-upload.s3.ap-south-1.amazonaws.com/1723860944029-resume.pdf	c49db94b-6523-4377-9692-d65509d6370d	c0b4b46e-9fba-46ff-bccb-a9df0dcf91da	485eaaf6-cc24-42ed-81b9-4d078e3f5303
5a4e7958-c97f-4b57-ba6e-b266f5a263a3	Book.xlsx	1723861033820-Book.xlsx	https://tickmonitor-upload.s3.ap-south-1.amazonaws.com/1723861033820-Book.xlsx	c49db94b-6523-4377-9692-d65509d6370d	c0b4b46e-9fba-46ff-bccb-a9df0dcf91da	485eaaf6-cc24-42ed-81b9-4d078e3f5303
f2a6a895-d190-4903-bdb7-2be9f81c11a6	resume-code-15-08-2024.txt	1724987683228-resume-code-15-08-2024.txt	https://tickmonitor-upload.s3.ap-south-1.amazonaws.com/1724987683228-resume-code-15-08-2024.txt	c49db94b-6523-4377-9692-d65509d6370d	ecfb2563-f46a-4895-b5db-50324cacb012	485eaaf6-cc24-42ed-81b9-4d078e3f5303
1a11029b-cf7b-45bd-a3e0-d85883f9ac86	ca.pem	1724987750729-ca.pem	https://tickmonitor-upload.s3.ap-south-1.amazonaws.com/1724987750729-ca.pem	c49db94b-6523-4377-9692-d65509d6370d	d419a036-b77a-46e7-b484-e1a4af15556b	485eaaf6-cc24-42ed-81b9-4d078e3f5303
\.


                                                                                                                                                                                                                                                                                                                                                                                                            4976.dat                                                                                            0000600 0004000 0002000 00000003126 14664755225 0014305 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        485eaaf6-cc24-42ed-81b9-4d078e3f5303	Let's finish this task soon.	2024-08-12 17:36:57.449468	c49db94b-6523-4377-9692-d65509d6370d	52f23f34-3ee2-4ec9-b815-909ea03c907c
e366b5fb-a5aa-42a7-a6ad-6da33c1f48da	Hi 😊	2024-08-17 07:21:54.106545	c49db94b-6523-4377-9692-d65509d6370d	ecfb2563-f46a-4895-b5db-50324cacb012
31dd9cca-64f1-4192-a052-48b23961778d	This is comment to this subtask.	2024-08-17 07:27:14.756738	c49db94b-6523-4377-9692-d65509d6370d	ecfb2563-f46a-4895-b5db-50324cacb012
2ddffee6-2ca8-4d26-8c57-26b7022ffa52	Hello	2024-08-17 07:30:54.19082	c49db94b-6523-4377-9692-d65509d6370d	d419a036-b77a-46e7-b484-e1a4af15556b
6a736894-0e91-41fa-b07f-f9fe1586134a	We need to finsh this subtask soon. There's a deadline approaching for this task.	2024-08-17 07:36:47.059251	c49db94b-6523-4377-9692-d65509d6370d	d419a036-b77a-46e7-b484-e1a4af15556b
f67875fa-038d-443d-8b9b-1e53fd483c92	Let's finsh this too.	2024-08-17 07:39:58.886238	c49db94b-6523-4377-9692-d65509d6370d	2201e89a-983b-4c08-9da7-46477c4e28fe
55485b8f-9ac3-4bad-8ac0-05b50a7e2c13	Starting this task.	2024-08-17 07:44:43.183653	c49db94b-6523-4377-9692-d65509d6370d	c0b4b46e-9fba-46ff-bccb-a9df0dcf91da
d0ed510e-c904-48f0-8113-8601d21a47e5	Soumalya joined.	2024-08-19 16:31:04.594307	c49db94b-6523-4377-9692-d65509d6370d	ecfb2563-f46a-4895-b5db-50324cacb012
aaa4b747-c785-45d0-b9a7-a2d1fdfe7638	Scroll hoga	2024-08-19 16:31:32.158525	c49db94b-6523-4377-9692-d65509d6370d	ecfb2563-f46a-4895-b5db-50324cacb012
c33792fa-bf2a-4e51-9351-819d3fa5a120	Aab hoga	2024-08-19 16:31:38.956225	c49db94b-6523-4377-9692-d65509d6370d	ecfb2563-f46a-4895-b5db-50324cacb012
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                          4972.dat                                                                                            0000600 0004000 0002000 00000000265 14664755225 0014302 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b	adityabirla.com	{}	0	OAB	Office of Ananya Birla	\N
8fe14944-74b0-4c87-86a6-1f493ff705e2	adityabirla.com	{}	0	Grasim	Grasim Aditya Birla	\N
\.


                                                                                                                                                                                                                                                                                                                                           4979.dat                                                                                            0000600 0004000 0002000 00000000567 14664755225 0014316 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b	c49db94b-6523-4377-9692-d65509d6370d
b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b	bb9ffa35-30e4-4f21-b67c-a372867de2f5
b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b	40733301-e32e-4029-b5d9-231610d583f0
b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b	5e7951b7-8870-40a6-ab8f-e0e00ebd5909
b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b	5ccb3dc9-67be-4877-90af-41f733b5fe12
\.


                                                                                                                                         4971.dat                                                                                            0000600 0004000 0002000 00000000005 14664755225 0014271 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4975.dat                                                                                            0000600 0004000 0002000 00000006033 14664755225 0014304 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        845a705e-e98e-42af-8e4b-c4e99a22302d	This is a test task	This task will check if every task will have project verticals.	2024-08-14 00:00:00	2024-08-31 00:00:00	f	0	to_initiate	medium	none	2024-08-14 19:47:31.12089	2024-08-14 19:47:31.12089	\N	c49db94b-6523-4377-9692-d65509d6370d	\N
0cb333a9-4b70-4bcd-8213-cd5a26283136	Hi	Bye!	2024-08-12 00:00:00	2024-08-12 00:00:00	f	1	completed	critical	none	2024-08-20 21:55:49.095037	2024-08-20 22:41:07.092874	13c33cdf-f8e9-48b8-9c59-fcdb1598ae9e	c49db94b-6523-4377-9692-d65509d6370d	\N
2201e89a-983b-4c08-9da7-46477c4e28fe	This is a new subtask.	This is to confirm if subtask adding feature is working.	2024-08-12 00:00:00	2024-08-15 00:00:00	f	1	on_hold	medium	none	2024-08-16 10:18:03.871424	2024-08-25 19:49:12.108616	ecfb2563-f46a-4895-b5db-50324cacb012	c49db94b-6523-4377-9692-d65509d6370d	\N
cf896497-ac10-4b3b-8b3f-53ec52f183b6	Finish task module	This module needs to be finished soon.	2024-08-16 00:00:00	2024-08-29 00:00:00	f	0	to_initiate	critical	none	2024-08-16 20:38:47.631891	2024-08-16 20:38:47.631891	\N	c49db94b-6523-4377-9692-d65509d6370d	\N
ecfb2563-f46a-4895-b5db-50324cacb012	This is a new Task	This Task is to check the API	2024-08-12 01:40:05.32	2024-08-12 01:40:05.32	f	0	in_progress	low	none	2024-08-12 01:40:05.323275	2024-08-30 08:46:23.833398	\N	c49db94b-6523-4377-9692-d65509d6370d	\N
c0b4b46e-9fba-46ff-bccb-a9df0dcf91da	This is a subtask for Siddharth	This is to test that task is only assigned to Siddharth.	2024-08-12 00:00:00	2024-08-17 00:00:00	f	1	completed	low	none	2024-08-16 20:06:49.438232	2024-08-17 15:49:42.491998	52f23f34-3ee2-4ec9-b815-909ea03c907c	c49db94b-6523-4377-9692-d65509d6370d	\N
d419a036-b77a-46e7-b484-e1a4af15556b	This is a new subtask.	This is to ensure that subtask adding feature is working properly.	2024-08-12 00:00:00	2024-08-15 00:00:00	f	1	completed	medium	none	2024-08-16 10:17:08.226498	2024-08-17 15:50:35.843727	ecfb2563-f46a-4895-b5db-50324cacb012	c49db94b-6523-4377-9692-d65509d6370d	\N
13c33cdf-f8e9-48b8-9c59-fcdb1598ae9e	This is a new Task	This Task is to check the API	2024-08-12 01:40:05.321	2024-08-12 01:40:05.321	f	0	in_progress	low	none	2024-08-12 01:40:05.323953	2024-08-19 18:15:10.575853	\N	c49db94b-6523-4377-9692-d65509d6370d	\N
52f23f34-3ee2-4ec9-b815-909ea03c907c	Build Popup for Task Creation.	Create a pop up for task creation. Coming to a new screen for task creation is unnecessary.	2024-08-12 00:00:00	2024-08-17 00:00:00	f	0	in_progress	critical	none	2024-08-12 13:14:36.838962	2024-08-13 08:15:50.980612	\N	c49db94b-6523-4377-9692-d65509d6370d	\N
4cd6d2ff-9467-41c4-971d-1fa66e5c7ecb	Go to Kolkata	Visit pagli	2024-08-20 00:00:00	2024-08-21 00:00:00	f	0	to_initiate	medium	none	2024-08-20 22:11:17.818094	2024-08-20 22:11:17.818094	\N	c49db94b-6523-4377-9692-d65509d6370d	\N
44d48eff-145d-4126-8008-5862b1b8ee68	Take bus	Wake up at 5:30 AM and go to bus stop.	2024-08-20 00:00:00	2024-08-21 00:00:00	f	1	to_initiate	medium	none	2024-08-20 22:12:35.45943	2024-08-20 22:12:35.513296	4cd6d2ff-9467-41c4-971d-1fa66e5c7ecb	c49db94b-6523-4377-9692-d65509d6370d	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     4980.dat                                                                                            0000600 0004000 0002000 00000002245 14664755225 0014301 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        ecfb2563-f46a-4895-b5db-50324cacb012	860ca63c-89b8-459f-8e2b-3b047332fd1d
ecfb2563-f46a-4895-b5db-50324cacb012	7ab240d9-7b29-45cd-818e-8a4594637b86
13c33cdf-f8e9-48b8-9c59-fcdb1598ae9e	8785e4e2-aae2-4241-b9cf-e7af277dfbad
13c33cdf-f8e9-48b8-9c59-fcdb1598ae9e	7ab240d9-7b29-45cd-818e-8a4594637b86
52f23f34-3ee2-4ec9-b815-909ea03c907c	8785e4e2-aae2-4241-b9cf-e7af277dfbad
845a705e-e98e-42af-8e4b-c4e99a22302d	7ab240d9-7b29-45cd-818e-8a4594637b86
d419a036-b77a-46e7-b484-e1a4af15556b	7ab240d9-7b29-45cd-818e-8a4594637b86
d419a036-b77a-46e7-b484-e1a4af15556b	860ca63c-89b8-459f-8e2b-3b047332fd1d
2201e89a-983b-4c08-9da7-46477c4e28fe	7ab240d9-7b29-45cd-818e-8a4594637b86
2201e89a-983b-4c08-9da7-46477c4e28fe	860ca63c-89b8-459f-8e2b-3b047332fd1d
c0b4b46e-9fba-46ff-bccb-a9df0dcf91da	8785e4e2-aae2-4241-b9cf-e7af277dfbad
cf896497-ac10-4b3b-8b3f-53ec52f183b6	8785e4e2-aae2-4241-b9cf-e7af277dfbad
0cb333a9-4b70-4bcd-8213-cd5a26283136	7ab240d9-7b29-45cd-818e-8a4594637b86
0cb333a9-4b70-4bcd-8213-cd5a26283136	8785e4e2-aae2-4241-b9cf-e7af277dfbad
4cd6d2ff-9467-41c4-971d-1fa66e5c7ecb	7ab240d9-7b29-45cd-818e-8a4594637b86
44d48eff-145d-4126-8008-5862b1b8ee68	7ab240d9-7b29-45cd-818e-8a4594637b86
\.


                                                                                                                                                                                                                                                                                                                                                           4974.dat                                                                                            0000600 0004000 0002000 00000004173 14664755225 0014306 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1cef0f08-8c67-46c9-9c85-b14fe1e4505b	cc	40733301-e32e-4029-b5d9-231610d583f0	ecfb2563-f46a-4895-b5db-50324cacb012
b2ab6f77-5938-4846-88ca-e2dd5a6f79a4	cc	40733301-e32e-4029-b5d9-231610d583f0	13c33cdf-f8e9-48b8-9c59-fcdb1598ae9e
fe04969c-bfc0-4ffa-8e67-e4e230466acf	to	bb9ffa35-30e4-4f21-b67c-a372867de2f5	52f23f34-3ee2-4ec9-b815-909ea03c907c
8fceeec9-203d-44e6-8df7-9611b2f32f15	cc	40733301-e32e-4029-b5d9-231610d583f0	52f23f34-3ee2-4ec9-b815-909ea03c907c
0418fa9b-e9d9-465b-91bf-1a42ed1fa3e2	cc	5ccb3dc9-67be-4877-90af-41f733b5fe12	52f23f34-3ee2-4ec9-b815-909ea03c907c
88c8381a-1cc8-4695-9590-6c2470a469b4	to	40733301-e32e-4029-b5d9-231610d583f0	845a705e-e98e-42af-8e4b-c4e99a22302d
0391bae7-25fa-4014-aea5-7485850b9f1d	cc	5ccb3dc9-67be-4877-90af-41f733b5fe12	845a705e-e98e-42af-8e4b-c4e99a22302d
1c998aa4-31f4-4609-be95-816d46839c4a	cc	40733301-e32e-4029-b5d9-231610d583f0	d419a036-b77a-46e7-b484-e1a4af15556b
0f0e4574-95aa-4d90-b4ff-2e22b4f51e0e	cc	40733301-e32e-4029-b5d9-231610d583f0	2201e89a-983b-4c08-9da7-46477c4e28fe
2e25d374-3252-468a-bb60-da60f31f5e8f	cc	bb9ffa35-30e4-4f21-b67c-a372867de2f5	c0b4b46e-9fba-46ff-bccb-a9df0dcf91da
54ba2797-1b07-416a-8adb-c7d23236c3d5	to	40733301-e32e-4029-b5d9-231610d583f0	cf896497-ac10-4b3b-8b3f-53ec52f183b6
b955631d-23b8-4928-913b-d4650b705ed0	cc	5ccb3dc9-67be-4877-90af-41f733b5fe12	cf896497-ac10-4b3b-8b3f-53ec52f183b6
9ba5c495-3eb5-43fa-ba75-d4f84f68449d	cc	5e7951b7-8870-40a6-ab8f-e0e00ebd5909	cf896497-ac10-4b3b-8b3f-53ec52f183b6
194847e4-aeb9-42cb-891c-9ebe49f9e2dd	cc	40733301-e32e-4029-b5d9-231610d583f0	0cb333a9-4b70-4bcd-8213-cd5a26283136
de6ab75b-20b2-4e09-ba74-c1dcfc91d7bb	to	c49db94b-6523-4377-9692-d65509d6370d	4cd6d2ff-9467-41c4-971d-1fa66e5c7ecb
3486fea1-5ec8-4305-b236-792225a4f4a0	cc	5e7951b7-8870-40a6-ab8f-e0e00ebd5909	4cd6d2ff-9467-41c4-971d-1fa66e5c7ecb
47e04524-5dbf-4085-99e4-13f92d4a4801	cc	bb9ffa35-30e4-4f21-b67c-a372867de2f5	4cd6d2ff-9467-41c4-971d-1fa66e5c7ecb
bb252793-8e3e-4943-8b54-376cfc86ce78	cc	c49db94b-6523-4377-9692-d65509d6370d	44d48eff-145d-4126-8008-5862b1b8ee68
54d1d0aa-911f-44b7-b0bb-970a37773aa2	cc	5e7951b7-8870-40a6-ab8f-e0e00ebd5909	44d48eff-145d-4126-8008-5862b1b8ee68
\.


                                                                                                                                                                                                                                                                                                                                                                                                     4969.dat                                                                                            0000600 0004000 0002000 00000001321 14664755225 0014302 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        a80ef184-5cbc-4c27-80b6-fcad0ab8126f		2024-08-29 18:34:52.512834	completed	\N	ecfb2563-f46a-4895-b5db-50324cacb012	c49db94b-6523-4377-9692-d65509d6370d	2024-08-29 18:34:52.512834
b8a083ba-3632-4e87-a214-27f15897adf8		2024-08-29 18:34:59.002156	in_progress	\N	ecfb2563-f46a-4895-b5db-50324cacb012	c49db94b-6523-4377-9692-d65509d6370d	2024-08-29 18:34:59.002156
ebe9392b-49a0-46f7-bd7f-8123c3c8001e		2024-08-29 18:58:46.94238	completed	\N	ecfb2563-f46a-4895-b5db-50324cacb012	c49db94b-6523-4377-9692-d65509d6370d	2024-08-29 18:58:46.94238
cff02a95-b47f-4f9c-bedb-ffe9df2746ae		2024-08-30 08:46:23.84642	in_progress	\N	ecfb2563-f46a-4895-b5db-50324cacb012	c49db94b-6523-4377-9692-d65509d6370d	2024-08-30 08:46:23.84642
\.


                                                                                                                                                                                                                                                                                                               4978.dat                                                                                            0000600 0004000 0002000 00000001664 14664755225 0014314 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        5ccb3dc9-67be-4877-90af-41f733b5fe12	kate@gmail.com	$2b$10$6MgnN/4W27agH8M14UtNHOiEIIJZf/BR93WXlnAgN1.TBHeHoCq8S	f	Falguni Kate	\N	\N	\N	\N	\N
40733301-e32e-4029-b5d9-231610d583f0	abhi@gmail.com	$2b$10$hMkq2sgaju46QDRB.I0t3uqNRi5lG90c7U41533LnK4hg9AIHKXCC	f	Abhishek Jakhmola	\N	\N	\N	\N	\N
5e7951b7-8870-40a6-ab8f-e0e00ebd5909	sumanth@gmail.com	$2b$10$IluopnlVyagNpOa5CoYKMObFM6T4IZkSxzXgWffeZX9ZWGaqIcYk2	f	Sumanth Kongani	\N	\N	\N	\N	\N
980dbc6c-d672-4500-9cb7-3dd0b2c4fa69	naveen@gmail.com	$2b$10$V8eCKj/upwmUXHgJmzLPU.tUWMqAdkUoT5iWcCMtOE/FzDueYoh2K	f	Naveen Edala Chowdhury	\N	\N	\N	\N	\N
bb9ffa35-30e4-4f21-b67c-a372867de2f5	sid@gmail.com	$2b$10$O9sZcoOtfhsI/H09Ut/C/ONWb7GJEEszKAZYK5bh94xSZS4kiXP9G	f	Sidhardha	\N	\N	\N	\N	\N
c49db94b-6523-4377-9692-d65509d6370d	subha@gmail.com	$2b$10$V48gPRyPRbsQGaQhvVltDep/30TVGoLvuBXdIva8EXKpR/ZiXekzu	f	Subhadeep Chowdhury	\N	\N	\N	$2b$10$4Zp0ZnX6qGJYGJjZh61JV.8sXouziB3C1pmlIR7iPceYzvNqtvbm2	\N
\.


                                                                            4973.dat                                                                                            0000600 0004000 0002000 00000000553 14664755225 0014303 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        7ab240d9-7b29-45cd-818e-8a4594637b86	Pulse	0	\N	\N	b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b
8785e4e2-aae2-4241-b9cf-e7af277dfbad	TickMonitor	0	\N	\N	b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b
5d2dec8d-f7ca-4e61-9fee-12381efabb4d	Cheesle	0	\N	\N	b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b
860ca63c-89b8-459f-8e2b-3b047332fd1d	L&P	0	\N	\N	b3cf4f8d-34ed-4dea-be61-1f0ee9cd8e4b
\.


                                                                                                                                                     restore.sql                                                                                         0000600 0004000 0002000 00000047754 14664755225 0015425 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

DROP DATABASE "tickmonitor-db";
--
-- Name: tickmonitor-db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "tickmonitor-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';


ALTER DATABASE "tickmonitor-db" OWNER TO postgres;

\connect -reuse-previous=on "dbname='tickmonitor-db'"

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: task_interval_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_interval_enum AS ENUM (
    'none',
    'daily',
    'weekly',
    'monthly',
    'annual'
);


ALTER TYPE public.task_interval_enum OWNER TO postgres;

--
-- Name: task_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_status_enum AS ENUM (
    'to_initiate',
    'in_progress',
    'completed',
    'on_hold'
);


ALTER TYPE public.task_status_enum OWNER TO postgres;

--
-- Name: task_urgency_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_urgency_enum AS ENUM (
    'low',
    'medium',
    'high',
    'critical'
);


ALTER TYPE public.task_urgency_enum OWNER TO postgres;

--
-- Name: task_user_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_user_role_enum AS ENUM (
    'to',
    'cc'
);


ALTER TYPE public.task_user_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: attatchment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attatchment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    field character varying NOT NULL,
    url character varying NOT NULL,
    "userId" uuid,
    "taskId" uuid,
    "commentId" uuid
);


ALTER TABLE public.attatchment OWNER TO postgres;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "taskId" uuid
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: domain; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domain (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "domainUrl" character varying NOT NULL,
    details json DEFAULT '{}'::json NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    "domainId" character varying NOT NULL,
    "domainName" character varying NOT NULL,
    "parentDomainId" uuid
);


ALTER TABLE public.domain OWNER TO postgres;

--
-- Name: domain_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domain_users (
    "domainId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.domain_users OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL,
    type character varying NOT NULL,
    "domainId" uuid,
    "userId" uuid
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "startDate" timestamp without time zone NOT NULL,
    "dueDate" timestamp without time zone NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    status public.task_status_enum DEFAULT 'to_initiate'::public.task_status_enum NOT NULL,
    urgency public.task_urgency_enum DEFAULT 'low'::public.task_urgency_enum NOT NULL,
    "interval" public.task_interval_enum DEFAULT 'none'::public.task_interval_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "parentTaskId" uuid,
    "assignedById" uuid,
    "dependencyOfId" uuid
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task-vertex; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."task-vertex" (
    "taskId" uuid NOT NULL,
    "vertexId" uuid NOT NULL
);


ALTER TABLE public."task-vertex" OWNER TO postgres;

--
-- Name: task_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_user (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role public.task_user_role_enum DEFAULT 'to'::public.task_user_role_enum NOT NULL,
    "userId" uuid,
    "taskId" uuid
);


ALTER TABLE public.task_user OWNER TO postgres;

--
-- Name: tasklog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasklog (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    status character varying NOT NULL,
    description character varying,
    "taskId" uuid,
    "userId" uuid,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tasklog OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "isEmailVerified" boolean DEFAULT false NOT NULL,
    name character varying,
    phone character varying,
    department character varying,
    company character varying,
    "refreshToken" character varying,
    "tasksAssignedByMeId" uuid
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: vertex; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vertex (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    "parentVertexId" uuid,
    "taskId" uuid,
    "domainId" uuid
);


ALTER TABLE public.vertex OWNER TO postgres;

--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Data for Name: attatchment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attatchment (id, name, field, url, "userId", "taskId", "commentId") FROM stdin;
\.
COPY public.attatchment (id, name, field, url, "userId", "taskId", "commentId") FROM '$$PATH$$/4977.dat';

--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (id, content, "createdAt", "userId", "taskId") FROM stdin;
\.
COPY public.comment (id, content, "createdAt", "userId", "taskId") FROM '$$PATH$$/4976.dat';

--
-- Data for Name: domain; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.domain (id, "domainUrl", details, level, "domainId", "domainName", "parentDomainId") FROM stdin;
\.
COPY public.domain (id, "domainUrl", details, level, "domainId", "domainName", "parentDomainId") FROM '$$PATH$$/4972.dat';

--
-- Data for Name: domain_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.domain_users ("domainId", "userId") FROM stdin;
\.
COPY public.domain_users ("domainId", "userId") FROM '$$PATH$$/4979.dat';

--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, name, type, "domainId", "userId") FROM stdin;
\.
COPY public.role (id, name, type, "domainId", "userId") FROM '$$PATH$$/4971.dat';

--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (id, title, description, "startDate", "dueDate", "isCompleted", level, status, urgency, "interval", "createdAt", "updatedAt", "parentTaskId", "assignedById", "dependencyOfId") FROM stdin;
\.
COPY public.task (id, title, description, "startDate", "dueDate", "isCompleted", level, status, urgency, "interval", "createdAt", "updatedAt", "parentTaskId", "assignedById", "dependencyOfId") FROM '$$PATH$$/4975.dat';

--
-- Data for Name: task-vertex; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."task-vertex" ("taskId", "vertexId") FROM stdin;
\.
COPY public."task-vertex" ("taskId", "vertexId") FROM '$$PATH$$/4980.dat';

--
-- Data for Name: task_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_user (id, role, "userId", "taskId") FROM stdin;
\.
COPY public.task_user (id, role, "userId", "taskId") FROM '$$PATH$$/4974.dat';

--
-- Data for Name: tasklog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasklog (id, title, date, status, description, "taskId", "userId", "createdAt") FROM stdin;
\.
COPY public.tasklog (id, title, date, status, description, "taskId", "userId", "createdAt") FROM '$$PATH$$/4969.dat';

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password, "isEmailVerified", name, phone, department, company, "refreshToken", "tasksAssignedByMeId") FROM stdin;
\.
COPY public."user" (id, email, password, "isEmailVerified", name, phone, department, company, "refreshToken", "tasksAssignedByMeId") FROM '$$PATH$$/4978.dat';

--
-- Data for Name: vertex; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vertex (id, name, level, "parentVertexId", "taskId", "domainId") FROM stdin;
\.
COPY public.vertex (id, name, level, "parentVertexId", "taskId", "domainId") FROM '$$PATH$$/4973.dat';

--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- Name: comment PK_0b0e4bbc8415ec426f87f3a88e2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);


--
-- Name: domain PK_27e3ec3ea0ae02c8c5bceab3ba9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain
    ADD CONSTRAINT "PK_27e3ec3ea0ae02c8c5bceab3ba9" PRIMARY KEY (id);


--
-- Name: task_user PK_6ea2c1c13f01b7a383ebbeaebb0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_user
    ADD CONSTRAINT "PK_6ea2c1c13f01b7a383ebbeaebb0" PRIMARY KEY (id);


--
-- Name: attatchment PK_791175f20c2166c5bf9f962b364; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attatchment
    ADD CONSTRAINT "PK_791175f20c2166c5bf9f962b364" PRIMARY KEY (id);


--
-- Name: domain_users PK_a948e72f5e967a7237a27c381d4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain_users
    ADD CONSTRAINT "PK_a948e72f5e967a7237a27c381d4" PRIMARY KEY ("domainId", "userId");


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: vertex PK_c8ba7ae73ad81b9f3991ad76684; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vertex
    ADD CONSTRAINT "PK_c8ba7ae73ad81b9f3991ad76684" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: task-vertex PK_d75e01e4c240869a9ec84a52b6f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."task-vertex"
    ADD CONSTRAINT "PK_d75e01e4c240869a9ec84a52b6f" PRIMARY KEY ("taskId", "vertexId");


--
-- Name: tasklog PK_e4b8e18f38769d0503b45250e0b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasklog
    ADD CONSTRAINT "PK_e4b8e18f38769d0503b45250e0b" PRIMARY KEY (id);


--
-- Name: task PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_3c134205aae5a74ad661cbe337; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3c134205aae5a74ad661cbe337" ON public."task-vertex" USING btree ("taskId");


--
-- Name: IDX_bd9f1fc00100cacd6731b360d4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_bd9f1fc00100cacd6731b360d4" ON public.domain_users USING btree ("userId");


--
-- Name: IDX_c6062f6eaead8029efa4c522da; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_c6062f6eaead8029efa4c522da" ON public."task-vertex" USING btree ("vertexId");


--
-- Name: IDX_d5e49bfa90d6b89c505bd1690f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_d5e49bfa90d6b89c505bd1690f" ON public.domain_users USING btree ("domainId");


--
-- Name: domain FK_004184e5dbe0a2977b1dcef5b41; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain
    ADD CONSTRAINT "FK_004184e5dbe0a2977b1dcef5b41" FOREIGN KEY ("parentDomainId") REFERENCES public.domain(id);


--
-- Name: attatchment FK_0715f3f008e0eb0b19319e185d8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attatchment
    ADD CONSTRAINT "FK_0715f3f008e0eb0b19319e185d8" FOREIGN KEY ("commentId") REFERENCES public.comment(id);


--
-- Name: task_user FK_0f500c19a4a119f22a82c9b3640; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_user
    ADD CONSTRAINT "FK_0f500c19a4a119f22a82c9b3640" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: attatchment FK_16a3e1fd6e3a89922dcd9766bb6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attatchment
    ADD CONSTRAINT "FK_16a3e1fd6e3a89922dcd9766bb6" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON DELETE CASCADE;


--
-- Name: task-vertex FK_3c134205aae5a74ad661cbe3374; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."task-vertex"
    ADD CONSTRAINT "FK_3c134205aae5a74ad661cbe3374" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role FK_3e02d32dd4707c91433de0390ea; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: vertex FK_44f2b43b1c3a61b71256802d06a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vertex
    ADD CONSTRAINT "FK_44f2b43b1c3a61b71256802d06a" FOREIGN KEY ("domainId") REFERENCES public.domain(id);


--
-- Name: vertex FK_53482bc79969d161032b7474d7d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vertex
    ADD CONSTRAINT "FK_53482bc79969d161032b7474d7d" FOREIGN KEY ("taskId") REFERENCES public.task(id);


--
-- Name: task FK_592f97031fc28581e69127bcb60; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_592f97031fc28581e69127bcb60" FOREIGN KEY ("dependencyOfId") REFERENCES public.task(id);


--
-- Name: vertex FK_815d0c2e5fc20bbbfc06308f1ab; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vertex
    ADD CONSTRAINT "FK_815d0c2e5fc20bbbfc06308f1ab" FOREIGN KEY ("parentVertexId") REFERENCES public.vertex(id);


--
-- Name: task FK_8bf6d736c49d48d91691ea0dfe5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_8bf6d736c49d48d91691ea0dfe5" FOREIGN KEY ("parentTaskId") REFERENCES public.task(id);


--
-- Name: comment FK_9fc19c95c33ef4d97d09b72ee95; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON DELETE CASCADE;


--
-- Name: tasklog FK_a2377eeb9bf457edf462d035c23; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasklog
    ADD CONSTRAINT "FK_a2377eeb9bf457edf462d035c23" FOREIGN KEY ("taskId") REFERENCES public.task(id);


--
-- Name: domain_users FK_bd9f1fc00100cacd6731b360d41; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain_users
    ADD CONSTRAINT "FK_bd9f1fc00100cacd6731b360d41" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: role FK_c01c7c15207c87156b4102d44dc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "FK_c01c7c15207c87156b4102d44dc" FOREIGN KEY ("domainId") REFERENCES public.domain(id);


--
-- Name: comment FK_c0354a9a009d3bb45a08655ce3b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: attatchment FK_c36b3be58dd5c37469e11ad0ac2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attatchment
    ADD CONSTRAINT "FK_c36b3be58dd5c37469e11ad0ac2" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: user FK_c50ce8e615830ba865261537e03; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c50ce8e615830ba865261537e03" FOREIGN KEY ("tasksAssignedByMeId") REFERENCES public.task(id);


--
-- Name: task-vertex FK_c6062f6eaead8029efa4c522dab; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."task-vertex"
    ADD CONSTRAINT "FK_c6062f6eaead8029efa4c522dab" FOREIGN KEY ("vertexId") REFERENCES public.vertex(id);


--
-- Name: domain_users FK_d5e49bfa90d6b89c505bd1690f9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domain_users
    ADD CONSTRAINT "FK_d5e49bfa90d6b89c505bd1690f9" FOREIGN KEY ("domainId") REFERENCES public.domain(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: task FK_d67cd7c5e34f48cf33be802898a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_d67cd7c5e34f48cf33be802898a" FOREIGN KEY ("assignedById") REFERENCES public."user"(id);


--
-- Name: tasklog FK_e9255a6d15a050278bd23247798; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasklog
    ADD CONSTRAINT "FK_e9255a6d15a050278bd23247798" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: task_user FK_ff099dc6756bfef736ebe18ea9a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_user
    ADD CONSTRAINT "FK_ff099dc6756bfef736ebe18ea9a" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    