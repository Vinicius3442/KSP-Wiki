let allArticles = [];

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString + "T12:00:00");
    return date.toLocaleDateString('pt-BR', options);
}

function renderHomePage() {
    const mainContent = document.getElementById('main-content-wiki');
    mainContent.innerHTML = `
        <section id="wiki-home-intro" class="wiki-section">
            <h1 class="section-title"><i class="fas fa-star-half-alt title-icon"></i> Bem-vindo à KSP Wiki!</h1>
            <img src="https://cdn.wccftech.com/wp-content/uploads/2016/04/ksp-2-2060x1159.jpg" alt="Foguete decolando de Kerbin" class="hero-image" />
            <p>
                Bem-vindo à Wiki do Kerbal Space Program! Aqui você encontra artigos, guias e informações sobre planetas, foguetes, partes e tudo relacionado ao universo de KSP. Seja você um iniciante ou um veterano, nossa missão é ser o seu recurso definitivo para explorar o sistema Kerbol.
            </p>
            <p>
                Navegue pelas seções à esquerda ou use a barra de busca para encontrar exatamente o que precisa. Boa exploração, Kerbonauta!
            </p>
        </section>

        <section id="featured-sections" class="wiki-section">
            <h2 class="section-title"><i class="fas fa-thumbtack title-icon"></i> Destaques da Wiki</h2>
            <div class="featured-grid" id="featured-articles-grid">
                <!-- Artigos em destaque serão injetados aqui -->
            </div>
        </section>

        <section id="latest-updates" class="wiki-section">
            <h2 class="section-title"><i class="fas fa-history title-icon"></i> Últimos Artigos da Wiki</h2>
            <ul id="recent-articles-list">
                <!-- Artigos recentes serão injetados aqui -->
            </ul>
        </section>
    `;

    const featuredGrid = document.getElementById('featured-articles-grid');
    // Certifique-se de que esses IDs correspondem aos IDs dos seus artigos
    const featuredArticles = allArticles.filter(article => ["orbita-basica", "lv-t30-reliant", "mun"].includes(article.id)); 
    
    featuredArticles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('featured-card');
        card.innerHTML = `
            <img src="${article.image}" alt="${article.title}" class="card-image" />
            <h3><a href="#article/${article.id}" class="nav-link">${article.title}</a></h3>
            <p>${article.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...</p>
        `;
        featuredGrid.appendChild(card);
    });

    const recentList = document.getElementById('recent-articles-list');
    const sortedArticles = [...allArticles].sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestArticles = sortedArticles.slice(0, 4);

    latestArticles.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-calendar-alt"></i> [${formatDate(article.date)}] - <a href="#article/${article.id}" class="nav-link">${article.title}</a>.`;
        recentList.appendChild(li);
    });

    bindNavLinkEvents();
}

function renderArticle(articleId) {
    const article = allArticles.find(a => a.id === articleId);
    const mainContent = document.getElementById('main-content-wiki');

    if (article) {
        mainContent.innerHTML = `
            <section class="wiki-section article-page">
                <h1 class="section-title"><i class="fas fa-book title-icon"></i> ${article.title}</h1>
                <p class="article-meta">Publicado em: ${formatDate(article.date)} | Categoria: <a href="#category/${article.category.toLowerCase().replace(/\s/g, '-')}" class="nav-link">${article.category}</a></p>
                ${article.content}
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </section>
        `;
    } else {
        mainContent.innerHTML = `
            <section class="wiki-section error-page">
                <h1 class="section-title"><i class="fas fa-exclamation-triangle title-icon"></i> Artigo Não Encontrado</h1>
                <p>Desculpe, o artigo que você procura não foi encontrado.</p>
                <p><a href="#home" class="nav-link">Voltar para a Página Inicial</a></p>
            </section>
        `;
    }
    bindNavLinkEvents();
}

