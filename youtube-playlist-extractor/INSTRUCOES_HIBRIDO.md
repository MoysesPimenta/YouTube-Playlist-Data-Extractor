# Instruções para Publicação no GitHub Pages - Versão Híbrida

Este documento contém instruções passo a passo para publicar o Extrator de Playlist do YouTube no GitHub Pages.

## Novidades na Versão Híbrida

Esta versão inclui um sistema híbrido que combina:
1. **API do YouTube** - Para extração precisa e rápida (requer chave de API)
2. **Web Scraping** - Como fallback automático quando não há chave de API

## Pré-requisitos

- Uma conta no GitHub
- Conhecimento básico de Git (ou siga as instruções simplificadas abaixo)

## Passos para Publicação

### 1. Criar um novo repositório no GitHub

1. Acesse [GitHub](https://github.com/) e faça login na sua conta
2. Clique no botão "+" no canto superior direito e selecione "New repository"
3. Nomeie o repositório como `youtube-playlist-extractor` (ou outro nome de sua preferência)
4. Deixe o repositório como público
5. Não inicialize o repositório com README, .gitignore ou licença
6. Clique em "Create repository"

### 2. Fazer upload dos arquivos

**Método 1: Upload direto pelo GitHub (mais simples)**

1. No seu novo repositório, clique no link "uploading an existing file"
2. Arraste todos os arquivos e pastas descompactados do arquivo zip para a área de upload
3. Adicione uma mensagem de commit como "Primeira versão do extrator de playlist"
4. Clique em "Commit changes"

**Método 2: Usando Git (para usuários avançados)**

```bash
# Clone o repositório vazio
git clone https://github.com/seu-usuario/youtube-playlist-extractor.git
# Copie todos os arquivos para a pasta do repositório
# Adicione os arquivos ao Git
git add .
# Faça o commit
git commit -m "Primeira versão do extrator de playlist"
# Envie para o GitHub
git push origin main
```

### 3. Configurar o GitHub Pages

1. No seu repositório, vá para "Settings" (aba de configurações)
2. Role para baixo até a seção "GitHub Pages"
3. Em "Source", selecione "main" (ou "master") como branch
4. Clique em "Save"
5. Aguarde alguns minutos para que o site seja publicado
6. O GitHub fornecerá uma URL (geralmente no formato `https://seu-usuario.github.io/youtube-playlist-extractor/`)

## Como Usar o Extrator

1. Acesse a URL do seu site publicado no GitHub Pages
2. Cole o link completo de uma playlist do YouTube no campo de entrada
3. (Opcional) Configure uma chave de API do YouTube para melhor desempenho:
   - Clique em "Configuração Avançada (Opcional)"
   - Insira sua chave de API do YouTube
   - Se não tiver uma chave, clique em "Como obter uma chave de API" para ver instruções
4. Clique em "Extrair Dados"
5. Aguarde o processamento (pode levar alguns minutos dependendo do tamanho da playlist)
6. Quando concluído, baixe a planilha Excel e o documento Word com as capturas de tela

## Sobre o Modo Híbrido

O extrator funciona de duas maneiras:

1. **Com chave de API** (recomendado):
   - Extração mais rápida e precisa
   - Dados mais confiáveis
   - Maior estabilidade

2. **Sem chave de API** (fallback automático):
   - Usa web scraping para extrair dados
   - Funciona imediatamente sem configuração
   - Pode ser menos preciso em alguns casos

A chave de API é armazenada apenas localmente no navegador do usuário e não é compartilhada.

## Personalização (Opcional)

Você pode personalizar o extrator editando os seguintes arquivos:

- `index.html` - Estrutura da página
- `css/styles.css` - Aparência visual
- `js/app.js` - Comportamento da aplicação
- `js/youtube-extractor.js` - Lógica de extração de dados

## Limitações

- O extrator funciona inteiramente no navegador do usuário
- Playlists muito grandes podem levar mais tempo para processar
- A API do YouTube tem limites de requisições, então o uso intensivo pode ser limitado
- O modo de scraping pode ser afetado por mudanças no YouTube

## Solução de Problemas

Se encontrar problemas:

1. Verifique se o link da playlist está correto e acessível
2. Certifique-se de que seu navegador está atualizado
3. Tente limpar o cache do navegador e tentar novamente
4. Se estiver usando uma chave de API, verifique se ela está correta e ativa

## Suporte

Este é um projeto de código aberto. Se encontrar problemas ou quiser contribuir com melhorias, sinta-se à vontade para abrir issues ou pull requests no repositório do GitHub.
