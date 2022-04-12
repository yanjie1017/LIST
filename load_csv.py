import psycopg2
import csv

conn = psycopg2.connect(database="list",
                        user='superuser', password='123', 
                        host='127.0.0.1', port='5432'
)

cur = conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS api_ticker_symbol(
    datetime timestamp not null, 
    close numeric(6,2) not null,
    high numeric(6,2) not null,
    low numeric(6,2) not null,
    open numeric(6,2) not null,
    volume int not null,
    instrument varchar(50) not null,
    primary key(instrument, datetime)
)""")

with open('./hindalco.csv', 'r') as f:
    # next(f) # Skip the header row.
    # cur.copy_from(f, 'api_ticker_symbol', sep=',')
    reader = csv.reader(f)
    next(reader) # Skip the header row.
    for row in reader:
        cur.execute(
        """INSERT INTO api_ticker_symbol (datetime, close, high, low, open, volume, instrument)
        VALUES (%s, %s, %s, %s, %s, %s, %s)""", row)

conn.commit()
conn.close()
f.close()