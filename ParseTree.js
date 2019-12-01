//DFT
 var esprima = require('esprima'); 
 var recast= require('recast');
 var fs = require('fs');
 var estraverse = require('estraverse');
 var path = require('path')
 //此处应该从文件列表中读取文件
 var filePath = path.resolve('inputfiles');
 fs.readdir(filePath,function(err,files){
     if(err){
         console.warn(err)
     }else{
    	 files.forEach(function(filename){
    		
    		 var token = [];
    		 var file = path.join(filePath,filename);
    		 var code = fs.readFileSync(file, { encoding: 'utf8' });  
    		 try{
    		  var AST = esprima.parseScript(code); 
   			 //'var AST = recast.parse(code);
    		 }catch(err){
    			 try{
    			 var AST = esprima.parseModule(code,{},{}); 
    			 }catch(err){
    				console.log(filename);
    				return;
    			 }
    			 //return;
    		 }
    		 estraverse.traverse(AST, {
    		 	    enter: function (node, parent) {
    		 	    //变量声明的三种情况
    		 	    	    if(node.type == 'VariableDeclaration'){
    		 	    	    	token = token.concat(node.type,node.kind);
    		 	    	    	return
    		 	    	     
    		 	    	    }
    		 	    	    if(node.type == 'Identifier'){
    		 	                token =  token.concat(node.type,node.name);
    		 	           	    return
    		 	               
    		 	    	    }
    		 	    	    if(node.type == 'Literal'){
    		 	    	    	token  = token.concat(node.type,node.value)
    		 	    	    	return
    		 	    	    }
    		 	            //对于二元表达式
    		 	    	    if(node.type == 'BinaryExpression'){
    		 	    	    	token = token.concat(node.type,node.operator)
    		 	    	   	return
    		 	    	    }
    		 	    	    //other expressions
    		 	    	    if(node.tyep == 'AssigmentExpression'){
    		 	    	    	token = token.concat(node.type,node.operator)
    		 	    	   	return
    		 	    	    	}
    		 	    	    if(node.type == 'UpdateExpression'){
    		 	    	    	token = token.concat(node.type,node.operator)
    		 	    	   	return
    		 	    	    }
    		 	    	    //declarations about classes
    		 	    	    if(node.type == 'ClassMethod'){
    		 	    	    	token = token.concat(node.type,node.kind)
    		 	    	   	return
    		 	    	    }
    		 	    	    if(node.type == 'MethodDefinition'){
    		 	    	    	token = toke.concat(node.tyep,node.kind)
    		 	    	    	return 
    		 	    	    }
    		 	            token = token.concat(node.type);
    		 	    },
    		 	    leave(node){
    		 	    	
    		 	    }
    		 	   
    		 	});//输的遍历结束
    	
    		 //移除第一个元素 program
    		 token.shift();
    		 //删除指定的元素 VariableDeclaration
//    		 token = token.filter(function(item){
//    			 return item !='VariableDeclaration';
//    		 })
    		 console.log(token.length);
    		 if(token.length>500){
    			 token = token.slice(0,500);
    		 }
//取token的前100的字符序列
    		 //console.log(token.length);
    		 //join 以空格的形式将数组连接起来
    		 fs.appendFileSync('inputtoken.txt', token.join(' ')+'\n', 'utf8');    
    	 })
          }
     });
console.log("Finished")