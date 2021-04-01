const pool = require('../utils/pool');

module.exports = class Upload {
    id;
    url;
    timeStamp;
    name;
    type;

    constructor(row) {
        this.id = row.id;
        this.url = row.url;
        this.timeStamp = row.time_stamp;
        this.name = row.name;
        this.type = row.file_type;
    }

    static async insert({ url, timeStamp, name, type }) {
        console.log('in model', url)
        const { rows } = await pool.query(`
        INSERT INTO uploads (url, time_stamp, name, type)
        VALUES ($1, $2, $3, $4) RETURNING *`, [url, timeStamp, name, type]
        );

        return new Upload(rows[0]);
    }
}
