 function ValidateForEmpty(InputControlID, DivControlID, ErrorMessage) {
        var refToInputControl = document.getElementById(InputControlID);
        var refToDivError = document.getElementById(DivControlID);

        if (refToInputControl.value == "") {
          refToDivError.innerText = ErrorMessage;
        } else {
          refToDivError.innerText = "";
          console.log(refToInputControl.value);
        }
      }
