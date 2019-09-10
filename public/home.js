$('#calculate').click(function(){
    var w=parseFloat($('#weight').val());
    console.log(w);
    var h=parseFloat($('#height').val());
    console.log(h);
    var r=Math.floor(w/Math.pow(h,2))
    $('#result').val(r);
    console.log(r);
    $('#report').attr('disabled', false)
});
$('#report').click(function(){
    var objID={
        _id:$(this).val()
    }
    var data={
        weight:$('#weight').val(),
        height:$('#height').val(),
        bmiValue:$('#result').val()
    }
    console.log(data);

$.ajax({
    url:'/home/bmi/'+objID._id,
    type:'PUT',
    contentType:'application/json',
    data:JSON.stringify(data),
    dataType:'json',
    success: function(message){
        alert(message)

    }
})
window.location.replace('/home/bmiReport');

});

