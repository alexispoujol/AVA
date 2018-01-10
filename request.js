const heroku_url = "https://peaceful-beach-89392.herokuapp.com/api/Light";



const req = new Vue({
    el: '#app',
    data: {
		light: {id:17,level:1,status:'OFF'},
		selectedColor: "Blue"
    },	
    mounted() {
        axios.get(heroku_url)
            .then(response => {this.light = response.data});
		console.log(this.light);	
		
		$(function(){

		  // create a client that will publish to topics
		  var sensor1 = mqtt.connect("wss://gzjltozl:o3gxcWnlIX3y@m14.cloudmqtt.com:32653")

		  // this will be called when the "Publish" button is pressed 
		  $('#publish').on('click',function() {
			  var topic = 'led';
			  var message = 'switch';
			  sensor1.publish(topic, message);
		  });

		  $('#color').on('click',function() {
			  var topic = 'led'; 
			  var message = req.selectedColor;
			  console.log(req.selectedColor);
			  sensor1.publish(topic, message);
		  });

		  // create a client that will subscribe to topics
		  var actuator = mqtt.connect("wss://Led:Led@m14.cloudmqtt.com:32653");

		  // subscribe to some topic
		  actuator.subscribe("Led")

		  // this will be called when a message is received
		  actuator.on("message", function (topic, payload) {
			var message = new TextDecoder("utf-8").decode(payload);
			console.log("message received by actuator: " , topic , message);
			$('#root').html(topic + ": " + message);
		  })

		});
    },
    methods: {
        switchLight(id) {
            let post_url = heroku_url + "/" + id + "/switch/light";
            axios.post(post_url, {LightId:id})
                .then(response => {this.rooms = response.data});
            },	
    }

})

