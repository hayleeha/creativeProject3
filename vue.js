{
  "title": "Spirit Animal Quiz",
  "questions": [
    {
      "text": "If you could have any of the following super-powers, which would you choose?",
      "type": "mc",
      "answers": [
        "Invisibility",
        "Immortality",
        "Super-human speed",
        "Flight"
      ],
      "answer": ""
      
    },
    {
      "text": "What is the most important part of your morning routine?",
      "type": "mc",
      "answers": [
        "Exercising",
        "Eating a good breakfast",
        "Sleeping in",
        "Meditating"
      ],
      "answer": ""
    },
    {
      "text": "If you were given $1000 today and had to spend it in the next 24 hours, what would you do with it?",
      "type": "mc",
      "answers": [
        "Invest",
        "Buy something for a friend",
        "Treat yourself",
        "Spontaneous road trip"
      ],
      "answer": "???"
    },
    {
      "text": "What is your favorite color?",
      "type": "mc",
      "answers": [
        "Yellow",
        "Hot Pink",
        "Turquoise",
        "Champagne"
      ],
      "answer": ""
    }
  ]
}

const quizData = 'https://api.myjson.com/bins/zxs1u';

const app = new Vue({
  el:'#quiz',
  data() {
    return {
      introStage:false,
      questionStage:false,
      resultsStage:false,
      title:'',
      questions:[],
      currentQuestion:0,
      answers:[],
      correct:0,
      perc:null
    }
  },
  created() {
    fetch(quizData)
    .then(res => res.json())
    .then(res => {
      this.title = res.title;
      this.questions = res.questions;
      this.introStage = true;
    })

  },
  methods:{
    startQuiz() {
      this.introStage = false;
      this.questionStage = true;
      console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
    },
    handleAnswer(e) {
      console.log('answer event ftw',e);
      this.answers[this.currentQuestion]=e.answer;
      if((this.currentQuestion+1) === this.questions.length) {
        this.handleResults();
        this.questionStage = false;
        this.resultsStage = true;
      } else {
        this.currentQuestion++;
      }
    },
    handleResults() {
      console.log('handle results');
      this.questions.forEach((a, index) => {
        if(this.answers[index] === a.answer) this.correct++;        
      });
      this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
      console.log(this.correct+' '+this.perc);
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
    <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer" :value="mcanswer"><label :for="'answer'+index">{{mcanswer}}</label><br/>
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



// Vue.component('star-rating', VueStarRating.default);

// let app = new Vue({
//   el: '#app',
//   data: {

//     // info: [
//     //   {
//     //     question: "If you could have any of the following super-powers, which would you choose?", 
//     //     answers: ["Invisibility", "Immortality", "Super-human speed", "Flight"]
//     //   }
//     //   {
//     //     question: "What is the most important part of your morning routine?",
//     //     answers: ["Exercising", "Eating a good breakfast", "Sleeping in", "Meditating"]
//     //   }
//     //   {
//     //     question: "If you were given $1000 today and had to spend it in the next 24 hours, what would you do with it?",
//     //     answers: ["Invest", "Buy something for a friend", "Treat yourself", "Spontaneous road trip"]
//     //   }
//     //   {
//     //     question: "What is your favorite color?",
//     //     answers: ["Yellow", "Champagne", "Hot pink", "Turquoise"]
//     //   }
//     // ]
   
//     },

//   computed: {
    
//     }
//   },

//   // to save them, make an on-submit
//   //trivia.komfi.co

//   created() {
//     this.xkcd();
//   },
// watch: {
//     number(value, oldvalue) {
//       if (oldvalue === '') {
//         this.max = value;
//       } else {
//         this.xkcd();
//       }
//     },
//     // ratings(value, oldvalue){
//     //   this.average = value[this.number].sum / value[this.number].total;
//     // }
//   },
//   methods: {
//     async xkcd() {
//       try{
//         this.loading = true;
//         const response = await axios.get('https://xkcd.now.sh/' + this.number);
//         this.current = response.data;
//         this.loading = false;
//         this.number = response.data.num;
//         return true;
//       } catch(error) {
//         this.number = this.max;
//         console.log(error);
//       }
//     },
//     // previousComic() {
//     //   this.number = this.current.num - 1;
//     //   if (this.number < 1)
//     //     this.number = 1;
//     // },
//     // nextComic() {
//     //   this.number = this.current.num + 1;
//     //   if (this.number > this.max)
//     //     this.number = this.max;
//     // },
//     // firstComic(){
//     //   this.number = 1;
//     // },
//     // lastComic(){
//     //   this.number = this.max;
//     // },
//     // getRandom(min, max) {
//     //   min = Math.ceil(min);
//     //   max = Math.floor(max);
//     //   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
//     // },
//   //   randomComic() {
//   //     this.number = this.getRandom(1, this.max);
//   //   },
//   //   addComment() {
//   //     if (!(this.number in this.comments))
//   //       Vue.set(this.comments, this.number, new Array);
//   //     this.comments[this.number].push({
//   //       author: this.addedName,
//   //       text: this.addedComment,
//   //       date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
//   //     });
//   //     this.addedName = '';
//   //     this.addedComment = '';
//   //   },
//   //   setRating(rating){
//   //     if (!(this.number in this.ratings))
//   //       Vue.set(this.ratings, this.number, {
//   //         sum: 0,
//   //         total: 0
//   //       });
//   //     this.ratings[this.number].sum += rating;
//   //     this.ratings[this.number].total += 1;
//   //     this.sum = this.ratings[this.number].sum;
//   //     this.total = this.ratings[this.number].total; 
//   //     // Handle the rating
//   //   },
//   // }
// });