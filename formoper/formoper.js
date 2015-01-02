//获取某节点下所有form元素的取值,并组织好key,value形式返回
function formParams(obj){                                                                                                                    
    var postParams = {};
    
    //$(".maskContainer input").each(function(){
    obj.find("input").each(function(){
        
        if($(this).attr('type') != 'file' && $(this).attr('type') != 'submit'){
            
            if($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio' ){
                if($(this).is(':checked') == true){
                    postParams[$(this).attr('name')] = $(this).val();
                }
            }else{
                postParams[$(this).attr('name')] = $(this).val();
            }
        }
    });
    
    //$(".maskContainer select").each(function(){
    obj.find("select").each(function(){
        postParams[$(this).attr('name')] = $(this).val();
    }); 
    
    obj.find("textarea").each(function(){
        postParams[$(this).attr('name')] = $(this).val();
    });
    
    
    return postParams;
}


//更新表单的现有元素值
function updateFormValues(obj, jsonData){

    obj.find("input").each(function(){

        if($(this).attr('type') == 'file'){
            //处理text文本框
            if(jsonData[$(this).attr('name')]){
                //$(this).val(jsonData[$(this).attr('name')]);
                $(this).prev().attr('src', '/f/p?n='+jsonData[$(this).attr('name')]);
            }   
        } 
        
        if($(this).attr('type') == 'text'){
            //处理text文本框
            if(jsonData[$(this).attr('name')] != ''){
                $(this).val(jsonData[$(this).attr('name')]);
            }   
        }   
            
        if($(this).attr('type') == 'checkbox'){
            //处理checkbox radio
            if(jsonData[$(this).attr('name')] == 1){ 
                $(this).attr('checked', 1); 
            }   
        }   
            
        if($(this).attr('type') == 'radio'){
            if(jsonData[$(this).attr('name')] == $(this).val()){
                $(this).attr('checked', 1); 
            }   
        }   
            
    }); 
        
    obj.find("select").each(function(){
        //处理select框
        //console.debug($(this).attr('name'));

        if((jsonData[$(this).attr('name')] - 0) == 0 || jsonData[$(this).attr('name')] == null ||  jsonData[$(this).attr('name')] == undefined){
            $(this).val("-1");
        }else{
            $(this).val(jsonData[$(this).attr('name')]);
        }   
            
    }); 


    obj.find("textarea").each(function(){
        //处理select框
        //console.debug($(this).attr('name'));
       /* 
        if((jsonData[$(this).attr('name')] - 0) == 0 || jsonData[$(this).attr('name')] == null ||  jsonData[$(this).attr('name')] == undefined){

        }else{
            $(this).val(jsonData[$(this).attr('name')]);
        }
       */
        
        if(jsonData[$(this).attr('name')]){
            $(this).val(jsonData[$(this).attr('name')]);
        }    
        
    });

}


//清空表单的现有元素值
function clearFormValues(obj){

    obj.find("input").each(function(){
                                
        if($(this).attr('type') == 'text'){
            //处理text文本框
            $(this).val('');
        }   
            
        if($(this).attr('type') == 'checkbox'){
            
            //处理checkbox radio
            if($(this).is(':checked')){
                $(this).removeAttr('checked');
            }
            
        }   
            
        if($(this).attr('type') == 'radio'){
            //处理checkbox radio
            if($(this).is(':checked')){
                $(this).removeAttr('checked');
            }
        }
        
        if($(this).attr('type') == 'file'){
            //处理checkbox radio
            $(this).prev().attr('src', '/static/images/back/upload.png');
        } 
            
    }); 
        
    obj.find("select").each(function(){
        //处理select框
        $(this).val("-1");
    }); 


    obj.find("textarea").each(function(){
        //处理select框
        //console.debug($(this).attr('name'));
        $(this).val('');
        
    });
}
