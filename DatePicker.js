class DatePicker {
  constructor(divId, callback) {
    this.divId = divId;
    this.callback = callback;
    this.container = document.getElementById(divId);
    this.currentDate = null;
  }

  render(date) {
    this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = firstDayOfMonth.getDay();

    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let html = `
      <div class="datepicker">
        <div class="header">
          <button class="prev">&lt;</button>
          <span class="month-year">${monthNames[month]} ${year}</span>
          <button class="next">&gt;</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Su</th>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
            </tr>
          </thead>
          <tbody>
    `;

    let dayCounter = 1;
    let nextMonthDay = 1;
    let weeks = [];

    while (dayCounter <= lastDayOfMonth) {
      let week = [];

      for (let i = 0; i < 7; i++) {
        if (weeks.length === 0 && i < startingDay) {
          week.push({
            day: lastDayOfPrevMonth - startingDay + i + 1,
            currentMonth: false
          });
        } else if (dayCounter > lastDayOfMonth) {
          week.push({
            day: nextMonthDay++,
            currentMonth: false
          });
        } else {
          week.push({
            day: dayCounter++,
            currentMonth: true
          });
        }
      }

      weeks.push(week);
    }

    for (let week of weeks) {
      html += "<tr>";
      for (let dayObj of week) {
        if (dayObj.currentMonth) {
          html += `<td class="current-month" data-day="${dayObj.day}">${dayObj.day}</td>`;
        } else {
          html += `<td class="other-month dim">${dayObj.day}</td>`;
        }
      }
      html += "</tr>";
    }

    html += `
          </tbody>
        </table>
      </div>
    `;

    this.container.innerHTML = html;

    this.container.querySelector(".prev").addEventListener("click", () => {
      this.render(new Date(year, month - 1, 1));
    });

    this.container.querySelector(".next").addEventListener("click", () => {
      this.render(new Date(year, month + 1, 1));
    });

    this.container.querySelectorAll(".current-month").forEach(cell => {
      cell.addEventListener("click", () => {
        const selectedDay = parseInt(cell.getAttribute("data-day"));
        this.callback(this.divId, {
          month: month + 1,
          day: selectedDay,
          year: year
        });
      });
    });
  }
}