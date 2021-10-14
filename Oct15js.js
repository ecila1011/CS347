// this will initilaize some varibles needed in the tick function
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

// this is the function that actually controls the display and deletion of the text
TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    // changes text value depending on whether we are adding or deleting
    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // I think that this is for formatting
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    // initialize some delta to use for the timeout funciton
    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    // I think that this is used to smooth out the animation and/or make it 
    // seem a bit more realistic and not as stiff
    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    // set the timeout before going back to the function to display the next phrase
    setTimeout(function() {
    that.tick();
    }, delta);
};

// This function executes when the browser loads the object
window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');

    // for every element i in the class typewrite
    for (var i=0; i<elements.length; i++) {

        // gets the current element of the data array for the given element i
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');

        // if toRotate is not null, send it to get typed
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // implement CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};