// Получаем элементы формы
const cargoNameInput = document.getElementById("cargoName");
const originInput = document.getElementById("origin");
const destinationInput = document.getElementById("destination");
const departureDateInput = document.getElementById("departureDate");
const addCargoForm = document.getElementById("addCargoForm");
const cargoTable = document.getElementById("cargoTable");
const statusFilter = document.getElementById("statusFilter");

// Функция для рендеринга списка грузов
function renderCargoList(filter = "") {
    cargoTable.innerHTML = "";
  
    // Фильтрация по статусу
    const filteredCargo = filter
      ? cargoList.filter(cargo => cargo.status === filter)
      : cargoList;
  
    filteredCargo.forEach(cargo => {
      const row = document.createElement('tr');
      
      // Применяем классы для цвета статуса
      let statusClass = "";
      switch (cargo.status) {
        case "Ожидает отправки":
          statusClass = "status-Ozhidayet";
          break;
        case "В пути":
          statusClass = "status-V-puti";
          break;
        case "Доставлен":
          statusClass = "status-Dostavlen";
          break;
        default:
          statusClass = "";
          break;
      }
  
      row.innerHTML = `
        <td>${cargo.id}</td>
        <td>${cargo.name}</td>
        <td class="${statusClass}">
          <select class="form-select status-select">
            <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? "selected" : ""}>Ожидает отправки</option>
            <option value="В пути" ${cargo.status === "В пути" ? "selected" : ""}>В пути</option>
            <option value="Доставлен" ${cargo.status === "Доставлен" ? "selected" : ""}>Доставлен</option>
          </select>
        </td>
        <td>${cargo.origin}</td>
        <td>${cargo.destination}</td>
        <td>${cargo.departureDate}</td>
        <td><button class="btn btn-danger btn-sm delete-btn">Удалить</button></td>
      `;
  
      // Изменение статуса
      row.querySelector('.status-select').addEventListener('change', function () {
        const newStatus = this.value;
        const today = new Date();
        const departureDate = new Date(cargo.departureDate);
  
        if (newStatus === "Доставлен" && departureDate > today) {
          alert("Нельзя установить статус 'Доставлен', если дата отправления в будущем.");
          this.value = cargo.status;
          return;
        }
  
        cargo.status = newStatus;
        renderCargoList(statusFilter.value);
      });
  
      // Удаление груза
      row.querySelector('.delete-btn').addEventListener('click', () => {
        const index = cargoList.indexOf(cargo);
        if (index !== -1) {
          cargoList.splice(index, 1);
        }
        renderCargoList(statusFilter.value);
      });
  
      cargoTable.appendChild(row);
    });
  }
  
  // Обработчик фильтра
  statusFilter.addEventListener('change', function () {
    renderCargoList(this.value);
  });
  
  // Обработчик добавления нового груза
  addCargoForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const cargoName = cargoNameInput.value;
    const origin = originInput.value;
    const destination = destinationInput.value;
    const departureDate = departureDateInput.value;
  
    if (!cargoName || !origin || !destination || !departureDate) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }
  
    const cargoId = "CARGO" + String(cargoList.length + 1).padStart(3, "0");
  
    const newCargo = {
      id: cargoId,
      name: cargoName,
      status: "Ожидает отправки",
      origin,
      destination,
      departureDate
    };
  
    cargoList.push(newCargo);
  
    cargoNameInput.value = "";
    originInput.value = "";
    destinationInput.value = "";
    departureDateInput.value = "";
  
    renderCargoList(statusFilter.value);
  });
  
  // Первоначальная отрисовка списка грузов
  renderCargoList();  