function Client()
{
    this.msgCont;
    this.sendField;
    this.sendBtn;
    this.sendCont;
    this.sock;

    THIS = this;

    this.Init = () =>
    {
        this.sock = io();
        this.sock.on("message", (msg) =>
        {
            this.AddMessage(msg, 1);
        });

        this.sendCont = document.getElementsByClassName("SendCont")[0];
        this.msgCont = document.getElementsByClassName("MsgCont")[0];
        this.sendField = document.getElementsByClassName("SendField")[0];
        this.sendField.addEventListener("keydown", (e) =>
        {
            if(e.keyCode == 13 && !e.shiftKey)
            {
                this.SendMessage(this.sendField.value, 0);
                this.AddMessage(this.sendField.value, 0);
                setTimeout(() => { this.sendField.value = ""; }, 0.01);
                this.msgCont.scrollTop = this.msgCont.scrollHeight;
            }
        });
        this.sendBtn = document.getElementsByClassName("SendButton")[0];
    }

    /**
     * @description Отправляет сообщение указанному чату
     * @param {string} Text Текст сообщения
     * @param {string} To ID чата
     */
    this.SendMessage = (Text, To) =>
    {
        this.sock.send(Text);
    };

    /**
     * @description Добавляет новое сообщение в бокс сообщений
     * @param {string} Text Текст сообщения
     * @param {number} Sender Отправитель(0-я, 1-др клиент)
     */
    this.AddMessage = (Text, Sender) =>
    {
        var br = document.createElement("br");
        this.msgCont.appendChild(br);

        var msg = document.createElement("span");
        msg.innerHTML = Text;
        msg.className = "Msg";
        if (Sender == 0)
            msg.style.backgroundColor = "#e6ffff";
        else msg.style.backgroundColor = "#fff1f1";
        this.msgCont.appendChild(msg);
        
    };

    this.Init();
}