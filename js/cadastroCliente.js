// Added input value check on postback/load, removed floatLabel class from select input. Modified the scss, added color map.

(function ($) {
    function floatLabel(inputType) {
      $(inputType).each(function () {
        var $this = $(this);
        var text_value = $(this).val();
  
        // on focus add class "active" to label
        $this.focus(function () {
          $this.next().addClass("active");
        });
  
        // on blur check field and remove class if needed
        $this.blur(function () {
          if ($this.val() === '' || $this.val() === 'blank') {
            $this.next().removeClass();
          }
        });
  
        // Check input values on postback and add class "active" if value exists
        if (text_value != '') {
          $this.next().addClass("active");
        }
      });
  
      // Automatically remove floatLabel class from select input on load
      $("select").next().removeClass();
    }
    // Add a class of "floatLabel" to the input field
    floatLabel(".floatLabel");
  })(jQuery);
  
  
  // PASSO a PASSO
  $(document).ready(function () {
    var navListItems = $('div.setup-panel div a'),
      allWells = $('.setup-content'),
      allNextBtn = $('.nextBtn'),
      allPrevBtn = $('.prevBtn');
  
    allWells.hide();
  
    navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
        $item = $(this);
  
      if (!$item.hasClass('disabled')) {
        navListItems.removeClass('btn-indigo').addClass('btn-default');
        $item.addClass('btn-indigo');
        allWells.hide();
        $target.show();
        $target.find('input:eq(0)').focus();
      }
    });
  
    allPrevBtn.click(function () {
      var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        prevStepSteps = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
  
      prevStepSteps.removeAttr('disabled').trigger('click');
    });
  
    allNextBtn.click(function () {
      var curStep = $(this).closest(".setup-content"),
        curStepBtn = curStep.attr("id"),
        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
        curInputs = curStep.find("input[type='text'],input[type='url']"),
        isValid = true;
  
      $(".form-group").removeClass("has-error");
      for (var i = 0; i < curInputs.length; i++) {
        if (!curInputs[i].validity.valid) {
          isValid = false;
          $(curInputs[i]).closest(".form-group").addClass("has-error");
        }
      }
  
      if (isValid)
        nextStepWizard.removeAttr('disabled').trigger('click');
    });
  
    $('div.setup-panel div a.btn-indigo').trigger('click');
  });
  
  
  
  // VALIDACOES
  
  
  //  ------------------------------------ PRIMEIRA ETAPA ------------------------------------ 
  
      function validacoesFormularioPasso1() {
  
  
          // NOME 
          var nomeUsuario = document.querySelector("#nome");
          var errorUsuario = document.querySelector(".error-nomeUsuario");
  
          if (nomeUsuario.value == "") {
              errorUsuario.style.display = "block";
              return false;    
  
          } else {
              errorUsuario.style.display = "none";        
          }
  
  
          // CPF
          var cpfUsuario = document.querySelector("#cpf");
          var errorCPF = document.querySelector(".error-cpf");
  
          if (cpfUsuario.value == "") {
              errorCPF.style.display = "block";
              return false;    
  
              btnAvancarPasso1.disabled = true;
          }
          
  
          // REGISTRO GERAL
          var rgUsuario = document.querySelector("#rg");
          var errorRgUsuario = document.querySelector(".error-rg");
  
          if (rgUsuario.value == "") {
              errorRgUsuario.style.display = "block";
              return false;    
  
          } else {
              errorRgUsuario.style.display = "none";
          }
  
  
          // CELULAR
          var celularUsuario = document.querySelector("#celularUsuario");
          var errorCelularUsuario = document.querySelector(".error-celularUsuario");
  
          if (celularUsuario.value == "") {
              errorCelularUsuario.style.display = "block";
              btnAvancarPasso1.disabled = true;
              return false;    
  
          }else{
              errorCelularUsuario.style.display = "none";
              btnAvancarPasso1.disabled = false;
          }
  
  
          var btnAvancarPasso2 = document.querySelector(".btnAvancarPasso2");
          btnAvancarPasso2.disabled = false;
          
      }
  
      var btnAvancarPasso1 = document.querySelector(".btnAvancarPasso1");
     // btnAvancarPasso1.addEventListener("click", validacoesFormularioPasso1);
  
      if (validacoesFormularioPasso1) {
         // document.querySelector(".btAvancarPasso2").setAttribute("disabled", false);
      } 
  
  
  //  ------------------------------------ FIM PRIMEIRA ETAPA ------------------------------------ 
  
  
          function validacoesFormularioPasso2 () {
              var selects = document.querySelectorAll('#step-2 select');
  
              selects.forEach(select => {
                  select.addEventListener('change', event => {
                      console.log(event.target.value);
                  })
  
                  if (selects.value != "") {
                      console.log("que legal");
                      document.querySelector(".btAvancarPasso2").removeAttribute("disabled");
                  }
  
              })
          }  