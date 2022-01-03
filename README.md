
# Panteon Case 
- The top list is updated with the weekly node schedule.Top list comes with redis
- This service, when you want to route between applications converts URLs to deep links or deep links to URLs.
- The list is listened to instantly and the daily changes are shown as in the image below.
- The daily change order is also reflected in the table instantly.
<br/>
<img src="https://github.com/tahasvc/panteon-case/blob/master/Screenshot_1.png" width="1100" height="500" />

## Running with Docker
- Prerequisites [Docker](https://www.docker.com/)
- `git clone https://github.com/tahasvc/panteon-case.git`
- `cd src`
- `docker-compose up --build`
- Navigate to server http://localhost:3001
- Navigate to client http://localhost:3000

## Running with Cloud Service
- Navigate to server https://server-jvekc5ttbq-uc.a.run.app/
- Navigate to client https://panteon-case.ue.r.appspot.com/
## How to Use

  There are API's for add player links. `localhost:3001`
  
  * `/api/getTopList`

   API Accepts <strong>GET</strong> request. Get top list.

   Response:

    
    {
      "msg": "",
      "result": true,
      "data": [
          {
            "_id": "61d299a8a34a52d85d424862",
            "money": 300,
            "player": {
                "_id": "61d2999ca34a52d85d424853",
                "name": "Selim",
                "country": "Ankara",
                "prize": [],
                "createdAt": "2022-01-03T06:37:16.936Z",
                "updatedAt": "2022-01-03T06:37:16.936Z",
                "__v": 0
            },
            "__v": 0,
            "rank": 1,
            "dailyDiff": 0
          }]
      }    
    ```

* `/api/players`

   API Accepts <strong>GET</strong> request. Get all players.

   Response:
    ```
   {
        "_id": "61d299bda34a52d85d424868",
        "name": "Taha",
        "country": "Manisa",
        "prize": [],
        "createdAt": "2022-01-03T06:37:49.283Z",
        "updatedAt": "2022-01-03T06:37:49.283Z",
        "__v": 0
    }
    ```


* `/api/player`

   API Accepts <strong>POST</strong> request. Post add a new player.

   Example request body:
    ```
   {
    "player":{
        "name":"Taha",
        "country":"Ankara"
      }
  }
    ```
   Response:
    ```
    {
      result:true,
      msg:"",
      data:[]
    }
    ```
    
    * `/api/addMoney`

   API Accepts <strong>POST</strong> request. Post add money of player.

   Example request body:
    ```
  {
      "money": 100,
      "player": "61d299d8a34a52d85d424873"
  }
    ```
