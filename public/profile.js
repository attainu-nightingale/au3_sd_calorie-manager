$(document).on("click","#ename",function(){
    $('#name').show();
    $('#cname').show();
  });
  $(document).on("click","#eml",function(){
    $('#mail').show();
    $('#cmail').show();

  });
  $(document).on("click","#edob",function(){
    $('#dob').show();
    $('#cdob').show();

  });
  $(document).on("click","#egen",function(){
    $('#gender').show();
    $('#csex').show();


  });
  $(document).on("click","#ewh",function(){
    $('#wh').show();
    $('#cwh').show();

  });
  $(document).on("click","#estat",function(){
    $('#status').show();
    $('#cstat').show();

  });
//   cross button
  $(document).on("click","#cname",function(){
    $('#name').hide();
    $('#cname').hide();
  });
  $(document).on("click","#cmail",function(){
    $('#mail').hide();
    $('#cmail').hide();

  });
  $(document).on("click","#csex",function(){
    $('#gender').hide();
    $('#csex').hide();

  });
  $(document).on("click","#cwh",function(){
    $('#wh').hide();
    $('#cwh').hide();

  });
  $(document).on("click","#cdob",function(){
    $('#dob').hide();
    $('#cdob').hide();

  });
  $(document).on("click","#cstat",function(){
    $('#status').hide();
    $('#cstat').hide();

  });

