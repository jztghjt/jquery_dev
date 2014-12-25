跨域的例子
==========

在浏览器上访问192.168.1.18/test.html,test.html异步请求chester.com/test.php,从而达到跨域,整个过程需要js和服务端的配合,如果服务端不输出,那么没法进行跨域传值

原理是一样的，只不过我们不需要手动的插入script标签以及定义回掉函数。jquery会自动生成一个全局函数来替换callback=?中的问号，之后获取到数据后又会自动销毁，实际上就是起一个临时代理函数的作用。$.getJSON方法会自动判断是否跨域，不跨域的话，就调用普通的ajax方法；跨域的话，则会以异步加载js文件的形式来调用jsonp的回调函数。


原理：

在js中，我们直接用XMLHttpRequest请求不同域上的数据时，是不可以的。但是，在页面上引入不同域上的js脚本文件却是可以的，jsonp正是利用这个特性来实现的。
比如，有个a.html页面，它里面的代码需要利用ajax获取一个不同域上的json数据，假设这个json数据地址是http://example.com/data.php,那么a.html中的代码就可以这样：

< script >
function dosomething(jsondata){

}
< /script >
< /script src="http://example.com/data.php?callback=dosomething" >< /script >

我们看到获取数据的地址后面还有一个callback参数，按惯例是用这个参数名，但是你用其他的也一样。当然如果获取数据的jsonp地址页面不是你自己能控制的，就得按照提供数据的那一方的规定格式来操作了。
因为是当做一个js文件来引入的，所以http://example.com/data.php返回的必须是一个能执行的js文件，所以这个页面的php代码可能是这样的:

<?php

$callback = $_GET['callback']; //得到回调函数名
$data = array('a','b','c'); //要返回的数据
echo $callback.'('.json_encode($data).')';//输出
最终那个页面输出的结果是:
dosomething(['a','b','c']);

所以通过http://example.com/data.php?callback=dosomething得到的js文件，就是我们之前定义的dosomething函数,并且它的参数就是我们需要的json数据，这样我们就跨域获得了我们需要的数据。
这样jsonp的原理就很清楚了，通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。所以jsonp是需要服务器端的页面进行相应的配合的。
知道jsonp跨域的原理后我们就可以用js动态生成script标签来进行跨域操作了，而不用特意的手动的书写那些script标签。如果你的页面使用jquery，那么通过它封装的方法就能很方便的来进行jsonp操作了。
