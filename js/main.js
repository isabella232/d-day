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
      maxZoom: 15
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

  var polyline = L.polyline([ 
[ 55.745499518378509, 37.603694467133479], 
[ 55.746016360719018, 37.604484536510412], 
[ 55.746015578600137, 37.604668816609333], 
[ 55.745965843365937, 37.604777135210362], 
[ 55.745861908382722, 37.604991932153325], 
[ 55.745750178779865, 37.605192062490353], 
[ 55.745712667511668, 37.605115170639031], 
[ 55.745673683898076, 37.605091128874164], 
[ 55.745238250192678, 37.604202457145], 
[ 55.744980811748334, 37.604893593740265 ], 
[ 55.745067572538957, 37.605113627992573 ], 
[ 55.745109115374916, 37.605395631296503 ], 
[ 55.745123696446022, 37.605625771120309], 
[ 55.745103287751029, 37.605797996242913 ], 
[ 55.745030121843911, 37.6061315909934], 
[ 55.744922602873828, 37.606333394081673 ], 
[ 55.744787185606519, 37.606496500870577 ], 
[ 55.744670073726134, 37.606565499424626 ], 
[ 55.744497382479601, 37.606580983686101], 
[ 55.74435748801622, 37.606509439535344 ], 
[ 55.744237863861471, 37.606426409216596 ], 
[ 55.743080243438691, 37.609513734259799 ], 
[ 55.743029842032712, 37.60966205840198 ], 
[ 55.743077428302335, 37.6097301531669 ],
[ 55.743020999599885, 37.609880018851847 ], 
[ 55.743051604617499, 37.609910456517298 ], 
[ 55.743094844841046, 37.609797895301725 ], 
[ 55.743004636380064, 37.609677399560177 ], 
[ 55.742941800483813, 37.609660674292527 ],
[ 55.742881490371431, 37.609638983378623 ], 
[ 55.742854574280976, 37.60961574279839 ], 
[ 55.742768101624414, 37.609509120577464 ], 
[ 55.742754913906104, 37.609429805148181 ], 
[ 55.742774921881619, 37.609315224918511 ],
[ 55.742829612775424, 37.60923666115211 ],
[ 55.742752413248056, 37.60919877603866 ], 
[ 55.742452653628249, 37.60908626547203 ], 
[ 55.741733180296158, 37.608853189274782 ],
[ 55.741669307573737, 37.60888887190707 ], 
[ 55.741489411573085, 37.608837015056373 ],
[ 55.741456355255487, 37.608750821017189 ],
[ 55.740925973318433, 37.60865124148318 ], 
[ 55.740918652152381, 37.608845532872621 ], 
[ 55.740918509099139, 37.609001054535753 ], 
[ 55.740841914171497, 37.609215439902201 ], 
[ 55.74068272010134,  37.60904901878417] ], 
{
  color: '#03A9F4',
  weight: 4,
  dashArray: "12px 12px"
}).addTo(map);
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