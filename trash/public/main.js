//Project Name:
//Client Name:
//Author: Lilly Percival
//Dev @ RC in Boston

///-----------------------------------------------------------///
///---------------PSEUDO---CODE--------------------///
///---------------------------------------------------------///
//
//
//
//
//
//
//
//
//
//
///--------------------------------------------------------------------------------///
///~~~~~~~~~~~~~~~~~ACTUAL---CODE~~~~~~~~~~~~~~~~~~///
///-------------------------------------------------------------------------------///


var complete = document.getElementsByClassName("fa-check-circle");
var trash = document.getElementsByClassName("fa-trash");

Array.from(complete).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const order = this.parentNode.parentNode.childNodes[3].innerText
        const complete = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'order': order,
            '_id': _id
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data =>{
            speak("<%= messages[i].name %>" +" your order is complete!")
            // say a message
            // function speak(text, callback) {
            //     var u = new SpeechSynthesisUtterance();
            //     u.text = text;
            //     u.lang = 'en-US';
            //     u.onend = function () {
            //         if (callback) {
            //             callback();
            //         }
            //     };
            //     u.onerror = function (e) {
            //         if (callback) {
            //             callback(e);
            //         }
            //     };
            //     speechSynthesis.speak(u);
            // }
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});



Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const order = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'order': order,
            '_id': _id
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
