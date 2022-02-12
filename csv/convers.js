function convert(csv,options){options||(options={});if(csv.length==0)throw errorEmpty;var separator=options.separator||detectSeparator(csv);if(!separator)throw errorDetectingSeparator;var a=[];try{var a=csvParser.parse(csv,pegjsSeparatorNames[separator]);}catch(error){var start=csv.lastIndexOf('\n',error.offset),end=csv.indexOf('\n',error.offset),line=csv.substring(start>=-1?start:0,end>-1?end:csv.length);throw error.message+' On line '+error.line+' and column '+error.column+'.\n'+line;}
if(options.transpose)a=zip.apply(this,a);var keys=a.shift();if(keys.length==0)throw errorEmptyHeader;keys=keys.map(function(key){return key.trim().replace(/(^")|("$)/g,'');});keys=uniquify(keys);var json=options.hash?{}:[];for(var l=0;l<a.length;l++){var row={},hashKey;for(var i=0;i<keys.length;i++){var value=(a[l][i]||'').trim().replace(/(^")|("$)/g,'');var number=value===""?NaN:value-0;if(options.hash&&i==0){hashKey=value;}
else{if(options.parseJSON||options.parseNumbers&&!isNaN(number)){try{row[keys[i]]=JSON.parse(value);}catch(error){row[keys[i]]=value;}}
else{row[keys[i]]=value;}}}
if(options.hash)
json[hashKey]=row;else
json.push(row);}
return json;};var csvParser=(function(){function quote(s){return'"'+s.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\x08/g,'\\b').replace(/\t/g,'\\t').replace(/\n/g,'\\n').replace(/\f/g,'\\f').replace(/\r/g,'\\r').replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)
+'"';}
var result={parse:function(input,startRule){var parseFunctions={"comma":parse_comma,"semicolon":parse_semicolon,"tab":parse_tab,"sv":parse_sv,"line":parse_line,"field":parse_field,"char":parse_char};if(startRule!==undefined){if(parseFunctions[startRule]===undefined){throw new Error("Invalid rule name: "+quote(startRule)+".");}}else{startRule="comma";}
var pos=0;var reportFailures=0;var rightmostFailuresPos=0;var rightmostFailuresExpected=[];function padLeft(input,padding,length){var result=input;var padLength=length-input.length;for(var i=0;i<padLength;i++){result=padding+result;}
return result;}
function escape(ch){var charCode=ch.charCodeAt(0);var escapeChar;var length;if(charCode<=0xFF){escapeChar='x';length=2;}else{escapeChar='u';length=4;}
return'\\'+escapeChar+padLeft(charCode.toString(16).toUpperCase(),'0',length);}
function matchFailed(failure){if(pos<rightmostFailuresPos){return;}
if(pos>rightmostFailuresPos){rightmostFailuresPos=pos;rightmostFailuresExpected=[];}
rightmostFailuresExpected.push(failure);}
function parse_comma(){var result0,result1;var pos0,pos1;pos0=pos;pos1=pos;result0=(function(offset){return separator=',';})(pos)?"":null;if(result0!==null){result1=parse_sv();if(result1!==null){result0=[result0,result1];}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}
if(result0!==null){result0=(function(offset,sv){return sv;})(pos0,result0[1]);}
if(result0===null){pos=pos0;}
return result0;}
function parse_semicolon(){var result0,result1;var pos0,pos1;pos0=pos;pos1=pos;result0=(function(offset){return separator=';';})(pos)?"":null;if(result0!==null){result1=parse_sv();if(result1!==null){result0=[result0,result1];}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}
if(result0!==null){result0=(function(offset,sv){return sv;})(pos0,result0[1]);}
if(result0===null){pos=pos0;}
return result0;}
function parse_tab(){var result0,result1;var pos0,pos1;pos0=pos;pos1=pos;result0=(function(offset){return separator='\t';})(pos)?"":null;if(result0!==null){result1=parse_sv();if(result1!==null){result0=[result0,result1];}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}
if(result0!==null){result0=(function(offset,sv){return sv;})(pos0,result0[1]);}
if(result0===null){pos=pos0;}
return result0;}
function parse_sv(){var result0,result1,result2,result3,result4;var pos0,pos1,pos2,pos3;pos0=pos;pos1=pos;result0=[];if(/^[\n\r]/.test(input.charAt(pos))){result1=input.charAt(pos);pos++;}else{result1=null;if(reportFailures===0){matchFailed("[\\n\\r]");}}
while(result1!==null){result0.push(result1);if(/^[\n\r]/.test(input.charAt(pos))){result1=input.charAt(pos);pos++;}else{result1=null;if(reportFailures===0){matchFailed("[\\n\\r]");}}}
if(result0!==null){result1=parse_line();if(result1!==null){result2=[];pos2=pos;pos3=pos;if(/^[\n\r]/.test(input.charAt(pos))){result4=input.charAt(pos);pos++;}else{result4=null;if(reportFailures===0){matchFailed("[\\n\\r]");}}
if(result4!==null){result3=[];while(result4!==null){result3.push(result4);if(/^[\n\r]/.test(input.charAt(pos))){result4=input.charAt(pos);pos++;}else{result4=null;if(reportFailures===0){matchFailed("[\\n\\r]");}}}}else{result3=null;}
if(result3!==null){result4=parse_line();if(result4!==null){result3=[result3,result4];}else{result3=null;pos=pos3;}}else{result3=null;pos=pos3;}
if(result3!==null){result3=(function(offset,data){return data;})(pos2,result3[1]);}
if(result3===null){pos=pos2;}
while(result3!==null){result2.push(result3);pos2=pos;pos3=pos;if(/^[\n\r]/.test(input.charAt(pos))){result4=input.charAt(pos);pos++;}else{result4=null;if(reportFailures===0){matchFailed("[\\n\\r]");}}
if(result4!==null){result3=[];while(result4!==null){result3.push(result4);if(/^[\n\r]/.test(input.charAt(pos))){result4=input.charAt(pos);pos++;}else{result4=null;if(reportFailures===0){matchFailed("[\\n\\r]");}}}}else{result3=null;}
if(result3!==null){result4=parse_line();if(result4!==null){result3=[result3,result4];}else{result3=null;pos=pos3;}}else{result3=null;pos=pos3;}
if(result3!==null){result3=(function(offset,data){return data;})(pos2,result3[1]);}
if(result3===null){pos=pos2;}}
if(result2!==null){result3=[];if(/^[\n\r]/.test(input.charAt(pos))){result4=input.charAt(pos);pos++;}else{result4=null;if(reportFailures===0){matchFailed("[\\n\\r]");}}
while(result4!==null){result3.push(result4);if(/^[\n\r]/.test(input.charAt(pos))){result4=input.charAt(pos);pos++;}else{result4=null;if(reportFailures===0){matchFailed("[\\n\\r]");}}}
if(result3!==null){result0=[result0,result1,result2,result3];}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}
if(result0!==null){result0=(function(offset,first,rest){rest.unshift(first);return rest;})(pos0,result0[1],result0[2]);}
if(result0===null){pos=pos0;}
return result0;}
function parse_line(){var result0,result1,result2,result3,result4;var pos0,pos1,pos2,pos3;pos0=pos;pos1=pos;result0=parse_field();if(result0!==null){result1=[];pos2=pos;pos3=pos;if(input.length>pos){result2=input.charAt(pos);pos++;}else{result2=null;if(reportFailures===0){matchFailed("any character");}}
if(result2!==null){result3=(function(offset,char){return char==separator;})(pos,result2)?"":null;if(result3!==null){result4=parse_field();if(result4!==null){result2=[result2,result3,result4];}else{result2=null;pos=pos3;}}else{result2=null;pos=pos3;}}else{result2=null;pos=pos3;}
if(result2!==null){result2=(function(offset,char,text){return text;})(pos2,result2[0],result2[2]);}
if(result2===null){pos=pos2;}
while(result2!==null){result1.push(result2);pos2=pos;pos3=pos;if(input.length>pos){result2=input.charAt(pos);pos++;}else{result2=null;if(reportFailures===0){matchFailed("any character");}}
if(result2!==null){result3=(function(offset,char){return char==separator;})(pos,result2)?"":null;if(result3!==null){result4=parse_field();if(result4!==null){result2=[result2,result3,result4];}else{result2=null;pos=pos3;}}else{result2=null;pos=pos3;}}else{result2=null;pos=pos3;}
if(result2!==null){result2=(function(offset,char,text){return text;})(pos2,result2[0],result2[2]);}
if(result2===null){pos=pos2;}}
if(result1!==null){result2=(function(offset,first,rest){return!!first||rest.length;})(pos,result0,result1)?"":null;if(result2!==null){result0=[result0,result1,result2];}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}
if(result0!==null){result0=(function(offset,first,rest){rest.unshift(first);return rest;})(pos0,result0[0],result0[1]);}
if(result0===null){pos=pos0;}
return result0;}
function parse_field(){var result0,result1,result2;var pos0,pos1,pos2;pos0=pos;pos1=pos;if(input.charCodeAt(pos)===34){result0="\"";pos++;}else{result0=null;if(reportFailures===0){matchFailed("\"\\\"\"");}}
if(result0!==null){result1=[];result2=parse_char();while(result2!==null){result1.push(result2);result2=parse_char();}
if(result1!==null){if(input.charCodeAt(pos)===34){result2="\"";pos++;}else{result2=null;if(reportFailures===0){matchFailed("\"\\\"\"");}}
if(result2!==null){result0=[result0,result1,result2];}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}
if(result0!==null){result0=(function(offset,text){return text.join('');})(pos0,result0[1]);}
if(result0===null){pos=pos0;}
if(result0===null){pos0=pos;result0=[];pos1=pos;pos2=pos;if(/^[^\n\r]/.test(input.charAt(pos))){result1=input.charAt(pos);pos++;}else{result1=null;if(reportFailures===0){matchFailed("[^\\n\\r]");}}
if(result1!==null){result2=(function(offset,char){return char!=separator;})(pos,result1)?"":null;if(result2!==null){result1=[result1,result2];}else{result1=null;pos=pos2;}}else{result1=null;pos=pos2;}
if(result1!==null){result1=(function(offset,char){return char;})(pos1,result1[0]);}
if(result1===null){pos=pos1;}
while(result1!==null){result0.push(result1);pos1=pos;pos2=pos;if(/^[^\n\r]/.test(input.charAt(pos))){result1=input.charAt(pos);pos++;}else{result1=null;if(reportFailures===0){matchFailed("[^\\n\\r]");}}
if(result1!==null){result2=(function(offset,char){return char!=separator;})(pos,result1)?"":null;if(result2!==null){result1=[result1,result2];}else{result1=null;pos=pos2;}}else{result1=null;pos=pos2;}
if(result1!==null){result1=(function(offset,char){return char;})(pos1,result1[0]);}
if(result1===null){pos=pos1;}}
if(result0!==null){result0=(function(offset,text){return text.join('');})(pos0,result0);}
if(result0===null){pos=pos0;}}
return result0;}
function parse_char(){var result0,result1;var pos0,pos1;pos0=pos;pos1=pos;if(input.charCodeAt(pos)===34){result0="\"";pos++;}else{result0=null;if(reportFailures===0){matchFailed("\"\\\"\"");}}
if(result0!==null){if(input.charCodeAt(pos)===34){result1="\"";pos++;}else{result1=null;if(reportFailures===0){matchFailed("\"\\\"\"");}}
if(result1!==null){result0=[result0,result1];}else{result0=null;pos=pos1;}}else{result0=null;pos=pos1;}
if(result0!==null){result0=(function(offset){return'"';})(pos0);}
if(result0===null){pos=pos0;}
if(result0===null){if(/^[^"]/.test(input.charAt(pos))){result0=input.charAt(pos);pos++;}else{result0=null;if(reportFailures===0){matchFailed("[^\"]");}}}
return result0;}
function cleanupExpected(expected){expected.sort();var lastExpected=null;var cleanExpected=[];for(var i=0;i<expected.length;i++){if(expected[i]!==lastExpected){cleanExpected.push(expected[i]);lastExpected=expected[i];}}
return cleanExpected;}
function computeErrorPosition(){var line=1;var column=1;var seenCR=false;for(var i=0;i<Math.max(pos,rightmostFailuresPos);i++){var ch=input.charAt(i);if(ch==="\n"){if(!seenCR){line++;}
column=1;seenCR=false;}else if(ch==="\r"||ch==="\u2028"||ch==="\u2029"){line++;column=1;seenCR=true;}else{column++;seenCR=false;}}
return{line:line,column:column};}
var separator=',';var result=parseFunctions[startRule]();if(result===null||pos!==input.length){var offset=Math.max(pos,rightmostFailuresPos);var found=offset<input.length?input.charAt(offset):null;var errorPosition=computeErrorPosition();throw new this.SyntaxError(cleanupExpected(rightmostFailuresExpected),found,offset,errorPosition.line,errorPosition.column);}
return result;},toSource:function(){return this._source;}};result.SyntaxError=function(expected,found,offset,line,column){function buildMessage(expected,found){var expectedHumanized,foundHumanized;switch(expected.length){case 0:expectedHumanized="end of input";break;case 1:expectedHumanized=expected[0];break;default:expectedHumanized=expected.slice(0,expected.length-1).join(", ")
+" or "
+expected[expected.length-1];}
foundHumanized=found?quote(found):"end of input";return"Expected "+expectedHumanized+" but "+foundHumanized+" found.";}
this.name="SyntaxError";this.expected=expected;this.found=found;this.message=buildMessage(expected,found);this.offset=offset;this.line=line;this.column=column;};result.SyntaxError.prototype=Error.prototype;return result;})();if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports){exports=module.exports=convert;}
exports.csv2json=convert;}else{this.CSVJSON||(this.CSVJSON={});this.CSVJSON.csv2json=convert;}}).call(this);
// js/csvjson/json2csv.js
(function(){var errorMissingSeparator='Missing separator option.',errorEmpty='JSON is empty.',errorEmptyHeader='Could not detect header. Ensure first row contains your column headers.',errorNotAnArray='Your JSON must be an array or an object.',errorItemNotAnObject='Item in array is not an object: {0}';function flattenArray(array,ancestors){ancestors||(ancestors=[]);function combineKeys(a,b){var result=a.slice(0);if(!Array.isArray(b))return result;for(var i=0;i<b.length;i++)
if(result.indexOf(b[i])===-1)result.push(b[i]);return result;}
function extend(target,source){target=target||{};for(var prop in source){if(typeof source[prop]==='object'){target[prop]=extend(target[prop],source[prop]);}else{target[prop]=source[prop];}}
return target;}
var rows=[];for(var i=0;i<array.length;i++){var o=array[i],row={},orows={},count=1;if(o!==undefined&&o!==null&&(!isObject(o)||Array.isArray(o)))
throw errorItemNotAnObject.replace('{0}',JSON.stringify(o));var keys=getKeys(o);for(var k=0;k<keys.length;k++){var value=o[keys[k]],keyChain=combineKeys(ancestors,[keys[k]]),key=keyChain.join('.');if(Array.isArray(value)){orows[key]=flattenArray(value,keyChain);count+=orows[key].length;}else{row[key]=value;}}
if(count==1){rows.push(row);}else{var keys=getKeys(orows);for(var k=0;k<keys.length;k++){var key=keys[k];for(var r=0;r<orows[key].length;r++){rows.push(extend(extend({},row),orows[key][r]));}}}}
return rows;}
function isObject(o){return o&&typeof o=='object';}
function getKeys(o){if(!isObject(o))return[];return Object.keys(o);}
function convert(data,options){options||(options={});if(!isObject(data))throw errorNotAnArray;if(!Array.isArray(data))data=[data];var separator=options.separator||',';if(!separator)throw errorMissingSeparator;var flatten=options.flatten||false;if(flatten)data=flattenArray(data);var allKeys=[],allRows=[];for(var i=0;i<data.length;i++){var o=data[i],row={};if(o!==undefined&&o!==null&&(!isObject(o)||Array.isArray(o)))
throw errorItemNotAnObject.replace('{0}',JSON.stringify(o));var keys=getKeys(o);for(var k=0;k<keys.length;k++){var key=keys[k];if(allKeys.indexOf(key)===-1)allKeys.push(key);var value=o[key];if(value===undefined&&value===null)continue;if(typeof value=='string'){row[key]='"'+value.replace(/"/g,options.output_csvjson_variant?'\\"':'""')+'"';if(options.output_csvjson_variant)row[key]=row[key].replace(/\n/g,'\\n');}else{row[key]=JSON.stringify(value);if(!options.output_csvjson_variant&&(isObject(value)||Array.isArray(value)))
row[key]='"'+row[key].replace(/"/g,'\\"').replace(/\n/g,'\\n')+'"';}}
allRows.push(row);}
keyValues=[];for(var i=0;i<allKeys.length;i++){keyValues.push('"'+allKeys[i].replace(/"/g,options.output_csvjson_variant?'\\"':'""')+'"');}
var csv=keyValues.join(separator)+'\n';for(var r=0;r<allRows.length;r++){var row=allRows[r],rowArray=[];for(var k=0;k<allKeys.length;k++){var key=allKeys[k];rowArray.push(row[key]||(options.output_csvjson_variant?'null':''));}
csv+=rowArray.join(separator)+(r<allRows.length-1?'\n':'');}
return csv;}
if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports){exports=module.exports=convert;}
exports.json2csv=convert;}else{this.CSVJSON||(this.CSVJSON={});this.CSVJSON.json2csv=convert;}}).call(this);
// js/csvjson/sql2json.js
(function(){var errorEmpty="Please upload a file or type in something.",inQuotes=new RegExp(/(^`.*`$)|(^'.*'$)|(^".*"$)/);function convert(sql){if(sql.length==0)throw errorEmpty;var matches=[];sql=sql.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm,'$1').replace(/^--.*[\r\n]/gm,"").replace(/^\s*[\r\n]/gm,"").replace(/;\s*[\r\n]/gm,";;").replace(/[\r\n]/gm," ").replace(/;;\s?/gm,";\n").replace(/(["'])(?:(?=(\\?))\2.)*?\1/g,function(m){matches.push(_.trim(m,"'\""));return"'{{"+(matches.length-1)+"}}'";});var lines=_.lines(sql);if(lines.length==0)throw errorEmpty;var tables={},l,line;try{for(l=0;l<lines.length;l++){line=lines[l],words=_.words(line);if(!words.length)continue;if(words.length>=3&&words[0].toUpperCase()=='CREATE'&&words[1].toUpperCase()=='TABLE'){var i=2;while(!words[i].match(inQuotes)&&i<words.length)i++;if(i>=words.length)throw"Cannot find table name in CREATE TABLE statement.";var name=_.trim(words[i],"`'\"");tables[name]={header:[],values:[]};var values=_(line).chain().strRight("(").strLeftBack(")").words(",").value();tables[name].header=_.reduce(values,function(result,value){var words=_.words(value);if(!words.length)
throw"Cannot find columns for table "+name;var first=_.trim(words[0]);if(_.startsWith(first,"'")||_.startsWith(first,"`")||_.startsWith(first,'"'))
result.push(_.trim(first,"`'\""));return result;},[]);if(!tables[name].header.length)throw"No columns found for table "+name;}
else if(words.length>=4&&words[0].toUpperCase()=='INSERT'&&words[1].toUpperCase()=='INTO'&&words[2].match(inQuotes)&&words[3].toUpperCase()=='VALUES'){var name=_.trim(words[2],"`'\"");if(!tables[name])
throw"Table "+name+" was not defined in a CREATE TABLE.";var table=tables[name];var i=3;while(words[i].toUpperCase()!='VALUES'&&i<words.length)i++;if(i==words.length||words[i].toUpperCase()!='VALUES')
throw"Error parsing INSERT INTO statement. Cannot find VALUES."
i+=1;if(i==words.length)
throw"Error parsing INSERT INTO statement. No values found after VALUES.";var records=_.trim(words.slice(i).join(" ")).replace(/(\))\s*,\s*(\()/g,"),(").replace(/^\(/,"").replace(/\)\s*;?$/,"").replace(/\(\s*(NULL)\s*/gi,'({{NULL}}').replace(/,\s*(NULL)\s*/gi,',{{NULL}}').split("),(");_.each(records,function(str){var values=_.words(str,",");tables[name].values.push(_.map(values,function(value){return _.trim(value," `'\"");}));});}
else if(words.length>=4&&words[0].toUpperCase()=='INSERT'&&words[1].toUpperCase()=='INTO'&&words[2].match(inQuotes)&&_.startsWith(words[3],"(")){var name=_.trim(words[2],"`'\"");if(!tables[name])
throw"Table "+name+" was not defined in a CREATE TABLE.";var table=tables[name];var i=3;while(words[i].toUpperCase()!='VALUES'&&i<words.length)i++;if(i==words.length||words[i].toUpperCase()!='VALUES')
throw"Error parsing INSERT INTO statement. Cannot find VALUES."
var cols=_.map(words.slice(3,i),function(value){return _.trim(value,"\(\), `'\"");});if(!cols.length)
throw"Error parsing INSERT INTO statement. No column names found for table "+name+" in "+words[3];words[3]
i+=1;if(i==words.length)
throw"Error parsing INSERT INTO statement. No values found after VALUES.";var records=_.trim(words.slice(i).join(" ")).replace(/(\))\s*,\s*(\()/g,"),(").replace(/^\(/,"").replace(/\)\s*;?$/,"").replace(/\(\s*(NULL)\s*/gi,'({{NULL}}').replace(/,\s*(NULL)\s*/gi,',{{NULL}}').split("),(");_.each(records,function(str){var values=_.words(str,",");if(values.length!=cols.length)
throw"Error parsing INSERT INTO statement. Values "+str+" does not have the same number of items as columns "+words[3];var record={};_.each(tables[name].header,function(col){var index=_.indexOf(cols,col),value=index!=-1?_.trim(values[index]," `'\""):null;record[col]=value;});tables[name].values.push(_.values(record));});}}}catch(error){throw"Error: "+error+"\n..."+line;}
var objects={};_.each(tables,function(table,name){var keys=table.header;objects[name]=_.map(table.values,function(values){var o={};for(var k=0;k<keys.length;k++){o[keys[k]]=typeof values[k]=='string'?values[k].replace(/^{{([0-9]+)}}$/,function(m,i){return matches[i];}):values[k];if(o[keys[k]]=='{{NULL}}')o[keys[k]]=null;}
return o;});});return objects;}
this.CSVJSON||(this.CSVJSON={});this.CSVJSON.sql2json=convert;}).call(this);
// js/csvjson/json_beautifier.js
(function(){function walkObjectAndDropQuotesOnNumbers(object){if(!isObject(object))return;var keys=Object.keys(object);if(!keys)return;keys.forEach(function(key){var value=object[key];if(typeof value=='string'){var number=value-0;object[key]=isNaN(number)?value:number;}else if(isObject(value)||Array.isArray(value)){walkObjectAndDropQuotesOnNumbers(value);}});}
function isObject(o){return o&&typeof o=='object';}
function inlineShortArraysInResult(result,width){width||(width=80);if(typeof width!='number'||width<20){throw"Invalid width '"+width+"'. Expecting number equal or larger than 20."}
var list=result.split('\n'),i=0,start=null,content=[];while(i<list.length){var startMatch=!!list[i].match(/\[/),endMatch=!!list[i].match(/\],?/);if(startMatch&&!endMatch){content=[list[i]];start=i;}else if(endMatch&&!startMatch&&start){content.push((list[i]||'').trim());var inline=content.join(' ');if(inline.length<width){list.splice(start,i-start+1,inline);i=start;}
start=null;content=[];}else{if(start)content.push((list[i]||'').trim());}
i+=1;}
return list.join('\n');}

// function convert(object,options){var space=options.space||2,dropQuotesOnKeys=options.dropQuotesOnKeys||false,dropQuotesOnNumbers=options.dropQuotesOnNumbers||false,inlineShortArrays=options.inlineShortArrays||false,inlineShortArraysDepth=options.inlineShortArraysDepth||1,quoteType=options.quoteType||'double',minify=options.minify||false;if(dropQuotesOnNumbers)walkObjectAndDropQuotesOnNumbers(object);var result=JSON2_mod.stringify(object,null,minify?undefined:space,dropQuotesOnKeys,quoteType);if(inlineShortArrays&&!minify){var width=typeof inlineShortArrays=='number'?inlineShortArrays:80;var newResult=inlineShortArraysInResult(result,width);if(inlineShortArraysDepth>1){for(var i=1;i<inlineShortArraysDepth;i++){result=newResult;newResult=inlineShortArraysInResult(result,width);if(newResult==result)break;}}
// result=newResult;}
// return result;};var JSON2_mod;if(typeof exports!=='undefined'){if(typeof module!=='undefined'&&module.exports){exports=module.exports=convert;}
// JSON2_mod=require('json2-mod');exports.json_beautifier=convert;}else{JSON2_mod=window.JSON2_mod;this.CSVJSON||(this.CSVJSON={});this.CSVJSON.json_beautifier=convert;}}).call(this);
// // js/csvjson/csvjson2json.js
// (function(){var errorEmpty="Please upload a file or type in something.",errorEmptyHeader="Could not detect header. Ensure first row cotains your column headers.";function convert(csv,options){options||(options={});if(csv.length==0)throw errorEmpty;var lines=csv.split(/\r?\n/),a=[];for(var l=0;l<lines.length;l++){try{var line=JSON.parse('['+lines[l]+']');}catch(error){throw'Malformed JSON on line '+l+': '+error+'\n'+lines[l];}
// a.push(line)}
// var keys=a.shift(),noHeaderKeysUseIndex=false,indices=[];if(keys.length==0)throw errorEmptyHeader;for(var i=0;i<keys.length;i++){if(!_.isString(keys[i]))noHeaderKeysUseIndex=true;indices.push(i);}
// if(noHeaderKeysUseIndex){a.unshift(keys);keys=indices;options.noHeaderKeysUseIndex=true;}
// var json=[];for(var l=0;l<a.length;l++){var row={};for(var i=0;i<keys.length;i++){row[keys[i]]=a[l][i];}
// json.push(row);}
// return json;};this.CSVJSON||(this.CSVJSON={});this.CSVJSON.csvjson2json=convert;}).call(this);
