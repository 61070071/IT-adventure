<!DOCTYPE html>
<html>
<head>
	<title>
		Unit 5 - A1 - 6107071
	</title>
	<style type="text/css">
	body {
		font-family: sans-serif;
		background-image:url("img/wp2763910.gif");
		background-size: cover;
	}
	h1,h2,h3{
		text-align:center;
		text-transform:uppercase;
		color: #fff;
	}
	game{
		display:block;
		margin:2em auto;
		background:red;
		width:400px;
		height:400px;
		position:relative;
		border-radius:10px;
		overflow:hidden;
	}
	pit{
		display:block;
		background:rgba(188, 187, 240, 0.87);
		width:100px;
		height:100px;
		position:absolute;
		left:0px;
		top:0px;
	}



	/*  แก้เฉพาะด้านล่างเอง */

	pit[y="1"]{
		top:100px;
	}
	pit[y="2"]{
		top:200px;
	}
	pit[y="3"]{
		top:300px;
	}
	pit[x="1"]{
		left:100px;
	}
	pit[x="2"]{
		left:200px;
	}
	pit[x="3"]{
		left:300px;
	}

	pit[status="mole"]{
		background-image:url("img/XLII.gif");
		background-size: cover;
	}
	pit[status="die"]{
		background-image:url("img/DDm.gif");
		background-size: cover;
	}
	pit[status="miss"]{
		background-image:url("img/3MGp.gif");
		background-size: cover;
	}

</style>
</head>
<body>
	<h1>click now!!!</h1>
	<h3 id="subTitle">loading...</h3>


	<!-- ตัวนับถอยหลัง -->
	<h2>time left: <span id="theTime">10</span> </h2>

	<!-- 
		กล่องตารางเกม
		สถานะของตุ่นที่จะอยู่ใน pit ได้แก่
		1.blank (ไม่มีตุ่น) 2.mole (มีตุ่น) 3.die (ตีโดน) 4.miss (ตีผิด)
	-->
	<game>
		<pit x="0" y="0" status="blank" onclick="hit(this)"></pit>
		<pit x="1" y="0" status="blank" onclick="hit(this)"></pit>
		<pit x="2" y="0" status="blank" onclick="hit(this)"></pit>
		<pit x="3" y="0" status="blank" onclick="hit(this)"></pit>
		<pit x="0" y="1" status="blank" onclick="hit(this)"></pit>
		<pit x="1" y="1" status="blank" onclick="hit(this)"></pit>
		<pit x="2" y="1" status="blank" onclick="hit(this)"></pit>
		<pit x="3" y="1" status="blank" onclick="hit(this)"></pit>
		<pit x="0" y="2" status="blank" onclick="hit(this)"></pit>
		<pit x="1" y="2" status="blank" onclick="hit(this)"></pit>
		<pit x="2" y="2" status="blank" onclick="hit(this)"></pit>
		<pit x="3" y="2" status="blank" onclick="hit(this)"></pit>
		<pit x="0" y="3" status="blank" onclick="hit(this)"></pit>
		<pit x="1" y="3" status="blank" onclick="hit(this)"></pit>
		<pit x="2" y="3" status="blank" onclick="hit(this)"></pit>
		<pit x="3" y="3" status="blank" onclick="hit(this)"></pit>
	</game>
	<!-- นับคะแนน -->
	<h2>score: <span id="theScore">0</span></h2>




	<script>
	// เรียกกล่อง pit ทุก pit มาให้ js ใช้งาน
	pits = document.querySelectorAll('pit');

	// เวลาในการเตรียมตัว (s)
	preparing = 3;
	// ระยะเวลาที่ตุ่นจะเกิด (ms)
	birth = 1000;
	// ระยะเวลาที่ตุ่นจะอยู่รอโดนตี (ms)
	delay = 3000;

	//ฟังก์ชันหลังโหลดเว็บเสร็จ จะนับถอยหลัง 5 วินาที แล้วเริ่มเกม
	function ready(){
		// คะแนนเริ่มต้น
		score = 0;
		// เวลาในการเล่นเกม (s)
		time = 15;

		// รีเซ็ทเวลา
		updateTime();
		// รีเซ็ทคะแนนให้คนดู
		updatScore();
		// reset ทุกหลุมให้ว่าง
		for (var i = 0; i < pits.length; i++) {
			pits[i].setAttribute("status","blank");
		}

		for (let i = 0; i < preparing; i++) {
			setTimeout(
				function(){
					console.log(i);
					subTitle.innerText = "Ready! Game start in "+(preparing-i);
				},i*1000);
		}
		// หมดเวลาเตรียมตัว เรื่มเกมได้!
		setTimeout(
			function(){
				subTitle.innerText = "Play!";
				countdown();
				reloadMole();
			}
			,preparing*1000);
	}

	// สำหรับสั่งให้เวลาลด
	function countdown(){
		// ทุกๆ 1 วินาที เวลาต้องลด
		cd = setInterval(
			function(){
				// ถ้ายังไม่หมดเวลา
				if (time > 0) {
					// ลดเวลา
					time--;
					// อัพเดทเวลา
					updateTime();
				}
				// ถ้าหมดเวลา
				else{
					clearInterval(cd);
					console.log("END");
				}
			}
			,1000)
	}

	// ฟังก์ชันเกม โดยจะคอยเรียกตัวเองจนกว่าจะตาย หลักการคือ ทุกๆ เวลา birth จะมีตุ่นโผล่หน้ามา โดยสุ่มว่าจะเกิดที่ไหน จากนั้นจะรอใหโดนตีตามเวลา delay ถ้าหมดเวลา delay ยังไม่โดนตี จะหายไป 
	function reloadMole(){
		// ถ้าเวลาไม่หมด ให้ทำตามนี
		if (time>0) {
			// สุ่มเลขหลุมที่จะเกิด ตั้งแต่เลข 0 ถึง 15
			var randomPit = Math.floor(Math.random() * 16);

			// ตั้ง status ให้หลุมที่สุ่มได้ เป็นตุ่นโผล่มา
			pits[randomPit].setAttribute("status","mole");

			// ตั้งเวลาว่า เมื่อหมดเวลา ตุ่นจะหายไป
			setTimeout(
				function(){
					// ถ้าเวลายังไม่หมด ตุ่่นจะหาย
					if (time>0) {
						pits[randomPit].setAttribute("status","blank");
					}
				}
				,delay);
			// กำหนดหน่วงเวลาไว้ พอหมดเวลา ให้แรนดอมตุ่นออกมาต่ออีกรอบ
			setTimeout(
				function(){
				// เรียกตัวเอง
				reloadMole()
			}
			,birth);
		}
	}
