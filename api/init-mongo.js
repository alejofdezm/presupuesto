db = db.getSiblingDB('presupuestodb');  

db.createUser({
  user: "presupuestousr",
  pwd: "Pr3sUpU3st0.P4ssw0rd",
  roles: [{ role: "readWrite", db: "presupuestodb" }]
});
