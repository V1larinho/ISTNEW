
// Inicializar AOS (Animate On Scroll)
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// Navegação suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll spy para navbar ativa
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar transparente no scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Inicializar Fancybox para galeria
Fancybox.bind("[data-fancybox]", {
    // Options
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Sistema BilaTunix
const bilaData = {
    bila1: {
        image: './img/bila1.png',
        title: 'I BilaTunix - Resultados',
        results: [
            { category: 'Melhor Serenata', winner: '[A definir]' },
            { category: 'Melhor Original', winner: '[A definir]' },
            { category: 'Melhor Pandeireta', winner: '[A definir]' },
            { category: 'Melhor Porta Estandarte', winner: '[A definir]' },
            { category: 'Melhor Tuna', winner: '[A definir]' }
        ]
    },
    bila2: {
        image: './img/bila2.png',
        title: 'II BilaTunix - Resultados',
        results: [
            { category: 'Melhor Serenata', winner: '[A definir]' },
            { category: 'Melhor Original', winner: '[A definir]' },
            { category: 'Melhor Pandeireta', winner: '[A definir]' },
            { category: 'Melhor Porta Estandarte', winner: '[A definir]' },
            { category: 'Melhor Tuna', winner: '[A definir]' }
        ]
    },
    bila3: {
        image: './img/cartaz.png',
        title: 'III BilaTunix - Resultados',
        results: [
            { category: 'Melhor Serenata', winner: '[A definir]' },
            { category: 'Melhor Original', winner: '[A definir]' },
            { category: 'Melhor Pandeireta', winner: '[A definir]' },
            { category: 'Melhor Porta Estandarte', winner: '[A definir]' },
            { category: 'Melhor Tuna', winner: '[A definir]' }
        ]
    },
    bila4: {
        image: './img/IVBilatunix.jpg',
        title: 'IV BilaTunix - Resultados',
        results: [
            { category: 'Melhor Serenata', winner: 'RTUB' },
            { category: 'Melhor Original', winner: 'Musicatta' },
            { category: 'Melhor Pandeireta', winner: 'RTUB' },
            { category: 'Melhor Porta Estandarte', winner: 'Musicatta' },
            { category: 'Melhor Passacalles', winner: 'RTUB' },
            { category: 'Melhor Instrumental', winner: 'Musicatta' },
            { category: 'Tuna do Povo', winner: 'Musicatta' },
            { category: 'Tuna Mais TUNIX', winner: 'Coral' },
            { category: 'Melhor Tuna', winner: 'Musicatta' }
        ]
    }
};

function showResults(bilaId) {
    console.log('Tentando mostrar resultados para:', bilaId);
    
    const data = bilaData[bilaId];
    if (!data) {
        console.error('Dados não encontrados para:', bilaId);
        return;
    }
    
    console.log('Dados encontrados:', data);
    
    // Esconder cartazes
    const cartazesRow = document.getElementById('cartazes-row');
    if (cartazesRow) {
        cartazesRow.style.display = 'none';
        console.log('Cartazes escondidos');
    } else {
        console.error('Elemento cartazes-row não encontrado');
    }
    
    // Mostrar área de resultados
    const resultsArea = document.getElementById('results-area');
    if (resultsArea) {
        resultsArea.style.display = 'block';
        console.log('Área de resultados mostrada');
    } else {
        console.error('Elemento results-area não encontrado');
    }
    
    // Atualizar imagem
    const cartazGrande = document.getElementById('cartaz-grande');
    if (cartazGrande) {
        cartazGrande.src = data.image;
        cartazGrande.alt = data.title;
        console.log('Imagem atualizada');
    }
    
    // Atualizar título
    const resultsTitle = document.getElementById('results-title');
    if (resultsTitle) {
        resultsTitle.textContent = data.title;
        console.log('Título atualizado');
    }
    
    // Criar resultados
    const resultsContent = document.getElementById('results-content');
    if (resultsContent) {
        resultsContent.innerHTML = '';
        
        data.results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result-simple';
            resultDiv.innerHTML = `
                <span class="category">${result.category}:</span>
                <span class="winner">${result.winner}</span>
            `;
            resultsContent.appendChild(resultDiv);
        });
        console.log('Resultados criados');
    }
    
    // Scroll para a área de resultados
    if (resultsArea) {
        setTimeout(() => {
            resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function hideResults() {
    // Mostrar cartazes
    document.getElementById('cartazes-row').style.display = 'block';
    
    // Esconder área de resultados
    document.getElementById('results-area').style.display = 'none';
    
    // Scroll para os cartazes
    document.getElementById('cartazes-row').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando BilaTunix...');
    
    // Adicionar event listeners aos cartazes
    const cartazes = document.querySelectorAll('.cartaz-item');
    
    cartazes.forEach(cartaz => {
        cartaz.addEventListener('click', function() {
            const bilaId = this.getAttribute('data-bila');
            console.log('Clicou em:', bilaId);
            showResults(bilaId);
        });
        
        // Adicionar cursor pointer
        cartaz.style.cursor = 'pointer';
    });
    
    console.log('BilaTunix inicializado com', cartazes.length, 'cartazes');
});