const quizData = 'https://api.myjson.com/bins/qq83e';

const app = new Vue({
  el:'#quiz',
  data() {
    return {
      dataFound:false,
      questionStage:false,
      resultsStage:false,
      title:'',
      questions:[],
      currentQuestion:0,
      answers:[],
      correct:0,
      correctA:0,
      correctB:0,
      correctC:0,
      correctD:0,
      perc:null,
      animal:'',
      description: ''
      //image:
    }
  },
  created() {
    fetch(quizData)
    .then(res => res.json())
    .then(res => {
      this.title = res.title;
      this.questions = res.questions;
      this.dataFound = true;
    });
  },
  methods:{
    startQuiz() {
      this.dataFound = false;
      this.questionStage = true;
      console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
    },
    handleAnswer(e) {
      console.log('answer event ftw',e);
      this.answers[this.currentQuestion]=e.answer;
      if ((this.currentQuestion+1) === this.questions.length) { // If we've reached the end of the questions
        this.handleResults();
        this.questionStage = false;
        this.resultsStage = true;
      } else {
        this.currentQuestion++;
      }
    },
    handleResults() {
      console.log('handle results');
      console.log(this.questions);
      this.questions.forEach((a, index) => {
        if(this.answers[index] === 0) this.correctA++; 
        else if(this.answers[index] === 1) this.correctB++;
        else if(this.answers[index] === 2) this.correctC++;
        else if(this.answers[index] === 3) this.correctD++;

      });
        if((this.correctA > this.correctB) && (this.correctA > this.correctC) && (this.correctA > this.correctD))
        {
          this.animal = "Penguin";
          this.description = "You have a free-spirited personality and love having fun. You thrive off interacting with other people and getting the job done.";
          //img src="penguin.jpg";
          console.log('penguin')
        }
        if((this.correctB > this.correctA) && (this.correctB > this.correctC) && (this.correctB > this.correctD))
        {
          this.animal = "Kangaroo";
          this.description = "You are a driven force for good! You are excited about the challenges that lie ahead in life and will reach great heights!"
          console.log('kangaroo')
        }
        if((this.correctC > this.correctA) && (this.correctC > this.correctB) && (this.correctB > this.correctD))
        {
          this.animal = "Llama";
          this.description = "You are content with life and where you are going. You value the relationships with those closese to you the most and enjoy solid entertainment."
          console.log('llama')
        }
        if((this.correctD > this.correctA) && (this.correctD > this.correctB) && (this.correctD > this.correctC)) 
        {
          this.animal = "Kitten";
          this.description = "You are just a bundle of joy! Others love being around you and feed off your energy. You may not love to work hard, but you are always down to have fun!"
          console.log('kitten')
        }
        if((this.correctA === this.correctB) && (this.correctA === this.correctC) && (this.correctA === this.correctD) && (this.correctB === this.correctC) && (this.correctB === this.correctD) && (this.correctC === this.correctD))
        {
          this.animal = "Guppy";
          this.description = "You are awesome.";
          console.log('guppy');
        }
    }
  }
})

Vue.component('question', {
  template:`
<div>
  <strong>Question {{ questionNumber }}:</strong><br/>
  <strong>{{ question.text }} </strong>

  <div v-if="question.type === 'tf'">
    <input type="radio" name="currentQuestion" id="trueAnswer" v-model="answer" value="t"><label for="trueAnswer">True</label><br/>
    <input type="radio" name="currentQuestion" id="falseAnswer" v-model="answer" value="f"><label for="falseAnswer">False</label><br/>
  </div>

  <div v-if="question.type === 'mc'">
    <div v-for="(mcanswer,index) in question.answers">
    <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer" :value="index"><label :for="'answer'+index">{{mcanswer}}</label><br/>
    </div>
  </div>

  <button @click="submitAnswer">Answer</button>
</div>
`,
  data() {
     return {
       answer:''
     }
  },
  props:['question','question-number'],
  methods:{
    submitAnswer:function() {
      this.$emit('answer', {answer:this.answer});
      this.answer = null;
    }
  }
});