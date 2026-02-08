const express = require("express");
const app = express();
const helmet = require('helmet');
let users_data = {}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let calculated = true
let goldEarnings = 0
let serEarnings = 0
let bronEarnings = 0
let nalog = 0
let now_id = 1 
let gold_send = 0
let gold_give = 0
let ser_give = 0
let ser_send = 0
let bron_give = 0
let bron_send = 0
let counter = 0
let counter2 = 0
let dolgg = 0
let dolgs = 0
let dolgb = 0
let count_us_g_s = 0
let count_us_g_b = 0
let count_us_g = 0
let startTime = Date.now();
let period = "none"
let semi_period = false
massive = []
const countdownDuration =  60 * 1000;
let g_league_users = 0
let s_league_users = 0
let b_league_users = 0
app.use(helmet({
  hsts: {
    maxAge: 315360000, // 1 год в секундах
    includeSubDomains: true,
    preload: true
  },
   contentSecurityPolicy: {
    useDefaults: true, // Сохраняет базовые настройки
    directives: {
      // Разрешаем скрипты с вашего сервера, CDN и inline
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Для inline скриптов в index.html
        "https://cdn.jsdelivr.net",
        "https://unpkg.com",
        "https://*.jsdelivr.net" // На всякий случай поддомен
      ],
      'script-src-attr': [  // Добавьте эту строку
        "'unsafe-inline'"
      ],
      'connect-src': [  // Добавьте эту директиву
        "'self'",
        "https://toncenter.com",
        "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js.map" // Разрешите API TON
      ]
    }
}}));
app.get('/healthz', async (req, res) => {
 return res.sendStatus(200);
});
app.get('/get_users', (req, res) => {
  // Подсчитываем реальное количество участников каждой лиги из users_data
  let g_count = 0, s_count = 0, b_count = 0;
  for(var [key, value1] of Object.entries(users_data)){
    const league = key.slice(-1);
    if(league == "G") g_count++;
    else if(league == "S") s_count++;
    else if(league == "B") b_count++;
  }
  massive = [g_count, s_count, b_count]
  res.json({ massive });
});
app.get('/add_usersg', (req, res) => {
    g_league_users += 1
    res.json({ g_league_users });
});
app.get('/add_userss', (req, res) => {
    s_league_users += 1
    res.json({ s_league_users });
});
app.get('/get_calc', (req, res) => {
    res.json({ calculated });
});
app.get('/change_calc', (req, res) => {
    calculated = true
    res.json({ calculated });
});
app.get('/add_usersb', (req, res) => {
    b_league_users += 1
    res.json({ b_league_users });
});
app.get('/get_serEarnings', (req, res) => {
  res.json({ serEarnings });
});
app.get('/get_bronEarnings', (req, res) => {
  res.json({ bronEarnings });
});
app.get('/get_goldEarnings', (req, res) => {
  res.json({ goldEarnings });
});
app.get('/get_period', (req, res) => {
  res.json({ period });
});
app.get('/get_counters', (req, res) => {
  massive = [count_us_g, count_us_g_s, count_us_g_b]
  res.json({ massive });
});
app.get('/add_counterg', (req, res) => {
    count_us_g += 1
    console.log("counter - ", count_us_g)
    res.json({ count_us_g });
});
app.get('/add_counters', (req, res) => {
    count_us_g_s += 1
    console.log("counter - ", count_us_g_s)
    res.json({ count_us_g_s });
});
app.get('/add_counterb', (req, res) => {
    count_us_g_b += 1
    console.log("counter - ", count_us_g_b)
    res.json({ count_us_g_b });
});
app.get('/get_dolg', (req, res) => {
  massive = [dolgg, dolgs, dolgb]
  console.log(massive, dolgg, dolgs, dolgb)
  res.json({ massive });
});
app.get('/get_counter2', (req, res) => {
  res.json({ counter2 });
});
app.get('/add_counter2', (req, res) => {
  counter2 += 1
  res.json({ counter2 });
});
app.get('/reset_counter2', (req, res) => {
  counter2 = 0
  res.json({ counter2 });
})
// Backend
let endTime = Date.now() + countdownDuration;

app.get('/time', (req, res) => {
  res.json({ endTime }); // Отдаем время завершения
});

