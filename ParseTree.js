//DFT
 var esprima = require('esprima'); 
 var recast= require('recast');
 var fs = require('fs');
 var estraverse = require('estraverse');
 var path = require('path')
 //Read from file list
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
    		 	   
    		 	});
    		 console.log(token.length);
    		 fs.appendFileSync('inputtoken.txt', token.join(' ')+'\n', 'utf8');    
    	 })
          }
     });
console.log("Finished")