function renderCategory(categoryId) {
    const mainContent = document.getElementById('main-content-wiki');
    const articlesInCategory = allArticles.filter(article => article.category.toLowerCase().replace(/\s/g, '-') === categoryId);

    if (articlesInCategory.length > 0) {
        const categoryName = articlesInCategory[0].category; 
        mainContent.innerHTML = `
            <section class="wiki-section category-page">
                <h1 class="section-title"><i class="fas fa-folder-open title-icon"></i> Categoria: ${categoryName}</h1>
                <div class="category-articles-grid">
                    ${articlesInCategory.map(article => `
                        <div class="featured-card">
                            <img src="${article.image || 'https://via.placeholder.com/250x150?text=Sem+Imagem'}" alt="${article.title}" class="card-image" />
                            <h3><a href="#article/${article.id}" class="nav-link">${article.title}</a></h3>
                            <p>${article.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...</p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    } else {
         mainContent.innerHTML = `
            <section class="wiki-section error-page">
                <h1 class="section-title"><i class="fas fa-exclamation-triangle title-icon"></i> Categoria Não Encontrada ou Vazia</h1>
                <p>Desculpe, não há artigos nesta categoria ou a categoria não existe.</p>
                <p><a href="#home" class="nav-link">Voltar para a Página Inicial</a></p>
            </section>
        `;
    }
    bindNavLinkEvents();
}

function renderSearchResults(query) {
    const mainContent = document.getElementById('main-content-wiki');
    const normalizedQuery = query.toLowerCase();
    const results = allArticles.filter(article =>
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.content.toLowerCase().includes(normalizedQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );

    mainContent.innerHTML = `
        <section class="wiki-section search-results-page">
            <h1 class="section-title"><i class="fas fa-search title-icon"></i> Resultados da Pesquisa para "${query}"</h1>
            <div class="search-results-list">
                ${results.length > 0 ? results.map(article => `
                    <div class="search-result-item">
                        <h3><a href="#article/${article.id}" class="nav-link">${article.title}</a></h3>
                        <p>${article.content.replace(/<[^>]*>?/gm, '').substring(0, 200)}...</p>
                        <p class="article-meta">Publicado em: ${formatDate(article.date)} | Categoria: <a href="#category/${article.category.toLowerCase().replace(/\s/g, '-')}" class="nav-link">${article.category}</a></p>
                    </div>
                `).join('') : '<p>Nenhum artigo encontrado para sua pesquisa.</p>'}
            </div>
        </section>
    `;
    bindNavLinkEvents();
}

function router() {
    const hash = window.location.hash;

    if (!hash || hash === '#home') {
        renderHomePage();
    } else if (hash.startsWith('#article/')) {
        const articleId = hash.substring('#article/'.length);
        renderArticle(articleId);
    } else if (hash.startsWith('#category/')) {
        const categoryId = hash.substring('#category/'.length);
        renderCategory(categoryId);
    } else if (hash.startsWith('#search/')) {
        const query = decodeURIComponent(hash.substring('#search/'.length));
        renderSearchResults(query);
    }
}

function bindNavLinkEvents() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
    });
}

function handleNavLinkClick(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    window.location.hash = href;
}

window.addEventListener('hashchange', router);

async function loadArticles() {
    const articleFiles = [
        "articles/artigo-orbita-basica.js",

    ];

    for (const file of articleFiles) {
        try {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = file;
                script.onload = () => {
                    const articleId = file.split('/').pop().replace('artigo-', '').replace('.js', '');
                    const articleVarName = `article_${articleId.replace(/-/g, '_')}`;
                    
                    if (window[articleVarName]) {
                        allArticles.push(window[articleVarName]);
                        delete window[articleVarName];
                    } else {
                        console.warn(`Variável global "${articleVarName}" não encontrada após carregar ${file}. Verifique se o artigo está atribuindo a window.`)
                    }
                    resolve();
                };
                script.onerror = reject;
                document.body.appendChild(script);
            });
        } catch (error) {
            console.error(`Erro ao carregar artigo: ${file}`, error);
        }
    }
    router();
}

document.addEventListener('DOMContentLoaded', () => {
    loadArticles().then(() => {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.hash = `#search/${encodeURIComponent(query)}`;
            } else {
                window.location.hash = '#home';
            }
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('ksp-wiki-theme', 'light');
        } else {
            localStorage.setItem('ksp-wiki-theme', 'dark');
        }
    });

    if (localStorage.getItem('ksp-wiki-theme') === 'light') {
        document.body.classList.add('light-theme');
    }
});