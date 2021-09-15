https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554
https://sequelize.org/master/manual/assocs.html
https://sequelize.org/master/manual/advanced-many-to-many.html

--The 3 types of relationship
We will take as an example 3 models.
- Company
- Employee
- Working day
Employe has one company (belongsTo) 1:1
Company has many employees (hasMany) 1:n
Employe has many WorkingDay and WorkingDay has many employees (manyToMany) n:n
To create many to many relationship, we will need a joining table that we will call UsersWorkingDay.
This table will join both the Employee and WorkingDay to create many to many relationship (manyToMany) n:n

In our case,

Service has many Tech and Tech has many Services (manyToMany) n:n
To create many to many relationship, we will need a joining table that we will call TechUsed.
This table will join both the Service and Tech to create many to many relationship (manyToMany) n:n