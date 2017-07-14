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
          document.getElementById("fname").value = "";
          document.getElementById("forg").value = "";
          document.getElementById("femail").value = "";
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
});