app.get('/update_time', (req, res) => {
  endTime = Date.now() + countdownDuration;
  res.json({ endTime });
});
app.get('/get_counter', (req, res) => {
  res.json({ counter });
});
app.get('/add_counter', (req, res) => {
  counter += 1
  res.json({ counter });
});
app.get('/reset_counter', (req, res) => {
  counter = 0
  res.json({ counter });
})
app.get('/get_users_data', (req, res) => {
  res.json({ users_data });
})
app.use(express.json());
app.use("/", express.static("public"));
app.post('/change_goldEarnings', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    goldEarnings += Number(value);
    res.json({ goldEarnings });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.post('/change_semi_period', (req, res) => {
  const { value } = req.body;
    if(value == 1){
      semi_period = true
    }else{
      semi_period = false
    }
    res.json({ semi_period });
});
app.post('/save-data', (req, res) => {
    let keys = Object.keys(req.body);
    if (keys.length > 0) {
        const id = keys[0];            // Это ваш ID из localStorage
        const balance = req.body[id];  // Это значение баланса
        
        // Сохраняем в наш основной словарь
        const parsedData = typeof balance === 'string' ? JSON.parse(balance) : balance;
            
            // Сохраняем чистые данные (массив), а не строку
            users_data[id] = parsedData;
    console.log(users_data)
    res.json({ users_data });
} })
app.post('/calculate', (req, res) => {
  const { value } = req.body;
  if(value[3] && calculated){
    calculated = false
    for(var [key, value1] of Object.entries(users_data)){
      console.log(key.slice(-1))
      if (key.slice(-1) == value[0]){
        let balance = Number(users_data[key][1])
        balance += Number(users_data[key][0])
        if(Number(value[2]) > 0){
          balance += Number(value[1]) / Number(value[2])
        }
        users_data[key][0] = balance
        console.log(users_data[key], key)
        users_data[key][1] = 0
        console.log(users_data[key])
        
      }}
      }else if(calculated){
        for(var [key, value1] of Object.entries(users_data)){
      console.log(key.slice(-1))
      if (key.slice(-1) == value[0] & Number(users_data[key][2]) > 0){
        let balance = Number(users_data[key][0])
        balance += Number(users_data[key][2]) 
        users_data[key][0] = balance
        users_data[key][2] = 0
      }
    }
    }
    console.log(value, users_data)
    res.json({ users_data });
});
app.post('/get_balance', (req, res) => {
  const { value } = req.body;
  if (!users_data[value]) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
   let result = users_data[value][0]; 
    console.log(result, value)
    res.json({ result });
});
app.post('/get_act', (req, res) => {
  const { value } = req.body;
  result = true
  id = false
   for(var [key, value1] of Object.entries(users_data)){
    console.log(key.slice(0, -1), value.slice(0, -1))
    if (key.slice(0, -1) == value.slice(0, -1)){
      id = key
      result = ""
    }
   }
   a = [result, id]
   res.json({ a });
});
app.post('/change_gold_dolg', (req, res) => {
  const { value } = req.body;
  for(var [key, value1] of Object.entries(users_data)){
        if(value[0] == key){
        users_data[value[0]][2] = value[1]
        }
}
res.json({ users_data });
});
app.post('/change_balance', (req, res) => {
  const { value } = req.body;
        users_data[value[0]][0] = value[1]
    res.json({ users_data });
});
app.post('/change_bal_sended', (req, res) => {
  const { value } = req.body;
        users_data[value[0]][1] = value[1]
    res.json({ users_data });
});
app.post('/get_bal_sended', (req, res) => {
  const { value } = req.body;
  if (!users_data[value]) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
   let result = users_data[value][1]; 
    console.log(result, value)
    res.json({ result });
});

app.post('/change_bronEarnings', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    bronEarnings += value;
    res.json({ bronEarnings });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.post('/change_serEarnings', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    serEarnings += value;
    res.json({ serEarnings });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.post('/add_dolgg', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    dolgg += value;
    res.json({ dolgg });
    console.log("gold_dolg -", value, "dolgg - ", dolgg)
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.post('/add_dolgs', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    dolgs += value;
    console.log("gold_dolg -", value, "dolg - ", dolgs)
    res.json({ dolgs });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.post('/add_dolgb', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    dolgb += value;
    console.log("gold_dolg -", value, "dolg - ", dolgb)
    res.json({ dolgb });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.post('/change_nalog', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    nalog = value;
    res.json({ nalog });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.get('/get_nalog', (req, res) => {
  res.json({ nalog });
});
app.get('/get_semi_period', (req, res) => {
  res.json({ semi_period });
});
app.get('/get', (req, res) => {
  res.json({ now_id });
});
app.get('/get-gold', (req, res) => {
  res.json({ gold_send });
});
app.post('/add', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    gold_send += value;
    res.json({ gold_send });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.get('/get-ser', (req, res) => {
  res.json({ ser_give });
});
app.post('/add_ser', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    ser_give += value;
    res.json({ ser_give });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.post('/change_period', (req, res) => {
  const { value } = req.body;
    period = value;
    res.json({ period });
  
});
app.get('/get-ser_send', (req, res) => {
  res.json({ ser_send });
});
app.post('/add_ser_send', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    ser_send += value;
    res.json({ ser_send });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.post('/increment-now-id', (req, res) => {
  now_id += 1
});
app.get('/get-bron', (req, res) => {
  res.json({ bron_give });
});
app.post('/add_bron', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    bron_give += value;
    res.json({ bron_give });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.get('/get-bron_send', (req, res) => {
  res.json({ bron_send });
});
app.post('/add_bron_send', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    bron_send += value;
    res.json({ bron_send });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
// Сброс отправки бронзы (нужно, чтобы при повторном заходе не начислять повторно)
app.get('/reset_bron_send', (req, res) => {
  bron_send = 0;
  res.json({ bron_send });
});
app.get('/get-gold1', (req, res) => {
  res.json({ gold_give });
});
app.post('/add_gold', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    gold_give += value;
    res.json({ gold_give });
  } else {
    res.status(400).json({ error: 'Invalid value' });
  }
});
app.get('/reset', (req, res) => {
goldEarnings = 0
serEarnings = 0
bronEarnings = 0
nalog = 0
gold_send = 0
ser_give = 0
ser_send = 0
bron_give = 0
bron_send = 0
gold_give = 0
// Сбрасываем счётчики пользователей лиг корректно, по отдельности
g_league_users = 0
s_league_users = 0
b_league_users = 0
res.json({ ser_give });
})
app.get('/reset_dolg', (req, res) => {
if(calculated){
dolgg = 0
dolgs = 0
dolgb = 0
count_us_g = 0
count_us_g_b = 0
count_us_g_s = 0
}
res.json({ ser_give });
})
app.get('/reset_dolgg', (req, res) => {
dolgg = 0
count_us_g = 0
res.json({ dolgg });
})
app.get('/reset_dolgs', (req, res) => {
dolgs = 0
count_us_g_s = 0
res.json({ dolgs });
})
app.get('/reset_dolgb', (req, res) => {
dolgb = 0
count_us_g_b = 0
res.json({ dolgb });
})
app.post('/annulate', (req, res) => {
const { value } = req.body;
if(calculated){
  calculated = false
 for(var [key, value1] of Object.entries(users_data)){
let new_league =  getRandomInt(3)
var league;
               if(new_league == 0){
                if(Number(users_data[key][2]) != 0){
                  dolgg += Number(value1[2])
                  count_us_g += 1
                  console.log(dolgg, count_us_g)
                }
                league = "G"
               }else if(new_league == 1){
                if(Number(value1[2]) != 0){
                  dolgs += Number(value1[2])
                  count_us_g_s += 1
                  console.log(dolgs, count_us_g_s)
                }
                league = "S"
               }else{
                if(Number(value1[2]) != 0){
                  dolgb += Number(value1[2])
                  count_us_g_b += 1
                  console.log(dolgb, count_us_g_b)
                }
                league = "B"
               }
              // Удаляем старую лигу из ключа (последний символ) и добавляем новую
              let base_key = key.slice(0, -1)
              let new_key = `${base_key}${league}`
              users_data[new_key] = users_data[key]
              delete users_data[key]
              // Сравниваем базовую часть ID без лиги
              let value_base = value.length > 0 && (value.slice(-1) == "G" || value.slice(-1) == "S" || value.slice(-1) == "B") ? value.slice(0, -1) : value
              if(value_base == base_key){
              res.json({ league })
              }
              }
            }else{
              for(var [key, value1] of Object.entries(users_data)){
                // Сравниваем базовую часть ключа без лиги
                let key_base = key.slice(0, -1)
                let value_base = value.length > 0 && (value.slice(-1) == "G" || value.slice(-1) == "S" || value.slice(-1) == "B") ? value.slice(0, -1) : value
                if (key_base == value_base){
                  let league = key.slice(-1)
                  res.json({league})
                }
              }
            }
})

app.listen(3000);