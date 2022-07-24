#   <img width="30" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5c3-fe0f.svg"/> Repoprovas  

<p>
    Repoprovas is a application where a user can share and search tests, wether by disciplines or professors. 
</p>

## Usage
```bash
$ git clone https://github.com/Danilosrr/projeto20-repoprovas

$ cd projeto20-repoprovas

$ npm install

$ npm run dev
```

## API:

### authorization:
```yml
- POST /sign-up
    - Route to create new user
    - body: {
        "email": "email@email.com",
        "confirmPassword": "password123",
        "password": "password123" 
    }
    
- POST /sign-in
    - Route to sign in
    - body: {
        "email": "email@email.com",
        "password": "password123"
    }
 ```

 ### tests:
 ```yml
- POST /tests
    - Route where user can post a new test
    - headers: {  "Authorization": "token"  }
    - body: {
        "name": "test name",
        "pdfUrl": "url",
        "categoryId": 1,
        "teacherId": 1,
        "disciplineId": 1
     }
      
- GET /tests
    - Route where user can see credentials
    - query parameter: 
        groupBy: teachers or disciplines
    - headers: {  "Authorization": "token"  }
    - body: {}
```

## Deploy
The API is deployed at the link:
