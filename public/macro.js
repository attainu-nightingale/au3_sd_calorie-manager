console.log('hellow')
$('#macros').click(function(){
    var p=parseFloat($('#proteins').val());
    var c=parseFloat($('#carbs').val());
    var f=parseFloat($('#fats').val());
    var macro=((p*4)+(c*4)+(f*9));
    console.log(macro);
    $('#kcal').val(macro+" "+"Kcal"+" "+"-"+"total  consumption");
    // $('#resultCal').show();

});
$('#bmr').click(function(){
    var w=parseFloat($('#weight').val());
    var h=parseFloat($('#height').val());
    var age=parseFloat($('#age').val());
    var gen=$("input[name='gender']:checked").val();
    var activity=$("input[name='act']:checked").val();    
    var BMR=0;
    var res=0;
if (gen == "male"){
   res = 10*w + 6.25*h*100 - 5*age + 5;
  if(activity==0){
      BMR=res*1.2;
  }
  else if(activity==1){
      BMR=res*1.375;
  }
  else if(activity==2){
      BMR=res*1.55;
  }
  else if(activity==3){
      BMR=res*1.725;
  }
  else if(activity==4){
      BMR=res*1.9;
  }
}
else{
   res = 10*w + 6.25*h*100 - 5*age -161;
  if(activity==0){
    BMR=res*1.2;
}
else if(activity==1){
    BMR=res*1.375;
}
else if(activity==2){
    BMR=res*1.55;
}
else if(activity==3){
    BMR=res*1.725;
}
else if(activity==4){
    BMR=res*1.9;
}

}
var string = " "+"Your BMR is " + res + " and you must consume " + BMR + " calories to maintain your current weight"
var string1="Your body will burn " + res + " calories each day if you engage in no activity for that day. The estimate for maintaining your current weight (based upon your chosen activity level) is " + BMR + " calories. "
$('#daily').val(string);
$('#dailyBmr').val(string1);
$('#bmrRes').show();
$('#summary').show();
console.log(string);
})
