DROP TABLE IF EXISTS uploads;


CREATE TABLE uploads (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        url TEXT NOT NULL,
        time_stamp BIGINT NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL
)