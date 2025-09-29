// Antes:
// const article_orbita_basica = { ... };

// Depois:
window.article_orbita_basica = {
    id: "orbita-basica",
    title: "Órbita Básica em KSP",
    category: "Guia de Jogo",
    date: "2023-10-26",
    image: "https://i.ytimg.com/vi/bYyvG_wzE0U/maxresdefault.jpg",
    content: `
        <h2 class="section-title"><i class="fas fa-globe-americas title-icon"></i> Órbita Básica em KSP</h2>
        <img src="https://i.ytimg.com/vi/bYyvG_wzE0U/maxresdefault.jpg" alt="Ilustração de uma órbita" class="hero-image" />
        <p>Entender como atingir e manter uma órbita estável é o primeiro grande desafio para qualquer Kerbonauta. Uma órbita é essencialmente uma queda constante em torno de um corpo celeste, mas com velocidade lateral suficiente para nunca atingir a superfície.</p>
        
        <h3>Passos para Entrar em Órbita</h3>
        <ol>
            <li><strong>Lançamento Vertical:</strong> Inicie sua subida diretamente para cima.</li>
            <li><strong>Curva de Gravidade:</strong> Por volta de 10-15 km de altitude, comece a inclinar suavemente para o leste (90° no navball), seguindo a curva natural da gravidade.</li>
            <li><strong>Atingir o Apapsis:</strong> Continue a queimar seu motor, visando um apapsis (ApA) de 70-80 km (para Kerbin).</li>
            <li><strong>Circularização:</strong> Quando estiver próximo ao Apapsis, aponte para o "prógrado" (direção de viagem) e queime seu motor até que seu periapsis (PeA) também esteja acima de 70 km.</li>
        </ol>
        <p>Parabéns! Você está em órbita! A partir daqui, as possibilidades são infinitas.</p>
        <h3>Terminologia Importante:</h3>
        <ul>
            <li><strong>Apapsis (ApA):</strong> O ponto mais alto de sua órbita.</li>
            <li><strong>Periapsis (PeA):</strong> O ponto mais baixo de sua órbita.</li>
            <li><strong>Prógrado:</strong> A direção para onde sua nave está se movendo.</li>
            <li><strong>Retrógrado:</strong> A direção oposta ao seu movimento.</li>
        </ul>
        <p>Para mais detalhes, consulte o artigo sobre <a href="#article/mecanica-orbital">Mecânica Orbital Avançada</a>.</p>
    `,
    tags: ["órbita", "básico", "guia", "mecânica orbital", "kerbin"]
};