const Direction = document.querySelector('.direction'); //селект с выбором направления
const Amount = document.querySelector('.number'); //input с колличеством биллетов
const TravelTime = document.querySelector('.time'); //селект с временем поездки в один конец
const TimeBack = document.querySelector('.time-back');
const TimeBackSelect = document.querySelector('.time-back__select');//селект с временем обратного билета

function renderOpt(Arr, cl) { //помещает в select опции
    let a = '';
    Arr = Arr.map(({ value, id, time, direction }) => {
        a += `<option value="${value}" id="${id}"><span class="departure">${time}</span> ${direction}</option>`
    })
    document.querySelector(cl).innerHTML = a;
}

renderOpt(TimeFrom, ".time-back__select");
renderOpt(TimeTo, ".time")
Direction.onchange = () => Direction.options[Direction.selectedIndex].id == 2 ? renderOpt(TimeFrom, ".time") : renderOpt(TimeTo, ".time")

Direction.addEventListener('change', () => { //рисуем на странице селект с временем возврата
    Number(Direction.value) == 1200 ? TimeBack.style.visibility = "visible" : TimeBack.style.visibility = 'hidden';
});

let opt = TimeBackSelect.querySelectorAll('option');
TimeBackSelect.querySelector('option').classList.add('opt');

document.addEventListener('DOMContentLoaded', () => {
    TravelTime.addEventListener('change', () => {
        let a = TravelTime.value;
        for (let i = 0; i < opt.length; i++) {
            new Date(opt[i].value) - new Date(a) < 3000000 ? opt[i].style.display = 'none' : opt[i].style.display = 'inline-block';
        }
    })
})

const createString = () => {
    let time = TravelTime.options[TravelTime.selectedIndex].value
    let dt = DateTime.fromISO(`${time}`)
    let time2 = DateTime.fromISO(dt.plus({ minutes: 40 }).toISOTime())
    let time_back = DateTime.fromISO(`${TimeBackSelect.options[TimeBackSelect.selectedIndex].value}`)
    let time_back2 = DateTime.fromISO(time_back.plus({ minutes: 40 }).toISOTime())
    let a = ''
    let b = `Время обратного отправления ${time_back.hour}:${addLeadingZero(time_back.minute.toString())}, время прибытия ${time_back2.hour}:${time_back2.minute}`
    let duration = 50

    Direction.options[Direction.selectedIndex].innerHTML === 'из А в В, и обратно' ? duration = 100 : duration = 50

    if (Number(Direction.value) * Number(Amount.value) <= 0) { a = '<p style="color:red; text-transform:uppercase;">выберите количество билетов</p>'; }
    else {
        a = `
    <p>Вы выбрали ${Amount.value} билета по маршруту ${Direction.options[Direction.selectedIndex].innerHTML} стоимостью ${Number(Direction.value) * Number(Amount.value)}р.
    Время в дороге ${duration} минут. 
    Теплоход отправляется в ${dt.hour}:${addLeadingZero(dt.minute.toString())}, а прибудет в ${time2.hour}:${time2.minute}.</p></br>
    `}
    let c
    Direction.options[Direction.selectedIndex].innerHTML === 'из А в В, и обратно' ? c = a + b : c = a
    return c
}

document.querySelector('button').onclick = () => document.querySelector('.out').innerHTML = createString()

