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

        let centroMapa = {lat:-18.5, lng: -44};

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    centroMapa = {
                        lat: posicao.coords.latitude,
                        lng: posicao.coords.longitude
                    };
                    mapa.setCenter(centroMapa);

                    new google.maps.Marker({
                        map: mapa,
                        position: centroMapa,
                        title: "Você está aqui!",
                        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    })
                },
                (erro) => {
                    console.warn("Erro ao obter geolocalização", erro.message)
                }
            );
        }else{
            console.warn("Geolocalização não é suportada neste navegador.");
        }
    
        const marcadores = [];
        const mapa = new google.maps.Map(document.querySelector('#map'), {
            zoom: 6,
            center: {lat: -18.5, lng: -44},
        });

        const janelaInfos = new google.maps.InfoWindow();
    
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

                    marcador.addListener('click', () => {
                        const infos = `
                        <div style="max-width: 250px">
                            <h3>${produto.nome}</h3>
                            <p><strong>Produtor:</strong>${produto.produtor.nome}</p>
                            <p><strong>Local:</strong>${produto.produtor.localizacao}</p>
                            <p><strong>Preço:</strong>R$${produto.preco}</p>
                            ${produto.imagens[0] ? `<img src="../assets/images/${produto.imagens[0]}" alt="${produto.nome}" style="width: 100%; height: auto; margin-top: 8px;">` : ''}
                        `;
                        janelaInfos.setContent(infos);
                        janelaInfos.open(mapa, marcador);
                    });
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