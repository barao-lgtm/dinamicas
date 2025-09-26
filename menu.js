fetch("produtos.json")
  .then(res => res.json())
  .then(produtos => {
    const feed = document.getElementById("feed-reels");
    const menu = document.getElementById("menu-categorias");

    function renderFeed(filtro) {
      feed.innerHTML = "";
      const filtrados = filtro === "todos" ? produtos : produtos.filter(p => p.influencer.includes(filtro));
      filtrados.forEach(p => {
        const card = document.createElement("div");
        card.className = "reel-card";
        card.innerHTML = `
          <img src="img/${p.imagem}" />
          <div class="reel-info">
            <h2>${p.nome}</h2>
            <p>R$${p.valor_final} <small>(+${p.margem}% margem)</small></p>
            <a href="${p.entrega}" target="_blank">Comprar com ${p.influencer}</a>
          </div>
        `;
        card.addEventListener("click", () => {
          window.location.href = `index.html?influencer=${p.influencer}&produto=${p.id}`;
        });
        feed.appendChild(card);
      });
    }

    menu.addEventListener("change", e => renderFeed(e.target.value));
    renderFeed("todos");
  });
