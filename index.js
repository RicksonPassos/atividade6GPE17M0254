const { error } = require('console');
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();


app.engine('html', mustacheExpress()); //Estamos utilizando construtor do mustache vinculado a enssa engine chamada HTML
app.set('view engine', 'html') //Como rendirazado deve se utilizar a engine html
app.set('views', __dirname + '/views') //Verifica dentro das minhas pastas da aplicação para localizar.
app.use(express.urlencoded({extended: true})); //configuração para que o node faça a relação entre o que foi informado dentro da minha requisiçao


app.get('/', (req, res) => {
    
    res.render('index.html');
})

app.post('/dados', (req, res) => {
    const {nome, endereco, telefone, data_agendamento} = req.body;
    
    const agendamento = {
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        data_agendamento: data_agendamento
    };

    let erro_form = false;

    if(nome == "" || endereco == "" || telefone == "" || data_agendamento == ""){
        erro_form = true;
    }

    res.render("dados.html", {agendamento, erro_form}); //tudo aqui está sendo enviado para o renderizador
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Aplicação executada na porta: '+PORT);
})