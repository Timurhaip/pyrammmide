
const express = require("express");
const app = express();
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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/get_users', (req, res) => {
  massive = [g_league_users, s_league_users, b_league_users]
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
app.get('/time', (req, res) => {
  const now = Date.now();
  const elapsed = now - startTime;
  const remaining = Math.max(countdownDuration - elapsed, 0);
  res.json({ remaining });
});
app.get('/update_time', (req, res) => {
  startTime = Date.now();
  res.json({ startTime });
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
app.use(express.json());
app.use("/", express.static("public"));
app.post('/change_goldEarnings', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'number') {
    goldEarnings += value;
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
userss = 0
usersg = 0
usersb = 0
res.json({ ser_give });
})
app.get('/reset_dolg', (req, res) => {
dolgg = 0
dolgs = 0
dolgb = 0
count_us_g = 0
count_us_g_b = 0
count_us_g_s = 0
res.json({ ser_give });
})
app.listen(3000);