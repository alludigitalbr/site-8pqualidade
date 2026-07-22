# Site 8P Gestão & Negócios

Site institucional + landing page de conversão, 100% estático (HTML/CSS/JS puro). Pode ser hospedado em qualquer serviço: Hostinger, Vercel, Netlify, Cloudflare Pages, GitHub Pages etc.

## Estrutura

```
site/
├── index.html        → Site institucional (7 seções)
├── landing.html      → Landing page para Meta Ads / Google Ads (noindex)
├── robots.txt        → Bloqueia indexação da landing
├── sitemap.xml       → Sitemap (ajustar domínio se necessário)
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/          → logo, foto do Marcelo e logos dos clientes
```

## Antes de publicar — checklist

1. **E-mail do formulário**: ✅ já configurado — leads vão para `8pgestaoenegocios@gmail.com` via FormSubmit.
   No primeiro envio real (com o site publicado), o FormSubmit manda um e-mail de confirmação
   para essa caixa — basta clicar em "Activate" uma única vez.

2. **Google Analytics (GA4)**: descomente o bloco no `<head>` de `index.html` e troque `G-XXXXXXXXXX` pelo ID real.

3. **Google Ads**: na `landing.html`, descomente o bloco Google Tag e troque `AW-XXXXXXXXXX`.

4. **Meta Pixel**: descomente o bloco nos dois arquivos e troque `XXXXXXXXXXXXXXX` pelo ID do Pixel.
   Os eventos de conversão (`fbq('track','Lead')` / `gtag('event','generate_lead')`) já estão indicados em
   `assets/js/main.js` — basta descomentá-los junto.

5. **YouTube**: o card do YouTube em "Nossos Canais" está com link `#` — adicionar a URL do canal quando existir.

6. **Domínio**: ajustar `canonical` (index.html), `robots.txt` e `sitemap.xml` se o domínio final não for `8pgestao.com.br`.

7. **SSL**: qualquer host moderno (Vercel/Netlify/Hostinger) emite certificado automático — só ativar.

## Dados já configurados

- WhatsApp: +55 11 99473-3883 (botão flutuante + CTAs + fallback do formulário)
- Instagram: @8pqualidade
- LinkedIn: linkedin.com/in/marcelo-alberico

## Teste A/B da landing

A headline variação B está comentada no HTML da `landing.html`:
"Sua indústria certificada em ISO 9001 e IATF 16949 — sem aumentar a estrutura".
Para o teste, duplique `landing.html` como `landing-b.html` e troque a headline/CTA.

## Rodar localmente

```
npx http-server "D:\AlluDigital\8P Gestao e Consultoria\site" -p 8087
```
