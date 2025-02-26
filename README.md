# FitJourneyServices
## Description
    This project is a backend for accounting for progress on the exercise day.

## Characteristics
    - ⌛Routine management
    - 🏋️Exercise management
    - ⚖️Weight management
    - ⏱️Time and progress management
    
## Technologies  
    - **Backend:** Node.js (Express)  
    - **data base:** MongoDB  
    - **Segurity:** JWT
    - **Validations:** Joi

### Prerequisites  
    - Node.js v22+  
    - MongoDB

### Steps 
    git clone https://github.com/XpecterLy/FitJourneyServices.git
    cd FitJourneyServices
    
    - docker-compose build
    - docker-compose up

    change all names .env.example to .env int microservises and configure all .env files

    if not use docker
        - execute comand ``npm i`` in all microsercises and execute ``npm start`` to init

    if use docker 
        - execute ``docker-compose build`` in project branch 
        - execute ``docker-compose up``

#### Important
    msUser create default userRoot configure gmail and password in msUser/.env

## Note
    For create seed categories and exercises

    - consume the endpoint ``/v1/fitjourney/categories_Training_style/add_seeds`` and ``/v1/fitjourney/categories_muscle_group/add_seeds`` to create categories
    . consume the endpoint ``/v1/fitjourney/exercise/add_seed`` to create exercises

## contact
    - lopescaleb@gmail.com or mr.xpecterly@gmail.com
