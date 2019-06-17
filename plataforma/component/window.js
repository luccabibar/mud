function window_mud(){
    //variable window
    var window = document.createElement('section');
    var header = document.createElement('header');
    var h2 = document.createElement('h2');
    var divAuxiliar = document.createElement('div')
    var buttonMinim = document.createElement('button');
    var buttonMaxim = document.createElement('button');
    var buttonClose = document.createElement('button');
    var sectionInternal = document.createElement('section');
    var footer = document.createElement('footer');
    var iMin = document.createElement('i');
    var iMax = document.createElement('i');
    var iClo = document.createElement('i');
    //
    this.SetAppendChild = setAppendChild;
    this.Create = create;
    this.Construtor = construtor;
    this.SetElementAttribute = setElementAttribute;
    this.SetText = setText;
    //adiciona elementos
    function setElementAttribute(element,attribute,value){element.setAttribute(attribute,value);}
    function setAppendChild(father,child){father.appendChild(child);}
    function setText(father,text){let s=document.createTextNode(text);father.appendChild(s);}
    function create(element)
    {
        this.SetAppendChild(window,header);
        this.SetAppendChild(window,sectionInternal);
        this.SetAppendChild(window,footer);
        //
        this.SetAppendChild(header,h2);
        this.SetAppendChild(header,divAuxiliar);
        //
        this.SetAppendChild(buttonMinim,iMin);
        this.SetAppendChild(buttonMaxim,iMax);
        this.SetAppendChild(buttonClose,iClo);
        //
        this.SetAppendChild(divAuxiliar,buttonMinim);
        this.SetAppendChild(divAuxiliar,buttonMaxim);
        this.SetAppendChild(divAuxiliar,buttonClose);
        //
        let father = document.querySelector(element);
        this.SetAppendChild(father, window);
    }
    function construtor(father)
    {
      this.Create(father);
      this.SetElementAttribute(window,'class','component-window');
      this.SetElementAttribute(header,'class','window-header');
      this.SetElementAttribute(iMin,'class','fas fa-minus-circle');
      this.SetElementAttribute(iMax,'class','fas fa-window-restore');
      this.SetElementAttribute(iClo,'class','fas fa-times-circle');
      this.SetElementAttribute(sectionInternal,'class','window-contains-content');
      this.SetElementAttribute(footer,'class','window-footer');
      this.SetText(h2,'MENU');
    }
}
 