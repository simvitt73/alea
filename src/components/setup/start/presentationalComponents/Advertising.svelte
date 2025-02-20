<script>
  import { scale } from "svelte/transition"
</script>

<a href=" " target="_blank">
  <style>
    @font-face {
      src: url("./Jellee-Roman.ttf") format("truetype");
    }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f4f4;
      position: relative;
      overflow: hidden;
    }
    .container {
      position: relative;
      top: 150px;
      width: 40%;
      max-width: 800px;
      margin: 0 auto;
    }
    .background {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: 800px;
    }
    .clock-container {
      position: absolute;
      top: 50%;
      left: 49.7%;
      transform: translate(-50%, -50%) scale(0.7);
      transform-origin: center;
      z-index: 7;
    }
    .clock {
      width: 100px;
      height: 200px;
      border: 0px solid black;
      top: -15px;
      border-radius: 50%;
      position: relative;
      /* background: rgb(255, 165, 100); */
    }
    .hand {
      position: absolute;
      bottom: 50%;
      left: 50%;
      transform-origin: bottom;
      background: black;
    }
    .hour {
      width: 6px;
      height: 50px;
    }
    .minute {
      width: 4px;
      height: 70px;
    }
    .second {
      width: 2px;
      height: 80px;
      background: red;
    }
    .center {
      width: 10px;
      height: 10px;
      background: black;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .countdown {
      position: absolute;
      top: 45%;
      left: 19.5%;
      transform: translate(-50%, 50%) rotate(-12.5deg) scale(0.8);
      font-size: 4rem;
      color: rgb(255, 0, 0); /* orange (241, 89, 41), bleu(33, 109, 154) */
      font-family: "Jellee", Arial, sans-serif;
      text-align: center;
      line-height: 1.5;
      font-weight: bold;
      z-index: 6;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
    }
  </style>
  <div class="container">
    <img
      src="assets/images/CAN-rebours1.png"
      alt="La course aux nombres"
      class="background"
    />
    <div class="countdown" id="countdown">Chargement...</div>
    <div class="clock-container">
      <div class="clock">
        <div class="hand hour" id="hour"></div>
        <div class="hand minute" id="minute"></div>
        <div class="hand second" id="second"></div>
        <div class="center"></div>
      </div>
    </div>
  </div>
  <script>
    const targetDate = new Date("2025-03-10T00:00:00")

    function updateClock() {
      const now = new Date()
      const diff = targetDate - now

      if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "J - 0"
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = now.getHours() % 12
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      const hourDeg = hours * 30 + minutes * 0.5
      const minuteDeg = minutes * 6 + seconds * 0.1
      const secondDeg = seconds * 6

      document.getElementById("hour").style.transform =
        `translate(-50%) rotate(${hourDeg}deg)`
      document.getElementById("minute").style.transform =
        `translate(-50%) rotate(${minuteDeg}deg)`
      document.getElementById("second").style.transform =
        `translate(-50%) rotate(${secondDeg}deg)`
      document.getElementById("countdown").innerHTML = `J - ${days}`
    }

    setInterval(updateClock, 1000)
    updateClock()
  </script>
</a>
