## via Systemd (para sistemas Linux)
Se você estiver em um sistema Linux, você pode criar um serviço systemd para gerenciar sua aplicação Node.js. Isso permite que sua aplicação seja iniciada automaticamente na inicialização do sistema e seja gerenciada como um serviço do sistema.

Configuração do Systemd:

1. Crie ou edite o arquivo de serviço do Systemd em /etc/systemd/system/previewImages.service com o seguinte conteúdo:

    [Unit]
    Description=Preview Images Node.js App
    After=network.target

    [Service]
    ExecStart=/usr/bin/node /var/www/html/icons/app.js
    WorkingDirectory=/var/www/html/icons
    Restart=always
    User=www-data
    Group=www-data
    Environment=PATH=/usr/bin:/usr/local/bin
    Environment=NODE_ENV=production
    LimitNOFILE=10000

    [Install]
    WantedBy=multi-user.target

Para criar: 

    sudo nano /etc/systemd/system/previewImages.service

2. Recarregue o systemd para reconhecer o novo serviço:

    sudo systemctl daemon-reload

3. Inicie o serviço:

    sudo systemctl start meu-app

4. Habilite o serviço para iniciar automaticamente na inicialização:

    sudo systemctl enable meu-app

5. Verifique o status do serviço:

    sudo systemctl status meu-app

6. Visualize os logs do serviço:
    
    journalctl -u meu-app


Observações
- User e Group: O User=www-data e Group=www-data são configurados para o usuário e grupo típicos usados por servidores web. Se seu ambiente usa um usuário diferente para executar o Node.js, ajuste conforme necessário.
- ExecStart: Certifique-se de que o caminho para o node e o arquivo app.js estão corretos. Se o node estiver em um local diferente, ajuste o caminho em ExecStart.
- Permissões: Certifique-se de que o usuário especificado (neste caso, www-data) tem permissões adequadas para acessar o diretório /var/www/html/icons e o arquivo app.js.