const dados = [
  {
    "id": 1,
    "nome": "Tomates Orgânicos",
    "descricao": "Tomate orgânico, cultivado com todo o cuidado e carinho, direto da Fazenda Nilton Santos. Ideal a qualquer receita, totalmente livre de agrotóxicos.",
    "preco": 9.76,
    "unidade": "kg",
    "disponivel": true,
    "informacoes_nutricionais": {
      "calorias": "18 kcal (100g)",
      "carboidratos": "3.9g",
      "proteinas": "0.9g",
      "fibras": "1.2g",
      "vitaminaC": "13.7mg"
    },
    "categoria": "Verduras e Legumes",
    "imagens": ["tomate1.jpg", "tomate2.jpg"],
    "produtor": {
      "nome": "Guilherme Arealdo",
      "propriedade": "Fazenda Nilton Santos",
      "localizacao": "Zona Rural de Nova Esperança - MG"
    },
    "avaliacoes": [
      {
        "usuario": "Miguel Torres",
        "comentario": "Tomate super fresco! Chegou rápido.",
        "nota": 5
      },
      {
        "usuario": "Luiza Alves",
        "comentario": "Muito saboroso. Recomendo.",
        "nota": 4
      }
    ]
  },
  {
    "id": 2,
    "nome": "Ovos Caipiras",
    "descricao": "Ovos caipiras fresquinhos, de galinhas criadas soltas, comendo ração natural. Perfeitos para o café da manhã ou qualquer receita.",
    "preco": 14.31,
    "unidade": "bandeja",
    "disponivel": true,
    "informacoes_nutricionais": {
      "calorias": "155 kcal (100g)",
      "carboidratos": "1.1g",
      "proteinas": "12.6g",
      "fibras": "0g",
      "vitaminaD": "37 IU"
    },
    "categoria": "Laticínios e Ovos",
    "imagens": ["ovos1.jpg", "ovos2.jpg"],
    "produtor": {
      "nome": "Carmen Rosa Aveiro",
      "propriedade": "Fazenda Aras do Norte",
      "localizacao": "Três Marias - MG"
    },
    "avaliacoes": [
      {
        "usuario": "Odete Valadão",
        "comentario": "Nenhum ovo chegou estragado! Recomendo a todos que buscam qualidade.",
        "nota": 5
      },
      {
        "usuario": "Roger Machado de Assis",
        "comentario": "Compro com eles recorrentemente, e nunca me deixaram na mão.",
        "nota": 4.5
      }
    ]
  },
  {
    "id": 3,
    "nome": "Contra filé",
    "descricao": "Corte bovino extremamente macio e saboroso, com o gado utilizado tratado da melhor forma.",
    "preco": 45.98,
    "unidade": "kg",
    "disponivel": true,
    "informacoes_nutricionais": {
      "calorias": "242 kcal",
      "carboidratos": "0g",
      "proteinas": "26g",
      "gorduras_totais": "15g",
      "gorduras_saturadas": "6g",
      "gorduras_trans": "0.5g",
      "colesterol": "80mg",
      "vitaminaB12": "2.0µg"
    },
    "categoria": "Açougue",
    "imagens": ["file1.jpg", "file2.jpg"],
    "produtor": {
      "nome": "Jaerci Carvalho",
      "propriedade": "Fazenda Predo Areades",
      "localizacao": "Bom Despacho - MG"
    },
    "avaliacoes": [
      {
        "usuario": "Rosa Martínez",
        "comentario": "A carne mais fresca da região! Sempre está na minha lista do mês.",
        "nota": 5.0
      },
      {
        "usuario": "Abraaão Goytacazes",
        "comentario": "O corte mais gostoso da região, carne muito bem tratada.",
        "nota": 5.0
      }
    ]
  },
  {
    "id": 4,
    "nome": "Frango Caipira - Filé de Peito",
    "descricao": "Frango Caipira criado em galinheiro com o máximo de cuidado, com o abate e tratamento da carne confiáveis. De família para família.",
    "preco": 18.83,
    "unidade": "bandeja",
    "disponivel": true,
    "informacoes_nutricionais": {
      "calorias": "165 kcal",
      "carboidratos": "0g",
      "proteinas": "31g",
      "gorduras_totais": "3.6g",
      "vitaminaB6": "0.6mg",
      "vitaminaB12": "0.3µg"
    },
    "categoria": "Açougue",
    "imagens": ["peito1.jpg", "peito2.jpg"],
    "produtor": {
      "nome": "Ricardo Freire de Jesus",
      "propriedade": "Fazenda Nilton Santos",
      "localizacao": "Zona Rural de Nova Esperança - MG"
    },
    "avaliacoes": [
      {
        "usuario": "Tereza de Cotia",
        "comentario": "O Filé aqui em casa é um dos itens do açougue mais barato, então sempre estamos comprando. Muito bom!",
        "nota": 4.5
      },
      {
        "usuario": "Anamaria Motta Magalhães",
        "comentario": "Imperdível! Sempre que sobra um dinheirinho no final do mês, compro!",
        "nota": 5.0
      }
    ]
  },
  {
    "id": 5,
    "nome": "Arroz",
    "descricao": "Arroz cultivado na lavoura rica de nutrientes da Fazenda Nilton Santos. Totalmente livre de agrotóxicos.",
    "preco": 35.00,
    "unidade": "kg",
    "disponivel": true,
    "informacoes_nutricionais": {
      "calorias": "130 kcal",
      "carboidratos": "28g",
      "proteinas": "2.5g",
      "gorduras_totais": "0.3g",
      "vitaminaB1": "0.07mg",
      "vitaminaB3": "1.5mg"
    },
    "categoria": "Cereais",
    "imagens": ["sacoarroz1.jpg", "sacoarroz2.jpg"],
    "produtor": {
      "nome": "Olinto de Braga",
      "propriedade": "Fazenda Nilton Santos",
      "localizacao": "Zona Rural de Nova Esperança - MG"
    },
    "avaliacoes": [
      {
        "usuario": "Marcelo Oliveira",
        "comentario": "Essencial para qualquer refeição. Sempre me satisfez.",
        "nota": 5.0
      },
      {
        "usuario": "Rosalina Campelário",
        "comentario": "Fazenda Nilton Santos, meus parabéns! Mais um produto de qualidade.",
        "nota": 5.0
      }
    ]
  },
  {
    "id": 6,
    "nome": "Alface",
    "descricao": "Alfaces cultivados sem agrotóxicos e com paixão familiar, direto para a sua casa!",
    "preco": 2.99,
    "unidade": "kg",
    "disponivel": true,
    "informacoes_nutricionais": {
      "calorias": "15 kcal",
      "carboidratos": "2.9g",
      "proteinas": "1.4g",
      "gorduras_totais": "0.2g",
      "vitaminaA": "740 IU",
      "vitaminaC": "9.2mg",
      "folato": "38µg"
    },
    "categoria": "Legumes e Verduras",
    "imagens": ["alfaceverde1.jpg", "alfaceverde2.jpg"],
    "produtor": {
      "nome": "Lourdes Gomes Bragança",
      "propriedade": "Fazenda Nilton Santos",
      "localizacao": "Zona Rural de Nova Esperança - MG"
    },
    "avaliacoes": [
      {
        "usuario": "Rita Medeiros de Assunção",
        "comentario": "Compro direto para controlar a minha pressão! Sempre limpos e bem cuidados.",
        "nota": 5.0
      },
      {
        "usuario": "Silvestre de Lima",
        "comentario": "Ótimo produto. Fazenda Nilton Santos sempre nos deixando com vontade de voltar.",
        "nota": 5.0
      }
    ]
  }
]

