# Pokémon Challenge

I was challenged by the good folks at Jitterbit to make this API/SPA combo as a way to evaluate my skills as a developer.

It should look something like this:

<img width="1235" height="1047" alt="image" src="https://github.com/user-attachments/assets/15b76c6f-c7ca-4c51-b7db-abf029fbd01a" />

## Installation

You should be able to use `docker-compose` to easily install dependencies and run both applications.

```bash
docker-compose up
```

## If that doesn't work...

Well, I'm sorry
But you can still run the applications individually with the following steps
```bash
# Installing necessary packages
cd pokedex
npm install
cd ../api
npm install --legacy-peer-deps
cd ..

# running the API
cd api
npm run start

# running the front end APP
cd pokedex
npm run start
```


## Running the Unit Tests
At this moment only the API has unit tests written with Jest, you can run them with the following commands
```bash
cd api

npm run test # for test results

npm run test:cov # for coverage analysis
```


## License

[MIT](https://choosealicense.com/licenses/mit/)
