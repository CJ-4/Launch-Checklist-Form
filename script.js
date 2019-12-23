// Write your JavaScript code here
var pName;
var coName;
var fuel;
var heavy;
var failure;
var status;
var gasStat;
var mass;
var driver;
var copilot;
var form;

window.onload = function() {
  pName = document.getElementById("pilotName");
  coName = document.getElementById("copilotName");
  fuel = document.getElementById("fuelLevel");
  heavy = document.getElementById("cargoMass");
  failure = document.getElementById("faultyItems");
  status = document.getElementById("launchStatus");
  gasStat = document.getElementById("fuelStatus");
  mass = document.getElementById("cargoStatus");
  driver = `Pilot ${pName.value} is ready for launch`;
  copilot = `Co-pilot ${coName.value} is ready for launch`;
  form = this.document.getElementById("launchForm");

  fetch("https://handlers.education.launchcode.org/static/planets.json").then(
    function(response) {
      response.json().then(function(json) {
        const destination = document.getElementById("missionTarget");
        destination.innerHTML = `
            <ol>
            <li>Name: ${json[3].name}</li>
            <li>Diameter: ${json[3].diameter}</li>
            <li>Star: ${json[3].star}</li>
            <li>Distance from Earth: ${json[3].distance}</li>
            <li>Number of Moons: ${json[3].moons}</li>
         </ol>
         <img src=${json[3].image} alt="mars"/>
            `;
      });
    }
  );
};

window.addEventListener("submit", function(event) {
  if (
    pName.value === "" ||
    fuel.value === "" ||
    coName.value === "" ||
    heavy.value === ""
  ) {
    alert("All fields are required!");
    event.preventDefault();
    return form;
  }
  if (!isNaN(pName.value) || !isNaN(coName.value)) {
    alert("Please enter a valid name.");
    event.preventDefault();
    return form;
  }
  if (isNaN(fuel.value) || isNaN(heavy.value)) {
    alert("Please enter valid number.");
    event.preventDefault();
    return form;
  }

  if (heavy.value > 10000 || fuel.value < 10000) {
    failure.style.visibility = 'visible';
    status.fontcolor ="red";
    status.innerHTML = "Shuttle NOT ready for launch!";
    mass = "Too much mass for the shuttle to take off.";
    gasStat = "Not enough fuel for the journey.";
    failure.innerHTML = `${driver} \n ${copilot} \n ${mass} \n ${gasStat}`;
    return failure;
  } else {
    status.fontcolor = "green";
    status.innerHTML = "Shuttle Ready To Launch";
    return form;
  }
});
