import {Sequelize} from 'sequelize';

const sequelize = new Sequelize("database_app", "root", "pass", {
    host: "localhost",
    dialect: "mysql"
});

export default sequelize;
