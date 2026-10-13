# FLORESCER — funcionalidades

## Páginas
- `/jardim-de-palavras`: visitantes enviam mensagens associadas a uma flor; novas mensagens ficam pendentes até aprovação.
- `/memorias`: mostra apenas memórias publicadas.
- `/admin`: painel protegido para moderar mensagens e criar/publicar/ocultar/excluir memórias.

## Configuração
1. Configure `DATABASE_URL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` com valores secretos no ambiente de hospedagem.
2. Execute o SQL de `drizzle/0000_florescer.sql` no banco PostgreSQL configurado.
3. Implante a aplicação e teste o acesso a `/admin`.
4. Não adicione credenciais ao repositório. Use o painel de variáveis de ambiente da hospedagem.

O login cria cookie HTTP-only, SameSite Strict, com validade de 12 horas. As mensagens são aprovadas manualmente antes de aparecerem na área pública. Os visitantes não precisam fornecer nome ou e-mail.
