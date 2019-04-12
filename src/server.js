const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});



//__________________________________________________
// Essa expressao ajuda ao servidor express entender
// as requisicoes que trafegam em formato JSON.
app.use(express.json());
//__________________________________________________
 

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-kncyp.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true 
});


app.use((req, res, next) => {
    req.io = io;
    return next();
});

 

//Essa expressao ativa a permissao para envio de arquivos no trafego das requisicoes.
app.use(express.urlencoded({extended: true}));


app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// Essa expressao registra todas as rotas desta aplicação dentro do servidor express.
// Esclarecendo que o require está importando o modulo './routes' já que o mesmo está sendo
// exportado em outro modulo.
app.use(require('./routes'));
//_________________________________________________________________________________________


server.listen(process.env.PORT || 3333);