function iniciarMapa(){
    const mapa = new google.maps.Map(document.querySelector("#map"), {
        zoom: 6,
        center: {lat: -18.5, lng: -44},
    });
    
    const geocoder = new google.maps.Geocoder();

    fetch('js/produtos.json')
    .then(res => res.json())
    .then(produtos => {
        const produtoresUnicos = {};
        produtos.forEach(produto => {
            const produtor = produto.produtor;
            const chave = produtor.nome + produtor.localizacao;
            if(!produtoresUnicos[chave]){
                produtoresUnicos[chave] = produtor;
            }
        });
        Object.values(produtoresUnicos).forEach(produtor => {
            geocoder.geocode({ address: produtor.localizacao}, (results, status) => {
                if (status === "OK"){
                    new google.maps.Marker({
                        map: mapa,
                        position: results[0].geometry.location,
                        title: `${produtor.nome} - ${produtor.propriedade}`
                    });
                } else {
                    console.error("Erro na geocodificação: ", status, produtor.localizacao);
                }
            })
        })
    })
    .catch(error => console.error("Erro ao carregar JSON: ", error));
} 