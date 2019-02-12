var GLB = GLB || {};
GLB.isMobile = {
    android : function() {
	    return /Android/i.test(navigator.userAgent);
    },
    blackBerry : function() {
	    return /BlackBerry/i.test(navigator.userAgent);
    },
    ios : function() {
	    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    windows : function() {
	    return /IEMobile/i.test(navigator.userAgent);
    },
    any : function() {
	    return (isMobile.android() || isMobile.blackBerry() || isMobile.ios() || isMobile.windows());
    }
};

GLB.isWeixin = function() {
	ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
};

GLB.isWeiBo = function() {
	ua = navigator.userAgent.toLowerCase();
	if (ua.match(/WeiBo/i) == "weibo") {
		return true;
	} else {
		return false;
	}
};

GLB.isQQ = function() {
	ua = navigator.userAgent.toLowerCase();
	if (ua.match(/QQ/i) == "qq") {
		return true;
	} else {
		return false;
	}
};

GLB.createElement = function(name, attr) {
	var dom = document.createElement(name);
	for ( var i in attr) {
		dom.setAttribute(i, attr[i]);
	}
	return dom;
};

GLB.bindIframeLoad = function(iframe, fn) {
	if (iframe.attachEvent) {
		iframe.attachEvent("onload", function() {
			fn();
		});
	} else {
		iframe.onload = function() {
			fn();
		};
	}
	return iframe;
};

GLB.rtrim = function(str, r) {
	if (!!!str || str.length === 0)
		return "";
	if (typeof r == 'undefined') {
		str = str.substring(0, str.length - 1);
	} else {
		var l = str.lastIndexOf(r);
		if (l > 0)
			str = str.substring(0, l);
	}
	return str;
};


;
(function(global) {

	function getDigits(num) {
		var digits = 0, parts = num.toString().split(".");

		if (parts.length === 2) {
			digits = parts[1].length;
		}

		return digits;
	}

	function toFixed(num, digits) {
		if (typeof digits == 'undefined') {
			return num;
		}

		return Number(num).toFixed(digits);
	}

	var MathKit = {
	    /*
		 * 函数，加法函数，用来得到精确的加法结果
		 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
		 * 参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
		 * 调用：MathKit.Add(arg1,arg2,d) 返回值：两数相加的结果
		 */
	    Add : function(arg1, arg2, digits) {
		    arg1 = arg1.toString();
		    arg2 = arg2.toString();

		    var maxLen = Math.max(getDigits(arg1), getDigits(arg2)), m = Math.pow(10, maxLen), result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));

		    return toFixed(result, digits);
	    },
	    /*
		 * 函数：减法函数，用来得到精确的减法结果 说明：函数返回较为精确的减法结果。
		 * 参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
		 * 调用：MathKit.Sub(arg1,arg2) 返回值：两数相减的结果
		 */
	    Sub : function(arg1, arg2, digits) {
		    return MathKit.Add(arg1, -Number(arg2), digits);
	    },
	    /*
		 * 函数：乘法函数，用来得到精确的乘法结果 说明：函数返回较为精确的乘法结果。
		 * 参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
		 * 调用：MathKit.Mul(arg1,arg2) 返回值：两数相乘的结果
		 */
	    Mul : function(arg1, arg2, digits) {
		    // 数字化
		    var num1 = parseFloat(arg1).toString(), num2 = parseFloat(arg2).toString(), m = getDigits(num1) + getDigits(num2);

		    var result = num1.replace(".", "") * num2.replace(".", "") / Math.pow(10, m);

		    return toFixed(result, digits);
	    },
	    /*
		 * 函数：除法函数，用来得到精确的除法结果 说明：函数返回较为精确的除法结果。
		 * 参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
		 * 调用：MathKit.Div(arg1,arg2) 返回值：arg1除于arg2的结果
		 */
	    Div : function(arg1, arg2, digits) {
		    // 数字化
		    var num1 = parseFloat(arg1).toString(), num2 = parseFloat(arg2).toString(), t1 = getDigits(num1), t2 = getDigits(num2), result = num1.replace(".", "") / num2.replace(".", "") * Math.pow(10, t2 - t1);
		    return toFixed(result, digits);
	    }
	};

	// AMD / RequireJS
	if (typeof define !== 'undefined' && define.amd) {
		define(function() {
			return MathKit;
		});
		return;
	}
	// Node.js
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = MathKit;
		return;
	}

	global.MathKit = MathKit;
})(this);

var showMsg=function(msg){
	var setting ={
			showTime:2
	};
	var divObj = null;
	var showdiv=document.getElementById("show_msg_id_div");
	if(showdiv!=null){
		return;
	}
	divObj = document.createElement('div');
	divObj.id="show_msg_id_div";
	divObj.innerHTML = msg;
	divObj.style.border='1xp solid #333333';
	divObj.style.background='rgba(51,51,51,0.9)';
	divObj.style.color='#FFFFFF';
	divObj.style.display='block';
	divObj.style.padding = '0.3rem 0.5rem';
	divObj.style.borderRadius = '0.1rem';
	divObj.style.fontSize = '0.4rem';
	divObj.style.boxShadow = '1px 1px 10px #333333';
	document.body.appendChild(divObj);
	var vWidth = document.documentElement.clientWidth;
	var vHeight = document.documentElement.clientHeight;
	divObj.style.position = 'fixed';
	divObj.style.zIndex = '9999';
	divObj.style.left = ((vWidth/2)-(divObj.offsetWidth/2))+'px';
	divObj.style.top = ((vHeight/1.2)-(divObj.offsetHeight/2))+'px';
	setTimeout(function () {
		document.body.removeChild(divObj);
	}, setting.showTime*1000);
};