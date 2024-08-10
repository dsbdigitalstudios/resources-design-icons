## via node

### Instalação e Configuração do PM2:

1. Instale o PM2 globalmente:

    npm install -g pm2

2. Inicie sua aplicação com o PM2:

    pm2 start app.js --name "meu-app"

O --name é opcional e permite dar um nome à sua aplicação para facilitar a identificação.

3. Verifique o status da aplicação:

pm2 status

4. Visualize os logs da aplicação:

    pm2 logs

5. Configure o PM2 para iniciar sua aplicação automaticamente após reinicializações do sistema:

    pm2 startup

Isso gerará um comando que você precisará copiar e colar no terminal para configurar o PM2 para iniciar automaticamente.

6. Salve o estado atual das aplicações para que o PM2 possa restaurá-las após reinicializações:

    pm2 save

7. Para parar ou reiniciar sua aplicação:

    pm2 stop meu-app
    pm2 restart meu-app