function sendAjax(method, url, data, callbackSuccess, callbackError){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);    
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');     

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;

      if (this.status != 200) {
        console.log( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
        callbackError(xhr);
        return;
      }
      callbackSuccess(xhr);
    }

    xhr.send('param=' + JSON.stringify(data));
}

function clearForm(){
  document.getElementById("fname").value = "";
  document.getElementById("forg").value = "";
  document.getElementById("femail").value = "";
  document.querySelector("[for=fname]").classList.remove("mdc-textfield__label--float-above");
  document.querySelector("[for=forg]").classList.remove("mdc-textfield__label--float-above");
  document.querySelector("[for=femail]").classList.remove("mdc-textfield__label--float-above");
}

function createMap(){
  var map = L.map('map')
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  map.fitBounds([
      [55.740588, 37.609245],
      [55.740588, 37.609245]
  ], {
      paddingBottomRight: [100, 0],
      maxZoom: 16
  });
  map.scrollWheelZoom.disable();

  var customIcon = L.icon({
      iconUrl: './img/custom-marker.svg',
      shadowUrl: './img/custom-marker-shadow.png',
      iconSize:     [38, 49], // size of the icon
      shadowSize:   [54, 61], // size of the shadow
      iconAnchor:   [19, 49], // point of the icon which will correspond to marker's location
      shadowAnchor: [24, 45],  // the same for the shadow
  });
  L.marker([55.740588, 37.609245], { icon: customIcon}).addTo(map);
}

document.addEventListener("DOMContentLoaded", function() {
  var dialog = new mdc.dialog.MDCDialog(document.querySelector('#mdc-dialog-default')),
      errorDialog = new mdc.dialog.MDCDialog(document.querySelector('#mdc-dialog-error'));
      
  document.getElementById("registration").addEventListener("submit", function(e){
    e.preventDefault();

    var formData = {
      name: document.getElementById("fname").value,
      org: document.getElementById("forg").value,
      email: document.getElementById("femail").value
    };

    sendAjax('post', 'register.php', formData, 
      function(xhr){
        if (xhr.responseText != "0"){
          clearForm();          
          dialog.show();
        } else {
          errorDialog.show()
        }
      },
      function(xhr){
        errorDialog.show()
      }
    );
  });

  createMap();
});