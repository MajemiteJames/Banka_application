import express from 'express';
import Accounts from './server/datastore/savings';
import bodyParser from 'body-parser';


const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/v1/accounts', (req, res) => {
  res.status(200).send({
    status: 200,
    success: 'true',
    message: 'Accounts retrieved successfully',
    accounts: Accounts
  })
});

app.post('/api/v1/accounts', (req, res) => {
  if(!req.body.firstName) {
    return res.status(400).send({
      success: 'false',
      message: 'firstName is required'
    });
  } else if(!req.body.lastName) {
    return res.status(400).send({
      success: 'false',
      message: 'lastName is required'
    });
  } else if(!req.body.email) {
    return res.status(400).send({
      success: 'false',
      message: 'email is required'
    });
  } else if(!req.body.type) {
    return res.status(400).send({
      success: 'false',
      message: 'The type of Account is required'
    });
  }  else if(!req.body.openingBalance) {
    return res.status(400).send({
      success: 'false',
      message: 'Kindly put the openingBalance'
    });
  }


 const Account = {
   id: Accounts.length + 1,
   accountNumber: parseInt(Math.random()*10000000000, 10),
   firstName: req.body.firstName,
   lastName: req.body.lastName,
   email: req.body.email,
   type: req.body.type,
   openingBalance: req.body.openingBalance
 }
 Accounts.push(Account);
 return res.status(201).send({
   status: 201,
   success: 'true',
   message: 'Account created successfully',
   Account
 })
});

app.get('/api/v1/accounts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  Accounts.map((Account) => {
    if (Account.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'Account retrieved successfully',
        Account,
      });
    } 
});
 return res.status(404).send({
   success: 'false',
   message: 'Account does not exist',
  });
});

app.delete('/api/v1/accounts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  Accounts.map((Account, index) => {
    if (Account.id === id) {
       Accounts.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'Account deleted successfuly',
       });
    }
  });


    return res.status(404).send({
      success: 'false',
      message: 'Account not found',
    });

 
});

app.put('/api/v1/accounts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let accountFound;
  let itemIndex;
  Accounts.map((Account, index) => {
    if (Account.id === id) {
      accountFound = Account;
      itemIndex = index;
    }
  });

  if (!accountFound) {
    return res.status(404).send({
      success: 'false',
      message: 'Account not found',
    });
  }

  if (!req.body.accountNumber) {
    return res.status(400).send({
      success: 'false',
      message: 'accountNumber is required',
    });
  } else if (!req.body.status) {
    return res.status(400).send({
      success: 'false',
      message: 'status is required',
    });
  }

  const updatedAccount = {
    id: accountFound.id,
    accountNumber: req.body.accountNumber || accountFound.accountNumber,
    status: req.body.status || accountFound.status,
  };

  Accounts.splice(itemIndex, 1, updatedAccount);

  return res.status(201).send({
    success: 'true',
    message: 'Status of Acccount updated successfully',
    updatedAccount,
  });
});

const port = process.env.PORT || 4040;

app.get('/', (req, res) => {
  res.send('The Port for my Banking App');
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});