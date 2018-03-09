<template>
<div>
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  <!-- <div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-heading"> -->
        <br>
		<h2 class="text-center">Risk assessment</h2>
		</div>
		<hr />
		<div class="modal-body">
        
        <hr />

        <div>
            <b-form @submit.prevent="calculateRiskProfile">
            <b-form-group>

                <h5>How long can you invest your money?</h5>
                <b-form-radio-group id="radios1" v-model="q1" :options="optionsq1" name="radiosQ1" stacked required></b-form-radio-group>
                <br>

                <h5>Once you begin withdrawing your investment funds, you plan to spend the funds in:</h5>
                <b-form-radio-group id="radios2" v-model="q2" :options="optionsq2" name="radiosQ2" stacked required></b-form-radio-group>
                <br>
                <h5>How extensive is your knowledge of investments:</h5>
                <b-form-radio-group id="radios3" v-model="q3" :options="optionsq3" name="radiosQ3" stacked required></b-form-radio-group>
                <br>
                <h5>When investing, I am:</h5>
                <b-form-radio-group id="radios4" v-model="q4" :options="optionsq4" name="radiosQ4" stacked required></b-form-radio-group>
                <br>
                <h5>Please select the investments that you currently own:</h5>
                <b-form-radio-group id="radios5" v-model="q5" :options="optionsq5" name="radiosQ5" stacked required></b-form-radio-group>
                <br>
                <h5>Please review the following situation and chose one option:</h5>
                <p>Imagine that in the past three months, the overall stock market lost 25% of its value. An individual stock investment you own also lost 25% of its value. What would you do?</p>
                <b-form-radio-group id="radios6" v-model="q6" :options="optionsq6" name="radiosQ6" stacked required></b-form-radio-group>
                <br>
                <h5>Please review the table below and pick one option:</h5>

                <p>We’ve outlined the most likely best-case and worst-case annual returns of five hypothetical investment plans. Please select the option with the range of possible outcomes that is most acceptable to you:</p>

                <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Option</th>
                <th scope="col">Expected return</th>
                <th scope="col">Best-case</th>
                <th scope="col">Worst-case</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">A</th>
                    <td>7.2%</td>
                    <td>16.3%</td>
                    <td>-5.6%</td> 
                </tr>
                <tr>
                    <th scope="row">B
                    </th>
                    <td>9.0%</td>
                    <td>25.0%</td>
                    <td>-12.1%</td>
                </tr>
                <tr>
                    <th scope="row">C
                    </th>
                    <td>10.4%</td>
                    <td>33.6%</td>
                    <td>-18.2%</td>
                </tr>
                <tr>
                    <th scope="row">D
                    </th>
                    <td>11.7%</td>
                    <td>42.8%</td>
                    <td>-24.0%</td>
                </tr>
                <tr>
                    <th scope="row">D
                    </th>
                    <td>12.5%</td>
                    <td>50.0%</td>
                    <td>-28.2%</td>
                </tr>
            </tbody>
            </table>
            <span class="p">Your selection:</span><b-form-radio-group id="radios7" v-model="q7" :options="optionsq7" name="radiosQ7" required></b-form-radio-group>
            </b-form-group>
                        <div class="row justify-content-md-center">
        <b-button type="submit" variant="dark">Submit</b-button>
        </div>
            </b-form>

            <div class="mt-3">
            Selected: <strong>{{ q1+q2+q3+q4+q5+q6+q7 }}</strong>
            <pre>Time horizon {{q1+q2}}</pre>
            <pre>Risk Tolerance {{q3+q4+q5+q6+q7}}</pre>
            </div>
        </div>

  </div>
  </div>
</div>
</div>

  
</template>

<script>
import { updateUserRisk } from "@/api";
export default {
  methods: {
    //Takes the time horizon (q1 and q2) and multiplies it with the risk tolerance
    // (q3-7). Then norms it to 1548 to get a number from 0 to 100
    calculateRiskProfile() {
      this.timeHorizon = this.q1 + this.q2;
      this.riskTolerance = this.q3 + this.q4 + this.q5 + this.q6 + this.q7;
      this.riskProfile = Math.floor(
        100 / 1584 * this.riskTolerance * (this.timeHorizon * 2)
      );
      console.log(this.riskProfile);

      const userId = this.$root.user.id;
      const userInfo = {
        riskProfile: this.riskProfile,
        riskProfileCompleted: true
      };
      updateUserRisk(userId, userInfo)
        .then(() => {
          this.$router.push("/profile");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  data() {
    return {
      timeHorizon: 0,
      riskTolerance: 0,
      riskProfile: 0,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      q5: 0,
      q6: 0,
      q7: 0,
      optionsq1: [
        { text: "Less than 3 years", value: 1 },
        { text: "3-5 years", value: 3 },
        { text: "6-10 years", value: 7 },
        { text: "11 years or more", value: 10 }
      ],
      optionsq2: [
        { text: "Less than 2 years", value: 0 },
        { text: "2-5 years", value: 1 },
        { text: "6-10 years", value: 4 },
        { text: "11 years or more", value: 8 }
      ],
      optionsq3: [
        { text: "None", value: 1 },
        { text: "Basic", value: 3 },
        { text: "Good", value: 7 },
        { text: "Extensive", value: 10 }
      ],
      optionsq4: [
        { text: "Most concerned about my investment losing value", value: 0 },
        {
          text: "Equally concerned about my investment losing or gaining value",
          value: 4
        },
        { text: "Most concerned about my investment gaining value ", value: 8 }
      ],
      optionsq5: [
        { text: "None", value: 0 },
        { text: "Bonds", value: 3 },
        { text: "Stocks", value: 6 },
        { text: "International securities", value: 8 }
      ],
      optionsq6: [
        { text: "Sell all of my shares", value: 0 },
        { text: "Sell some of my shares", value: 2 },
        { text: "Do nothing", value: 5 },
        { text: "Buy more shares", value: 8 }
      ],
      optionsq7: [
        { text: "A", value: 0 },
        { text: "B", value: 3 },
        { text: "C", value: 6 },
        { text: "D", value: 8 },
        { text: "E", value: 10 }
      ]
    };
  }
};
</script>


<style>
.invest-questionaire {
  display: flex;
  justify-content: left;
}
</style>

