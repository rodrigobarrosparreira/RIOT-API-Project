OBS: pode ser que na atual versão não esteja funcionando por mudanças que a Riot Games fez no sistema de maestrias e API.
# 📌 RIOT API - MASTERIES

> Este é um projeto que tem como principal objetivo facilitar para os jogadores de League of Legends a visualização de suas maestrias.
> Consiste em uma página web que colhe informações da API da Riot Games e gera uma interface com filtros que não estão disponíveis na versão atual do jogo


## 📋 Funcionalidades
✔️ Organizar campeões em ordem de maestria 
✔️ Organizar campeões baseado no quão perto está de ir para o próximo nível
✔️ Pesquisar campeões por nome
✔️ Filtrar campeões por nível específico de maestria

---

## ⚙️ Tecnologias Utilizadas
A princípio o projeto foi iniciado em Python, utilizando a biblioteca gráfica Tkinter
Após um certo tempo de desenvolvimento, foi visto uma necessidade de melhorar a interface de usuário e tempo de resposta, então foi feita uma mudança do código para JavaScript utilizando Vue.js e HTML e CSS.
Nas primeiras versões a chave da API ficava pública no código (não são mais válidas), mas posteriormente foi trocado para utilização do AWS lambda como proxy para retornar as requests
