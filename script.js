async function carregaProdutos(termo = '') {
  const container = document.getElementById("lista-produtos");
  // busca os dados na api
  const url = termo
  ? `https://dummyjson.com/products/search?q=${encodeURIComponent(termo)}&limit=30`
  : 'https://dummyjson.com/products?limit=30';
  const resposta = await fetch(url);
  const dados = await resposta.json();
  

  // limpar antes de inserir
  container.innerHTML = '';

  if (dados.products.length === 0) {
    container.innerHTML = '<p class="text-center">Nenhum produto encontrado.</p>';
  }

  dados.products.forEach(produto => {
    const cardHTML = `
      <div class="col-12 col-md-4 col-lg-3 mb-4 mt-3 d-flex">
        <div class="product-card">
          <img src="${produto.thumbnail}" alt="${produto.title}" class="product-image"/>
          <div class="product-info">
            <h3 class="product-title">${produto.title}</h3>
            <p class="product-description">${produto.description}</p>
          <div class="product-price mt-auto">R$ ${produto.price}</div>
            <button class="btn-buy">Compra Agora</button>
          </div>
        </div>
        </div>`;  
      //adiciona outros cards
      container.innerHTML += cardHTML;
  });
}

//busca produto
carregaProdutos();

// busca produto pela barra de pesquisa
document.getElementById('form-busca').addEventListener('submit', (e) => {
  e.preventDefault(); // evita recarregar a página
  carregaProdutos(document.getElementById('campo-busca').value.trim());
});