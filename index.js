// ref the speach api
let synth = window.speechSynthesis;
// define the answers array
let theAnswers = [];
let correctAns = "";
// define the audio elements.
let audio1 = new Audio("sounds/telephone-ring-02.mp3");
let audio2 = new Audio(
	"sounds/116390__dean-raul-diarchangeli__answering-machine.wav"
);
// define the vue app
let app = new Vue({
	el: "#app",
	data: {
		questions: [],
		theQuestion: "",
		message1: "",
		message2: "",
		message3: "",
		message4: "",
		message5: "",
		correctAns: correctAns,
		quesIdx: 0,
		play: false,
		previous_active_id: 1,
		currId: 14,
		// set the items values
		items: [
			{ level: "15", amount: "1,000,000" },
			{ level: "14", amount: "500,000" },
			{ level: "13", amount: "250,000" },
			{ level: "12", amount: "100,000" },
			{ level: "11", amount: "50,000" },
			{ level: "10", amount: "25,000" },
			{ level: "9", amount: "16,000" },
			{ level: "8", amount: "8,000" },
			{ level: "7", amount: "4,000" },
			{ level: "6", amount: "2,000" },
			{ level: "5", amount: "1,000" },
			{ level: "4", amount: "500" },
			{ level: "3", amount: "300" },
			{ level: "2", amount: "200" },
			{ level: "1", amount: "100" }
		]
	},
	// fetch the questions from the api
	async created() {
		const res = await fetch(
			"https://opentdb.com/api.php?amount=15&type=multiple"
		);
		const data = await res.json();
		this.questions = data.results;
		console.log(this.questions);
		this.qDisplay();
		this.shuffleThem();
	},
	computed: {
		computedClass() {
			let className = "default";
			return className;
		}
	},
	watch: {
		// watch for changes in the vue elements
		quesIdx() {
			this.qDisplay();
		},
		theAnswers() {
			this.fillanswers();
		}
	},
	methods: {
		decodeHtml(html) {
			var txt = document.createElement("textarea");
			txt.innerHTML = html;
			return txt.value;
		},
		begin() {
			this.play = true;
			this.fillanswers();
			this.speakMe(this.message5);
		},
		qDisplay() {
			this.parseQuestion();
			this.shuffleThem();
		},
		parseQuestion() {
			// parse the json object and decode special chars
			this.theQuestion = this.decodeHtml(this.questions[this.quesIdx].question);
			correctAns = this.decodeHtml(this.questions[this.quesIdx].correct_answer);
			this.correctAns = this.decodeHtml(
				this.questions[this.quesIdx].correct_answer
			);
		},
		shuffleThem() {
			theAnswers = [
				this.questions[this.quesIdx].correct_answer,
				...this.questions[this.quesIdx].incorrect_answers
			];
			// randomize the answer order
			theAnswers.sort(() => Math.random() - 0.5);
			console.log(theAnswers);
		},
		fillanswers: function() {
			// display the answers in the block and speak the question and answers
			this.message5 = this.decodeHtml(this.questions[this.quesIdx].question);
			this.message1 = this.decodeHtml(theAnswers[0]);
			this.message2 = this.decodeHtml(theAnswers[1]);
			this.message3 = this.decodeHtml(theAnswers[2]);
			this.message4 = this.decodeHtml(theAnswers[3]);

			if (theAnswers.length > 0) {
				this.speakMe("Heres the question");

				this.speakMe(this.message5);

				this.speakMe("Is the answer");
				if (!this.message1 == "") {
					this.speakMe(this.message1);
				}
				if (!this.message2 == "") {
					this.speakMe(this.message2);
				}
				if (!this.message3 == "") {
					this.speakMe(this.message3);
				}
				if (!this.message4 == "") {
					this.speakMe(this.message4);
				}
			}
		},
		q1: async function(event) {
			// the code below plays the correct answer sound
			if (this.message1 == this.correctAns) {
				let audio = new Audio("sounds/RightAnswer.ogg");
				audio.play();
				this.message5 = "Winner Winner you are CORRECT!";
				this.speakMe(this.message5);
				this.quesIdx += 1;
			} else {
				// the code below plays the incorrect answer sound
				let audio = new Audio("sounds/WrongAnswer.ogg");
				audio.play();
				this.message5 = "WRONG ANSWER!";
				this.speakMe(this.message5);
				this.play = false;
			}
		},
		q2: async function(event) {
			// the code below plays the correct answer sound
			if (this.message2 == this.correctAns) {
				let audio = new Audio("sounds/RightAnswer.ogg");
				audio.play();
				this.message5 = "Winner Winner you are CORRECT!";
				this.speakMe(this.message5);
				this.quesIdx += 1;
			} else {
				// the code below plays the incorrect answer sound
				let audio = new Audio("sounds/WrongAnswer.ogg");
				audio.play();
				this.message5 = "WRONG ANSWER!";
				this.speakMe(this.message5);
				this.play = false;
			}
		},
		q3: async function(event) {
			// the code below plays the correct answer sound
			if (this.message3 == this.correctAns) {
				let audio = new Audio("sounds/RightAnswer.ogg");
				audio.play();
				this.message5 = "Winner Winner you are CORRECT!";
				this.speakMe(this.message5);
				this.quesIdx += 1;
			} else {
				// the code below plays the incorrect answer sound
				let audio = new Audio("sounds/WrongAnswer.ogg");
				audio.play();
				this.message5 = "WRONG ANSWER!";
				this.speakMe(this.message5);
				this.play = false;
			}
		},
		q4: async function(event) {
			// the code below plays the correct answer sound
			if (this.message4 == this.correctAns) {
				let audio = new Audio("sounds/RightAnswer.ogg");
				audio.play();
				this.message5 = "Winner Winner you are CORRECT!";
				this.speakMe(this.message5);
				this.quesIdx += 1;
			} else {
				// the code below plays the incorrect answer sound
				let audio = new Audio("sounds/WrongAnswer.ogg");
				audio.play();
				this.message5 = "WRONG ANSWER!";
				this.speakMe(this.message5);
				this.play = false;
			}
		},
		main: async function() {
			// get the reference
			const client = stitch.Stitch.initializeDefaultAppClient(
				"assign2-poll-oehqw"
			);
			// login
			const user = await client.auth.loginWithCredential(
				new stitch.AnonymousCredential()
			);
			// get the poll results
			var result = await client.callFunction("getpollres");
			// add data to addary
			var dataArray = [result.a, result.b, result.c, result.d];
			var ctx = document.getElementById("myChart").getContext("2d");
			var myChart = new Chart(ctx, {
				type: "bar",
				data: {
					labels: ["A", "B", "C", "D"],
					datasets: [
						{
							label: "Ask the Audience",
							data: dataArray,
							backgroundColor: [
								"rgba(255, 99, 132, 0.2)",
								"rgba(54, 162, 235, 0.2)",
								"rgba(255, 206, 86, 0.2)",
								"rgba(75, 192, 192, 0.2)"
							],
							borderColor: [
								"rgba(255, 99, 132, 1)",
								"rgba(54, 162, 235, 1)",
								"rgba(255, 206, 86, 1)",
								"rgba(75, 192, 192, 1)"
							],
							borderWidth: 1
						}
					]
				},
				options: {
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true
								}
							}
						]
					}
				}
			});
			// slow the time for display
			setInterval(async () => {
				// get the poll results from the db
				result = await client.callFunction("getpollres");
				// add data to the array
				dataArray = [result.a, result.b, result.c, result.d];
				// add the data to the chart
				myChart.data.datasets[0].data = dataArray;
				//update the chart.
				myChart.update();
			}, 1000);
		},
		speakMe: function(string) {
			// Create a new speech object, attaching the string of text to speak
			let utterThis = new SpeechSynthesisUtterance(string);
			let voices = window.speechSynthesis.getVoices();
			// Actually speak the text
			utterThis.voice = voices[1];
			synth.speak(utterThis);
		},
		fiftyfifty: function() {
			// Play the audio stream
			let audio = new Audio("sounds/Fifty50.ogg");
			audio.play();
			// Check the number of remaining answers
			let leftCount = theAnswers.length;
			if (theAnswers.length >= 3) {
				// if there are more that 2 quetions left then cont.
				theAnswers.forEach(function(element, index) {
					if (leftCount > 2) {
						if (element != correctAns) {
							// remove the aswers from the array
							theAnswers.splice(index, 1, "");
							// lower the count.
							leftCount -= 1;
						}
					}
				});
			}
			this.fillanswers();
		},

		phoneFriend: async function() {
			this.speakMe(
				"We are going to try and get Bob on the Phone, A T & T Make it Happen"
			);

			setTimeout(function() {
				audio1.play(); // Play the audio stream
			}, 5000);

			audio1.addEventListener("ended", function() {
				audio2.play(); // Play the audio stream
			});
		}
	}
});
