const CreateTableVaccinations ="CREATE TABLE IF NOT EXISTS th_vaccination_history (" +
  " id INTEGER PRIMARY KEY AUTOINCREMENT, " +
  " beneficiary_id TEXT NOT NULL, " +
  " vaccine_ct INTEGER NOT NULL, " +
  " dose1 TEXT, " +
  " dose2 TEXT, " +
  " dose3 TEXT, " +
  " dose4 TEXT, " +
  " dose5 TEXT, " +
  " dose6 TEXT, " +
  " dose7 TEXT, " +
  " restarted INTEGER, " +
  " reg_date TEXT, " +
  " other TEXT " +
");";


export { CreateTableVaccinations }