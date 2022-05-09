class ToDo{ 

    //
        static PRIORITY = {
            Low: {order: 0, name: 'bassa', color: 'green'},
            Medium: {order: 1, name: 'media', color: 'yellow'},
            High: {order: 2, name: 'alta', color: 'orange'},
            Max: {order: 3, name: 'molto alta', color: 'red'}, 
            // expired: {order: -1, name: 'scaduta', color: 'grey'}
        }  
    
    //  tags non sono obbligatori, quindi li metto in array vuoto;
        constructor(name, priority = ToDo.PRIORITY.Low, tags = []){
            this.name = name;
            this._priority = priority;
            this.tags = tags; 
            this._creationDate = new Date().getTime(); 
    //  new Date() rende data in cui è stata fatta operazione; getTime() trasforma new Date in millisecondi; 
    //  "_" prima di proprietà indica agli altri di non toccarla/renderla disponibile a tutti;
        } 
    
        set priority(newPriority){ 
    this._priority = newPriority;
        }
    
        get priority(){ 
            return this._priority;
        }
    //  trasforma da numerone in millisecondi in formato mm/gg/yyyy
        get creationDate(){ 
            const date = new Date(this._creationDate); 
            return date;
        } 
    
    //  per modificare _creationDate, così sono sicuro che ci sia numerone millisecondi, che può essere lavorato; 
    //  ricreo proprietà con "_" in maniera che possa lavorarla in maniera sicura; 
    //  il "date" che lavoro in "set" è lo stesso dal "return" di "get"; ma lo lavoro in proprietà sicura;
        set creationDate(newDate){ 
            const timeStamp = newDate.getTime(); 
            this._creationDate = timeStamp;
        }
    
        toString(){ 
            const toDoString = 'ToDo: ' + this.name + '\n' +
                               'priority: ' + this.priority.name + '\n' +
                               'tags: ' + this.tags + '\n' + 
                               'Data di creazione: ' + this.creationDate; 
            return  toDoString;
        } 
    //  quando funzione è statica, può essere richiamata senza chiamare oggetto; funziona anche senza oggetto; 
    
    // static getFormattedDate(date){
    //     const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(); 
    //     return dateString;
    // } 
    //  funzione per formattare data;
    }