var j=1;
    // สำหรับการตี
    function hit(pit){
    	// ตีได้ต่อเมื่อไม่หมดเวลา
    	if (time>0) {
    		// ดูว่า  status ตอนนี้คืออะไร
    		var status = pit.getAttribute("status");
    		// ถ้าตีโดนตุ่น ปรับเป็น die
    		if (status == "mole") {
    			pit.setAttribute("status","die");
    			// กดถูกได้คะแนน
    			score++;
				time++;
				if(birth>=400){
				birth-=10;
				}

    		} 
    		// ถ้าตีโดน blank จะกลายเป็น miss
    		else if(status == "blank"){
    			pit.setAttribute("status","miss");
    			// กดิดติดลบ
				time-=j;
				j++;
				setTimeout(
					function(){
						pit.setAttribute("status","blank");
					},1000
				);
			}
    		// แสดงคะแนนให้คนดู
    		updatScore();
    	}
    }

    // สำรหรับโชว์คะแนน
    function updatScore(){
    	// แสดงคะแนนให้คนดู
    	theScore.innerText = score;
    }

    //สำหรับโชว์เวลา
    function updateTime(){
    	// แสดงเวลา
    	theTime.innerText = time;

    	// ถ้าหมดเวลา ให้บอก
    	if (time <= 0) {
			alert("GAME OVER!!!");
    		subTitle.innerHTML = "Time out! <a href='#!' onclick='ready()'>play again</a>";
    	}
    }



    ready();
</script>
</body>
</html> 
