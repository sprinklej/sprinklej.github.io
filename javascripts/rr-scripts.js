$(document).ready(function(){  
  var hands = [
    "1 - Two sets of 3",
    "2 - One set of 3 & one run of 4",
    "3 - Two runs of 4",
    "4 - Three sets of 3",
    "5 - Two sets of 3 & one run of 4",
    "6 - One set of 3 & two runs of 4",
    "7 - Three runs of 4",
    "8 - Two sets of 3 & one run of 7"
  ];
  
  var nameTxtFld = "<div contenteditable='true' placeholder='Player Name' class='editableName'></div>";
  
  var leftBtn = "<button class='btn btn-primary btn-xs btn-left' type='button'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span></button>";
  
  var rightBtn = "<button class='btn btn-primary btn-xs btn-right' type='button'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span></button>";
  
  var plusBtn = "<button class='btn btn-primary btn-xs btn-plus' type='button'><span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span></button>";
  
  var plusTxtFld = "<div contenteditable='true' placeholder='000' class='editableNmbrs'></div>";
  
  // add player
  $("#addRowBtn").click(function(){
    var playerNm = "<td>" + nameTxtFld + "</td>";
    var hand = "<td class='cntrcells leftbtncells'>" + leftBtn + "</td><td class='handCells cntrcells'>" + hands[0] + "</td><td class='cntrcells'>" + rightBtn + "</td>";
    var score = "<td>" + plusTxtFld + "</td><td>" + plusBtn + "</td><td>" + 0 + "</td>";
    var remove = "<td><button class='btn btn-danger btn-xs' type='button'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></td>";
    
    var newRow = "<tr>" + playerNm + hand + score + remove + "</tr>";
    $(".playerTable").append(newRow);
  });
  
  // left
  $(".playerTable").on("click", ".btn-left", function(){
    var curHand = $(this).closest('td').next('td').text();
    var index = hands.indexOf(curHand);
    
    if (index > 0) {
      curHand = hands[index-1];
      $(this).closest('td').next('td').html(curHand);
    }
  }); 
  
  // right
  $(".playerTable").on("click", ".btn-right", function(){
    var curHand = $(this).closest('td').prev('td').text();
    var index = hands.indexOf(curHand);

    if (index < hands.length-1) {
      curHand = hands[index+1];
      $(this).closest('td').prev('td').html(curHand);
    }
  }); 
  
  // add score
  $(".playerTable").on("click", ".btn-plus", function(){
    var addScore = parseInt($(this).closest('td').prev('td').text());
    if (isNaN(addScore)) {
      alert("That is not a number");
      $(this).closest('td').prev('td').html(plusTxtFld);
      return;
    }
    var curScore = parseInt($(this).closest('td').next('td').text());
    
    $(this).closest('td').prev('td').html(plusTxtFld);
    $(this).closest('td').next('td').html(addScore + curScore);
  }); 
  
  // add score using the return key
  $(".playerTable").keypress(function (e) {
    if (e.which == 13 && document.activeElement.getAttribute('class') === "editableNmbrs") {
      var addScore = parseInt($(document.activeElement).text());
      if (isNaN(addScore)) {
        alert("That is not a number");
        $(document.activeElement).closest('td').html(plusTxtFld);
        return false;
      }

      var curScore = parseInt($(document.activeElement).closest('td').next('td').next('td').text());

      $(document.activeElement).closest('td').next('td').next('td').html(addScore + curScore);
      $(document.activeElement).closest('td').html(plusTxtFld);
    }
  });
  
  
  // remove player
  $(".playerTable").on("click", ".btn-danger", function(){
    $(this).parents('tr').first().remove();
  }); 

});


