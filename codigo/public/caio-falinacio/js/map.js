function iniciarMapa (){
    fetch('js/produtos.json')
    .then(res => res.json())
    .then(produtos => {
        const filtroSelect = document.querySelector('#filtroProduto');
        const nomeProduto = [...new Set(produtos.map(p => p.nome))];
    
        nomeProduto.forEach(nome => {
            const option = document.createElement('option');
            option.value = nome;
            option.textContent = nome;
            filtroSelect.appendChild(option);
        });
    
        const marcadores = [];
        const mapa = new google.maps.Map(document.querySelector('#map'), {
            zoom: 6,
            center: {lat: -18.5, lng: -44},
        });
    
        const geocoder = new google.maps.Geocoder();
    
        produtos.forEach(produto => {
            geocoder.geocode({ address: produto.produtor.localizacao}, (results, status) => {
                if(status === "OK"){
                    const marcador = new google.maps.Marker({
                        map: mapa,
                        position: results[0].geometry.location,
                        title: `${produto.nome} - ${produto.produtor.nome}`
                    });
                    marcador.produto = produto.nome;
                    marcadores.push(marcador);
                } else {
                    console.error("Erro na geocodificação: ", status, produto.produtor.localizacao);
                }
            });
        });
        filtroSelect.addEventListener('change', () => {
            const selecionado = filtroSelect.value;
            marcadores.forEach(marcador => {
                if(selecionado === "Todos" || marcador.produto === selecionado){
                    marcador.setMap(mapa);
                } else {
                    marcador.setMap(null);
                }
            });
        });
    })
    .catch(error => console.error('Erro ao carregar JSON: ', error));
}