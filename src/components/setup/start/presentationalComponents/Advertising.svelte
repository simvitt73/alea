<div>
    <style>
        @font-face {
            font-family: "Jellee-Roman";
            src: url("public/fonts/jellee-roman-webfont.woff") format("woff");
            font-weight: normal;
            font-style: normal;
        }

        /* Réinitialisation et base responsive */
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
            font-size: 16px;
            overflow: hidden;
        }

        /* Container principal centré et responsive */
        .container {
            position: relative;
            width: 80vw;
            max-width: 800px;
        }

        /* L'image de fond s'adapte à la largeur du container */
        .background {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Positionnement du conteneur de l'horloge (placé en superposition) */
        .clock-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-52.5%, -59.8%);
            width: 25vw;
            max-width: 200px;
        }

        /* Horloge en carré grâce à l'aspect-ratio */
        .clock {
            position: relative;
            width: 100%;
            aspect-ratio: 1;
        }

        /* Compte à rebours positionné de façon relative à l'image */
        .countdown {
            position: absolute;
            top: 62.5%;
            left: 9.5%;
            transform: /* translate(-180%, 110%) */ rotate(-12.5deg);
            font-size: 4rem;
            color: rgb(255, 0, 0);
            font-family: "Jellee-Roman", Arial, sans-serif;
            text-align: center;
            line-height: 1.5;
            font-weight: bold;
            text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.8);
        }

        /* Styles des aiguilles, avec des dimensions en pourcentage par rapport à l'horloge */
        .hand {
            position: absolute;
            bottom: 50%;
            left: 50%;
            transform-origin: bottom;
            background: black;
        }

        .hour {
            width: 3%;
            height: 25%;
        }

        .minute {
            width: 2%;
            height: 35%;
        }

        .second {
            width: 1%;
            height: 40%;
            background: red;
        }

        .center {
            width: 5%;
            height: 5%;
            background: black;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        /* Ajustements pour smartphone */
        @media (max-width: 800px) {
            .container {
                width: 95vw;
            }
            .clock-container {
                width: 22.5vw;
            }
            .countdown {
                font-size: 7vw;
            }
        }
    </style>
    <div class="container">
        <img
            src="public/assets/images/homepage/CAN-rebours.png"
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
        const targetDate = new Date("2025-03-10T00:00:00");

        function updateClock() {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                document.getElementById("countdown").innerHTML = "J - 0";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = now.getHours() % 12;
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const hourDeg = hours * 30 + minutes * 0.5;
            const minuteDeg = minutes * 6 + seconds * 0.1;
            const secondDeg = seconds * 6;

            document.getElementById("hour").style.transform =
                `translate(-50%) rotate(${hourDeg}deg)`;
            document.getElementById("minute").style.transform =
                `translate(-50%) rotate(${minuteDeg}deg)`;
            document.getElementById("second").style.transform =
                `translate(-50%) rotate(${secondDeg}deg)`;
            document.getElementById("countdown").innerHTML = `J - ${days}`;
        }

        setInterval(updateClock, 1000);
        updateClock();
    </script>
</div>