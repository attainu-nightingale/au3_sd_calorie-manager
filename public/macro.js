console.log('hellow')
$('#macros').click(function(){
    var p=parseFloat($('#proteins').val());
    var c=parseFloat($('#carbs').val());
    var f=parseFloat($('#fats').val());
    var macro=((p*4)+(c*4)+(f*9));
    console.log(macro);
    $('#kcal').val(macro+" "+"kcal");
});
