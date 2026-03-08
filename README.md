# ✂️ PDFSnip.com — Free PDF & Image Tools

> Convert, compress, merge, split, and edit PDFs and images — free, fast, private. No watermarks. No limits.

## 🌐 Live Site
**[pdfsnip.com](https://pdfsnip.com)** *(deploy to GitHub Pages — see below)*

---

## 📦 What's Included

| Page | Description |
|---|---|
| `index.html` | Homepage with hero, tools grid, how it works, benefits, FAQ, footer |
| `pdf-to-jpg.html` | **PDF to JPG** converter with drag & drop, settings, progress, results |
| `compress-pdf.html` | Compress PDF tool |
| `compress-jpg.html` | Compress JPG/JPEG images |
| `compress-png.html` | Compress PNG with transparency support |
| `compress-svg.html` | Minify SVG vector files |
| `merge-pdf.html` | Merge multiple PDFs into one |
| `css/style.css` | Complete design system (dark theme, Syne + DM Sans fonts) |
| `js/main.js` | Drag & drop, file handling, progress bar, FAQ accordion, toast |

---

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `pdfsnip` (or `pdfsnip.com`)
3. Set visibility to **Public**
4. Click **Create repository**

### Step 2 — Upload Your Files
**Option A — GitHub Web UI:**
1. Open your new repo
2. Click **"Add file" → "Upload files"**
3. Drag all project files (keep folder structure: `css/`, `js/`, all `.html` files)
4. Click **Commit changes**

**Option B — Git CLI:**
```bash
cd pdfsnip/
git init
git add .
git commit -m "Initial PDFSnip site"
git remote add origin https://github.com/YOUR_USERNAME/pdfsnip.git
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select `main` branch, root `/`
3. Click **Save**
4. Your site is live at: `https://YOUR_USERNAME.github.io/pdfsnip/`

### Step 4 (Optional) — Custom Domain `pdfsnip.com`
1. Buy `pdfsnip.com` from a registrar (Namecheap, Cloudflare, etc.)
2. In your registrar's DNS, add:
   ```
   Type: CNAME  Name: www   Value: YOUR_USERNAME.github.io
   Type: A      Name: @     Value: 185.199.108.153
   Type: A      Name: @     Value: 185.199.109.153
   Type: A      Name: @     Value: 185.199.110.153
   Type: A      Name: @     Value: 185.199.111.153
   ```
3. In GitHub Pages settings, add `pdfsnip.com` as custom domain
4. Enable **Enforce HTTPS**

---

## 🛠️ Tech Stack

- **Pure HTML, CSS, JavaScript** — no frameworks, no build step
- **Google Fonts** — Syne (display) + DM Sans (body)
- **CSS Variables** — easy theming and customization
- **Intersection Observer API** — scroll-triggered animations

---

## 🎨 Design System

```css
--bg:      #0a0a0f  /* main background */
--accent:  #ff5533  /* primary red-orange */
--accent3: #ffcc44  /* warm yellow accent */
--text:    #f0f0f5  /* primary text */
--text2:   #9999bb  /* secondary text */
```

Fonts: **Syne** (headings) + **DM Sans** (body)

---

## ➕ Adding New Tools

1. Copy any existing tool page (e.g., `compress-jpg.html`)
2. Update: title, h1, subtitle, icon, accept types, settings, FAQ
3. Add the new tool card to `index.html` tools grid
4. Add to footer links in all pages

Or run the generator:
```bash
# Edit TOOLS list in generate.py, then:
python3 generate.py
```

---

## 📋 Roadmap

- [ ] Real PDF processing via PDF.js or backend API
- [ ] Real image compression via browser Canvas API  
- [ ] Drag-to-reorder file list for merge tool
- [ ] Page range selector for split/convert tools
- [ ] Dark/light theme toggle
- [ ] PWA support (offline capable)
- [ ] API endpoint integration (Cloudflare Workers)

---

## 📄 License

MIT License — free to use, modify, and deploy.

---

*Made with ❤️ — PDFSnip.com*
