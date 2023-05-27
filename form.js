// JavaScript код за обработка на командите и показване на резултата
var commandForm = document.getElementById('commandForm');
var commandInput = document.getElementById('commandInput');
var commandHistory = document.querySelector('.command-history');
var commandOutput = document.querySelector('.command-output');

commandForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var command = commandInput.value.trim();

  if (command !== '') {
    // Изпращане на командата към PHP скрипта
    fetch('http://localhost:80/project/process_command.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'command=' + encodeURIComponent(command)
    })
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        // Показване на резултата в интерфейса
        commandOutput.innerHTML = '<pre>' + data + '</pre>';
        commandInput.value = '';

        // Добавяне на командата към историята
        var commandItem = document.createElement('li');
        commandItem.textContent = command;
        commandItem.addEventListener('click', function() {
          showCommandOutput(command);
        });
        commandHistory.appendChild(commandItem);
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  }
});

function showCommandOutput(command) {
  // Изчистване на предишния резултат
  commandOutput.innerHTML = '';

  // Изпращане на командата към PHP скрипта, за да получите резултата за конкретната команда
  fetch('http://localhost:80/project/process_command.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'command=' + encodeURIComponent(command)
  })
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      // Показване на резултата в интерфейса
      commandOutput.innerHTML = '<pre>' + data + '</pre>';
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}

// Зареждане на командите от базата данни
fetch('http://localhost:80/project/load_commands.php')
  .then(function(response) {
    return response;
  })
  .then(function(data) {
    // Показване на командите в историята
    data.forEach(function(command) {
      var commandItem = document.createElement('li');
      commandItem.textContent = command;
      commandItem.addEventListener('click', function() {
        showCommandOutput(command);
      });
      commandHistory.appendChild(commandItem);
    });
  })
  .catch(function(error) {
    console.error('Error:', error);
  });