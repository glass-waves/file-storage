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
        const { rows } = await pool.query(`
        INSERT INTO uploads (url, time_stamp, name, type)
        VALUES ($1, $2, $3, $4) RETURNING *`, [url, timeStamp, name, type]
        );
        return new Upload(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(`
        DELETE from uploads 
        WHERE id = $1
        RETURNING * `, [id]
        );
        return new Upload(rows[0]);
    }
    static async getAll() {
        const { rows } = await pool.query(`
        SELECT * from uploads`
        );
        return rows.map(row => new Upload(row));
    }
    static async getOne(id) {
        const { rows } = await pool.query(`
        SELECT * from uploads
        WHERE id = $1`, [id]
        );
        return new Upload(rows[0]);
    }
    static async updateName(name, id) {
        const { rows } = await pool.query(`
        UPDATE uploads
        SET name = $1
        WHERE id = $2 
        RETURNING *`, [name, id]
        );
        return new Upload(rows[0]);
    }
}
